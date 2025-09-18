import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationStoreService } from '../../shared/services/application-store.service';
import { Application } from '../../models/application.model';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './app-detail.component.html',
  styleUrl: './app-detail.component.scss'
})
export class AppDetailComponent {
  application: Application | null = null;
  originalStatus: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appStore: ApplicationStoreService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.appStore.getApplicationById(id).subscribe((app) => {
      this.application = { ...app };
      this.originalStatus = app.status;
    });
  }

  onSave(): void {
    if (!this.application || this.application.id === undefined) return;

    this.appStore.updateApplication(this.application.id, {
      status: this.application.status
    }).subscribe(() => {
      this.originalStatus = this.application!.status;
      alert('Status updated successfully!');
      this.router.navigate(['/app-dashboard']);
    });
  }

  onBack(): void {
    this.router.navigate(['/app-dashboard']);
  }

  isStatusChanged(): boolean {
    return this.application?.status !== this.originalStatus;
  }

  isImage(base64: string): boolean {
    if (!base64) return false;

    // handle kalau sudah ada prefix
    if (base64.startsWith('data:image')) return true;

    // handle kalau raw base64
    return (
      base64.startsWith('/') || // PNG
      base64.startsWith('iVBOR') || // PNG
      base64.startsWith('/9j/') // JPG
    );
  }


  isPdf(base64: string): boolean {
    // Buang prefix kalau ada
    const cleanBase64 = base64.includes(',') ? base64.split(',')[1] : base64;
    return cleanBase64.startsWith('JVBERi0'); // tanda khas PDF
  }

  getSafePdfUrl(base64: string): SafeResourceUrl {
    if (!base64) return '';

    // Bersihkan prefix
    const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;

    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getDocumentUrl(base64: string): string {
    if (!base64) return '';
    // kalau sudah ada prefix, kembalikan langsung
    if (base64.startsWith('data:')) {
      return base64;
    }
    if (this.isPdf(base64)) {
      return `data:application/pdf;base64,${base64}`;
    }
    if (this.isImage(base64)) {
      return `data:image/png;base64,${base64}`;
    }
    return base64;
  }

}

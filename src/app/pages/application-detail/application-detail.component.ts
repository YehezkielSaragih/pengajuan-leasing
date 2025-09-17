import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationStoreService } from '../../shared/services/application-store.service';
import { Application } from '../../models/application.model';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-application-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe],
  templateUrl: './application-detail.component.html',
  styleUrl: './application-detail.component.scss'
})
export class ApplicationDetailComponent {
  application: Application | null = null;
  originalStatus: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appStore: ApplicationStoreService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const foundApp = this.appStore.getApplications().find(app => app.id === id);

    if (foundApp) {
      // Clone object supaya tidak langsung mutate data di service
      this.application = { ...foundApp };
      this.originalStatus = foundApp.status;
    }
  }

  onBack(): void {
    this.router.navigate(['/application-status']);
  }

  // Cek apakah dropdown diubah
  isStatusChanged(): boolean {
    return this.application?.status !== this.originalStatus;
  }

  // Simpan perubahan
  onSave(): void {
    if (this.application) {
      this.appStore.updateApplication(this.application.id, {
        status: this.application.status
      });
      this.originalStatus = this.application.status; // reset status awal
      alert('Status berhasil disimpan!');
      this.router.navigate(['/application-status']);
    }
  }

  isImage(url: string): boolean {
    return url?.match(/\.(jpeg|jpg|png|gif)$/i) !== null;
  }

  isPdf(url: string): boolean {
    return url?.endsWith('.pdf');
  }
}

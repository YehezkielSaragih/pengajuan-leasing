import { Component } from '@angular/core';
import { ApplicationStoreService } from '../../shared/services/application-store.service';
import { Application } from '../../models/application.model';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-application',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './form-application.component.html',
  styleUrl: './form-application.component.scss'
})
export class FormApplicationComponent {
  application: Application = {
    id: Date.now(),
    customer: { name: '', age: 0, job: '', income: 0 },
    item: { name: '', type: '', price: 0 },
    documents: { ktp: null, kk: null, paySlip: null, npwp: null },
    status: 'Pending'   // otomatis Pending
  };

  constructor(
    private appStore: ApplicationStoreService,
    private router: Router  // inject Router di constructor
  ) {}

  onFileSelected(event: Event, type: 'ktp' | 'kk' | 'paySlip' | 'npwp'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Simpan path relatif ke folder public/documents/
      this.application.documents[type] = `public/documents/${file.name}`;

    }
  }

  onSubmit(): void {
    this.appStore.addApplication(this.application);
    alert('Application submitted successfully!');
    this.resetForm();
    this.goToStatusPage(); // navigasi ke halaman status setelah submit
  }

  resetForm(): void {
    this.application = {
      id: Date.now(),
      customer: { name: '', age: 0, job: '', income: 0 },
      item: { name: '', type: '', price: 0 },
      documents: { ktp: null, kk: null, paySlip: null, npwp: null },
      status: 'Pending'
    };
  }

 
  goToStatusPage(): void {
    this.router.navigate(['/application-status']); // ganti sesuai route path
  }
  

}

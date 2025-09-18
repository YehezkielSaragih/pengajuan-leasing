import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicationStoreService } from '../../services/application-store.service';
import { Application } from '../../../models/application.model';

@Component({
  selector: 'shared-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  applicationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appService: ApplicationStoreService,
    private router: Router
  ) {
    this.applicationForm = this.fb.group({
      customer: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        age: [null, [Validators.required, Validators.min(1)]],
        job: ['', [Validators.required]],
        income: [null, [Validators.required, Validators.min(1)]],
      }),
      item: this.fb.group({
        name: ['', [Validators.required]],
        type: ['', [Validators.required]],
        price: [null, [Validators.required, Validators.min(1)]],
      }),
      documents: this.fb.group({
        ktp: [null, [Validators.required]],
        kk: [null, [Validators.required]],
        paySlip: [null, [Validators.required]],
        npwp: [null, [Validators.required]],
      })
    });
  }

  // Convert file ke base64
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  async onFileSelected(event: Event, type: 'ktp' | 'kk' | 'paySlip' | 'npwp'): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const base64 = await this.fileToBase64(file);
      this.applicationForm.get('documents')?.get(type)?.setValue(base64);
    }
  }

  onSubmit(): void {
  if (this.applicationForm.valid) {
    const formValue: Omit<Application, 'id'> = {
      ...this.applicationForm.value,
      status: 'Pending'
    };

    this.appService.addApplication(formValue).subscribe({
      next: () => {
        alert('Application submitted successfully!');
        this.applicationForm.reset({
          customer: { name: '', age: null, job: '', income: null },
          item: { name: '', type: '', price: null },
          documents: { ktp: null, kk: null, paySlip: null, npwp: null },
        });
        this.goToStatusPage();
      },
      error: () => {
        alert('Failed to submit application. Please try again.');
      }
    });
  }
}

  goToStatusPage(): void {
    this.router.navigate(['/app-dashboard']);
  }
}

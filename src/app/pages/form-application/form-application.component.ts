import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApplicationStoreService } from '../../shared/services/application-store.service';
import { Application } from '../../models/application.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-application',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-application.component.html',
  styleUrl: './form-application.component.scss'
})
export class FormApplicationComponent {
  applicationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appStore: ApplicationStoreService,
    private router: Router
  ) {
    this.applicationForm = this.fb.group({
      customer: this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: [0, [Validators.required, Validators.min(1)]],
      job: ['', [Validators.required]],
      income: [0, [Validators.required, Validators.min(1)]],
    }),
    item: this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(1)]],
    }),
    documents: this.fb.group({
      ktp: [null],
      kk: [null],
      paySlip: [null],
      npwp: [null],
    }),
    status: ['Pending']
    });
  }

  onFileSelected(event: Event, type: 'ktp' | 'kk' | 'paySlip' | 'npwp'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // simpan path relatif
      this.applicationForm.get('documents')?.get(type)?.setValue(`public/documents/${file.name}`);
    }
  }

  onSubmit(): void {
    if (this.applicationForm.valid) {
      const formValue = this.applicationForm.value;

      const newApplication: Application = {
        id: Date.now(),
        ...formValue
      };

      this.appStore.addApplication(newApplication);
      alert('Application submitted successfully!');

      this.applicationForm.reset({
        customer: { name: '', age: 0, job: '', income: 0 },
        item: { name: '', type: '', price: 0 },
        documents: { ktp: null, kk: null, paySlip: null, npwp: null },
        status: 'Pending'
      });

      this.goToStatusPage();
    }
  }

  goToStatusPage(): void {
    this.router.navigate(['/application-status']);
  }
}

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
    private appStore: ApplicationStoreService,
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

  onFileSelected(event: Event, type: 'ktp' | 'kk' | 'paySlip' | 'npwp'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.applicationForm.get('documents')?.get(type)?.setValue(`public/documents/${file.name}`);
    }
  }

  onSubmit(): void {
    if (this.applicationForm.valid) {
      const formValue = this.applicationForm.value;
      this.appStore.addApplication(formValue);
      alert('Application submitted successfully!');
      this.applicationForm.reset({
        customer: { name: '', age: 0, job: '', income: 0 },
        item: { name: '', type: '', price: 0 },
        documents: { ktp: null, kk: null, paySlip: null, npwp: null },
      });
      this.goToStatusPage();
    }
  }

  goToStatusPage(): void {
    this.router.navigate(['/application-dashboard']);
  }
}

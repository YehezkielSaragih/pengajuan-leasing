import { Routes } from '@angular/router';
import { FormApplicationComponent } from './pages/application-form/application-form.component';
import { ApplicationStatusComponent } from './pages/application-status/application-status.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ApplicationDetailComponent } from './pages/application-detail/application-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'form-application', pathMatch: 'full' },
  { path: 'form-application', component: FormApplicationComponent },
  { path: 'application-status', component: ApplicationStatusComponent },
  { path: 'application-status/:id', component: ApplicationDetailComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];
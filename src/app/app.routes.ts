import { Routes } from '@angular/router';
import { FormApplicationComponent } from './pages/application-form/application-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ApplicationDetailComponent } from './pages/application-detail/application-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ApplicationDashboardComponent } from './pages/application-dashboard/application-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'form-application', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'application-form', component: FormApplicationComponent },
  { path: 'application-dashboard', component: ApplicationDashboardComponent },
  { path: 'application-detail/:id', component: ApplicationDetailComponent },
  { path: '**', redirectTo: '404' },
  { path: '404', component: NotFoundComponent }
];
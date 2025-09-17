import { Routes } from '@angular/router';
import { AppFormComponent } from './pages/app-form/app-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppDetailComponent } from './pages/app-detail/app-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AppDashboardComponent } from './pages/app-dashboard/app-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'app-dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'app-form', component: AppFormComponent },
  { path: 'app-dashboard', component: AppDashboardComponent },
  { path: 'app-detail/:id', component: AppDetailComponent },
  { path: '**', redirectTo: '404' },
  { path: '404', component: NotFoundComponent }
];
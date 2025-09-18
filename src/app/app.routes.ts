import { Routes } from '@angular/router';
import { AppFormComponent } from './pages/app-form/app-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppDetailComponent } from './pages/app-detail/app-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AppDashboardComponent } from './pages/app-dashboard/app-dashboard.component';
import { AuthGuard } from './shared/services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'app-dashboard', 
    component: AppDashboardComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'app-form',
    component: AppFormComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'app-detail/:id', 
    component: AppDetailComponent,
    canActivate: [AuthGuard]
  
  },
  { path: '**', redirectTo: '404'},
  { path: '404', component: NotFoundComponent }
];
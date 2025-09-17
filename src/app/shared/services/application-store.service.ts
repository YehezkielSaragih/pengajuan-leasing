import { Injectable } from '@angular/core';
import { Application } from '../../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStoreService {
  private storageKey = 'applications';

  getApplications(): Application[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private saveApplications(apps: Application[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(apps));
  }

  addApplication(data: Omit<Application, 'id'>): void {
    const apps = this.getApplications();
    const newId = apps.length > 0 ? Math.max(...apps.map(a => a.id)) + 1 : 1;
    const newApp: Application = { id: newId, ...data, status: 'Pending' };
    apps.push(newApp);
    this.saveApplications(apps);
  }

  updateApplication(id: number, data: Partial<Application>) {
    const apps = this.getApplications();
    const index = apps.findIndex(app => app.id === id);
    if (index !== -1) {
      apps[index] = { ...apps[index], ...data, id }; 
      this.saveApplications(apps);
    }
  }

  deleteApplication(id: number) {
    let apps = this.getApplications();
    apps = apps.filter(app => app.id !== id);
    this.saveApplications(apps);
  }
}

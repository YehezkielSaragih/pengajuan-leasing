import { Component } from '@angular/core';
import { ApplicationStoreService } from '../../shared/services/application-store.service';
import { Application } from '../../models/application.model';
import { CommonModule} from '@angular/common';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-application-status',
  standalone: true,
  imports: [
    CommonModule, 
    TableComponent
  ],
  templateUrl: './application-status.component.html',
  styleUrl: './application-status.component.scss'
})
export class ApplicationStatusComponent {

  applications: Application[] = [];

  constructor(private appStore: ApplicationStoreService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.applications = this.appStore.getApplications();
  }

  deleteApplication(id: number): void {
    this.appStore.deleteApplication(id);
    this.loadApplications(); // refresh daftar
  }
}

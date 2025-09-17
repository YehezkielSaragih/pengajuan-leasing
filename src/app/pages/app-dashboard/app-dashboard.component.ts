import { Component } from '@angular/core';
import { ApplicationStoreService } from '../../shared/services/application-store.service';
import { Application } from '../../models/application.model';
import { CommonModule} from '@angular/common';
import { TableComponent } from '../../shared/components/table/table.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    TableComponent,
    SidebarComponent
  ],
  templateUrl: './app-dashboard.component.html',
  styleUrl: './app-dashboard.component.scss'
})
export class AppDashboardComponent {

  applications: Application[] = [];
  filteredApplications: Application[] = [];

  searchTerm: string = '';
  selectedStatus: string = 'All';
  selectedType: string = 'All';


  constructor(private appStore: ApplicationStoreService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.applications = this.appStore.getApplications();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredApplications = this.applications.filter(app => {
      const matchesName = app.customer.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const matchesStatus =
        this.selectedStatus === 'All' || app.status === this.selectedStatus;

      const matchesType =
        this.selectedType === 'All' || app.item.type === this.selectedType;

      return matchesName && matchesStatus && matchesType;
    });
  }

  onSearchChange(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  onStatusChange(event: Event): void {
    this.selectedStatus = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  onTypeChange(event: Event): void {
    this.selectedType = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  deleteApplication(id: number): void {
    this.appStore.deleteApplication(id);
    this.loadApplications();
  }
}

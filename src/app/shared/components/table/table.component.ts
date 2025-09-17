import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Application } from '../../../models/application.model';
import { Router, RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../../../pages/application-dashboard/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'shared-table',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmDialogComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() applications: Application[] = [];
  @Output() delete = new EventEmitter<number>();

  confirmVisible = false;
  appIdToDelete: number | null = null;

  constructor(private router: Router) {}

  openConfirm(id: number, event: Event): void {
    event.stopPropagation(); // biar ga ikut trigger goToDetail
    this.appIdToDelete = id;
    this.confirmVisible = true;
  }

  handleConfirmDelete(): void {
    if (this.appIdToDelete !== null) {
      this.delete.emit(this.appIdToDelete);
    }
    this.closeConfirm();
  }

  handleCancelDelete(): void {
    this.closeConfirm();
  }

  private closeConfirm(): void {
    this.confirmVisible = false;
    this.appIdToDelete = null;
  }

  goToDetail(id: number): void {
    this.router.navigate(['/application-detail', id]);
  }
}

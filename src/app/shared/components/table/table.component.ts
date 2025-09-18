import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Application } from '../../../models/application.model';
import { Router, RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../../../pages/app-dashboard/components/confirm-dialog/confirm-dialog.component';

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

  goToDetail(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['/app-detail', id]);
    }
  }

  openConfirm(id: number | undefined, event: Event): void {
    event.stopPropagation();
    if (id !== undefined) {
      this.appIdToDelete = id;
      this.confirmVisible = true;
    }
  }
}

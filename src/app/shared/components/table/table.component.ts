import { CommonModule } from '@angular/common';
import { Component ,Input, Output, EventEmitter} from '@angular/core';
import { Application } from '../../../models/application.model';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'shared-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() applications: Application[] = [];
  @Output() delete = new EventEmitter<number>();

  constructor(private router: Router) {}

  onDelete(id: number, event: Event): void {
    event.stopPropagation();
    this.delete.emit(id);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/application-status', id]);
  }

}

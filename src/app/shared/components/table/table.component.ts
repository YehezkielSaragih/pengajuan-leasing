import { CommonModule } from '@angular/common';
import { Component ,Input, Output, EventEmitter} from '@angular/core';
import { Application } from '../../../models/application.model';


@Component({
  selector: 'shared-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() applications: Application[] = [];      // menerima data
  @Output() delete = new EventEmitter<number>();   // emit event delete

  onDelete(id: number): void {
    this.delete.emit(id);   // emit ke parent
  }

}

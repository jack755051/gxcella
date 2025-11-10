import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn, SortConfig } from '../model/table.types';

@Component({
  selector: 'th[gx-table-header-cell]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gx-table-header-cell.html',
  styleUrls: ['./gx-table-header-cell.css'],
  host: {
    '[class]': 'alignClass()',
    '[ngStyle]': 'columnStyle()',
    '[class.sortable]': 'column().sortable',
    '(click)': 'handleClick()'
  }
})
export class GxTableHeaderCell {
  column = input.required<TableColumn>();
  sortConfig = input<SortConfig>({ key: null, direction: 'asc' });

  sort = output<string>();

  readonly alignClass = computed(() => {
    switch (this.column().align) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  });

  readonly columnStyle = computed(() => {
    const styles: Record<string, string> = {};
    const column = this.column();

    if (column.width) styles['width'] = column.width;
    if (column.minWidth) styles['min-width'] = column.minWidth;
    if (column.maxWidth) styles['max-width'] = column.maxWidth;

    return styles;
  });

  readonly isActiveAsc = computed(() =>
    this.sortConfig().key === this.column().key &&
    this.sortConfig().direction === 'asc'
  );

  readonly isActiveDesc = computed(() =>
    this.sortConfig().key === this.column().key &&
    this.sortConfig().direction === 'desc'
  );

  handleClick() {
    if (this.column().sortable) {
      this.sort.emit(this.column().key);
    }
  }
}

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxTableEmptyState } from '../table-empty-state/gx-table-empty-state';

@Component({
  selector: 'gx-table-shell',
  standalone: true,
  imports: [CommonModule, GxTableEmptyState],
  templateUrl: './gx-table-shell.html',
  styleUrls: ['./gx-table-shell.css']
})
export class GxTableShell {
  /**
   * 是否為空狀態
   */
  isEmpty = input<boolean>(false);

  /**
   * 自訂最大高度，例如 '500px' 或 '70vh'
   */
  maxHeight = input<string | undefined>(undefined);
}

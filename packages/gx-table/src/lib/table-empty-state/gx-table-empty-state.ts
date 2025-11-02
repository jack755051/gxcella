import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gx-table-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gx-table-empty-state.html',
  styleUrls: ['./gx-table-empty-state.css']
})
export class GxTableEmptyState {
  /**
   * 標題
   */
  title = input<string>('沒有資料');

  /**
   * 描述
   */
  description = input<string>('目前沒有任何資料可顯示');
}

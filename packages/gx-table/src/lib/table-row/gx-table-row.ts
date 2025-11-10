import { Component, computed, input, output, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../model/table.types';
import { GxTableCell } from '../table-cell/gx-table-cell';

/**
 * GxTableRow Component
 *
 * 對應 Vue 的 TableRow.vue，提供表格行功能：
 * - 渲染單行資料
 * - 支援行選擇（checkbox）
 * - 支援禁用狀態
 * - 支援選中狀態樣式
 * - 支援自定義欄位內容（ng-content）
 */
@Component({
  selector: 'tr[gx-table-row]',
  standalone: true,
  imports: [CommonModule, GxTableCell],
  templateUrl: './gx-table-row.html',
  styleUrl: './gx-table-row.css',
  host: {
    '[class]': 'rowClass()'
  }
})
export class GxTableRow {
  /** 行資料 */
  row = input.required<any>();

  /** 欄位配置 */
  columns = input.required<TableColumn[]>();

  /** 是否可選擇 */
  selectable = input<boolean>(false);

  /** 是否已選中 */
  selected = input<boolean>(false);

  /** 是否禁用 */
  disabled = input<boolean>(false);

  /** 選擇事件 */
  select = output<void>();

  /** 行 class（選中狀態樣式） */
  readonly rowClass = computed(() => {
    const classes = ['transition-colors', 'hover:bg-gray-50'];
    if (this.selected()) {
      classes.push('bg-blue-50');
    }
    return classes.join(' ');
  });

  /** Checkbox class（禁用狀態樣式） */
  readonly checkboxClass = computed(() => {
    const classes = ['h-4', 'w-4', 'rounded', 'border-gray-300', 'text-blue-600', 'focus:ring-blue-500'];
    if (this.disabled()) {
      classes.push('cursor-not-allowed', 'opacity-50');
    }
    return classes.join(' ');
  });

  /** 處理選擇事件 */
  handleSelect(): void {
    if (!this.disabled()) {
      this.select.emit();
    }
  }
}

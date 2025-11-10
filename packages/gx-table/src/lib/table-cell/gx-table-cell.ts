import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../model/table.types';

/**
 * GxTableCell Component
 *
 * 對應 Vue 的 TableCell.vue，提供表格單元格功能：
 * - 顯示欄位數據
 * - 支援對齊方式（left, center, right）
 * - 支援欄位寬度設定
 * - 支援自定義內容投影（ng-content）
 */
@Component({
  selector: 'gx-table-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gx-table-cell.html',
  styleUrl: './gx-table-cell.css',
})
export class GxTableCell {
  /** 欄位配置 */
  column = input.required<TableColumn>();

  /** 行資料 */
  row = input.required<any>();

  /** 顯示值（處理空值） */
  readonly displayValue = computed(() => {
    const value = this.row()[this.column().key];
    return value ?? '-';
  });

  /** 對齊 class */
  readonly alignClass = computed(() => {
    switch (this.column().align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left text-gray-900';
    }
  });

  /** 欄位樣式（寬度等） */
  readonly columnStyle = computed(() => {
    const column = this.column();
    const styles: Record<string, string> = {};

    if (column.width) {
      styles['width'] = column.width;
    }

    if (column.minWidth) {
      styles['min-width'] = column.minWidth;
    }

    if (column.maxWidth) {
      styles['max-width'] = column.maxWidth;
    }

    return styles;
  });
}

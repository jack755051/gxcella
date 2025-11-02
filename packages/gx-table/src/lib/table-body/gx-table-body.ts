import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../model/table.types';
import { GxTableRow } from '../table-row/gx-table-row';

/**
 * GxTableBody Component
 *
 * 對應 Vue 的 TableBody.vue，提供表格主體功能：
 * - 渲染所有資料行
 * - 管理行選擇
 * - 處理禁用狀態
 * - 支援自定義欄位內容（透過插槽傳遞）
 */
@Component({
  selector: 'gx-table-body',
  standalone: true,
  imports: [CommonModule, GxTableRow],
  templateUrl: './gx-table-body.html',
  styleUrl: './gx-table-body.css',
})
export class GxTableBody {
  /** 表格資料 */
  data = input.required<any[]>();

  /** 欄位配置 */
  columns = input.required<TableColumn[]>();

  /** 是否可選擇 */
  selectable = input<boolean>(false);

  /** 已選中的 ID 列表 */
  selectedIds = input<string[]>([]);

  /** ID 欄位鍵值 */
  idKey = input<string>('id');

  /** 判斷行是否禁用的函數 */
  isRowDisabled = input<((row: any) => boolean) | undefined>(undefined);

  /** 行選擇事件 */
  selectRow = output<string>();

  /**
   * 獲取行的唯一鍵值
   */
  getRowKey(row: any, index: number): string | number {
    return row[this.idKey()] ?? index;
  }

  /**
   * 獲取行的 ID
   */
  getRowId(row: any): string {
    return row[this.idKey()];
  }

  /**
   * 判斷行是否已選中
   */
  isRowSelected(row: any): boolean {
    return this.selectedIds().includes(this.getRowId(row));
  }

  /**
   * 判斷行是否禁用
   */
  checkRowDisabled(row: any): boolean {
    const disabledFn = this.isRowDisabled();
    return disabledFn ? disabledFn(row) : false;
  }

  /**
   * 處理行選擇事件
   */
  handleSelectRow(row: any): void {
    this.selectRow.emit(this.getRowId(row));
  }
}

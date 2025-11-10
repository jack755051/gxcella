import { Component, computed, ElementRef, input, output, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn, SortConfig } from '../model/table.types';
import { GxTableHeaderCell } from '../table-header-cell/gx-table-header-cell';

@Component({
  selector: 'thead[gx-table-header]',
  standalone: true,
  imports: [CommonModule, GxTableHeaderCell],
  templateUrl: './gx-table-header.html',
  styleUrls: ['./gx-table-header.css']
})
export class GxTableHeader {
  /**
   * 表格欄位配置
   */
  columns = input.required<TableColumn[]>();

  /**
   * 排序配置
   */
  sortConfig = input<SortConfig>({ key: null, direction: 'asc' });

  /**
   * 是否可選擇
   */
  selectable = input<boolean>(false);

  /**
   * 是否全選
   */
  isAllSelected = input<boolean>(false);

  /**
   * 是否部分選中
   */
  isIndeterminate = input<boolean>(false);

  /**
   * 排序事件
   */
  sort = output<string>();

  /**
   * 全選切換事件
   */
  toggleSelectAll = output<void>();

  // Checkbox 引用
  checkboxRef = viewChild<ElementRef<HTMLInputElement>>('checkboxRef');
}

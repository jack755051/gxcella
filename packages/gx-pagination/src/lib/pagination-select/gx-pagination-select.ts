import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * GxPaginationSelect Component
 *
 * 對應 Vue 的 PaginationSelect.vue，提供下拉選單形式的分頁控制
 * - 使用原生 select 元素
 * - 顯示所有可用頁碼
 * - 適合頁數較少的情況
 */
@Component({
  selector: 'gx-pagination-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select
      class="rounded border px-2 py-1 text-sm"
      [value]="currentPage()"
      [disabled]="disabled()"
      (change)="handleChange($event)"
    >
      @for (page of pagesList(); track page) {
        <option [value]="page">{{ page }}</option>
      }
    </select>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    select {
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      background-color: #ffffff;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    select:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: #f3f4f6;
    }

    select:hover:not(:disabled) {
      border-color: #9ca3af;
    }
  `]
})
export class GxPaginationSelect {
  /** 當前頁碼 */
  currentPage = input.required<number>();

  /** 總頁數 */
  totalPages = input.required<number>();

  /** 是否禁用 */
  disabled = input<boolean>(false);

  /** 頁碼變更事件 */
  pageChange = output<number>();

  /**
   * 生成頁碼列表
   */
  protected pagesList(): number[] {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  /**
   * 處理選擇變更事件
   */
  protected handleChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const page = parseInt(select.value, 10);

    if (!isNaN(page)) {
      this.pageChange.emit(page);
    }
  }
}

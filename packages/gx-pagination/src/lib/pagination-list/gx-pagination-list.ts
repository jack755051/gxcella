import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * GxPaginationList Component
 *
 * 對應 Vue 的 PaginationList.vue，提供按鈕列表形式的分頁控制
 * - 顯示所有頁碼按鈕
 * - 當前頁高亮顯示
 * - 適合頁數較少的情況
 */
@Component({
  selector: 'gx-pagination-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for (page of pageNumbersList(); track page) {
      <span
        [class]="getPageClass(page)"
        (click)="handlePageClick(page)"
      >
        {{ page }}
      </span>
    }
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    span {
      cursor: pointer;
      border-radius: 0.375rem;
      border: 1px solid #d1d5db;
      background-color: #ffffff;
      padding: 0.25rem 0.5rem;
      min-width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      color: #3b82f6;
      transition: all 0.15s ease;
      user-select: none;
    }

    span:hover {
      border-color: #2563eb;
      background-color: #ffffff;
      color: #2563eb;
    }

    span.active {
      background-color: #3b82f6 !important;
      color: #ffffff !important;
      border-color: #3b82f6;
    }

    span.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  `]
})
export class GxPaginationList {
  /** 當前頁碼 */
  currentPage = input.required<number>();

  /** 總頁數 */
  totalPages = input.required<number>();

  /** 自訂 CSS class */
  customClass = input<string>('');

  /** 是否禁用 */
  disabled = input<boolean>(false);

  /** 頁碼變更事件 */
  pageChange = output<number>();

  /**
   * 生成頁碼列表
   */
  protected pageNumbersList = computed(() => {
    const total = this.totalPages();
    const pages: number[] = [];

    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }

    return pages;
  });

  /**
   * 獲取頁碼按鈕的 CSS class
   */
  protected getPageClass(page: number): string {
    const classes: string[] = [];

    // 添加自訂 class
    const custom = this.customClass();
    if (custom) {
      classes.push(custom);
    }

    // 添加當前頁 class
    if (page === this.currentPage()) {
      classes.push('active');
    }

    // 添加禁用 class
    if (this.disabled()) {
      classes.push('disabled');
    }

    return classes.join(' ');
  }

  /**
   * 處理頁碼點擊事件
   */
  protected handlePageClick(page: number): void {
    if (this.disabled()) {
      return;
    }

    if (page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }
}

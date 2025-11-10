import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * GxPaginationInput Component
 *
 * 對應 Vue 的 PaginationInput.vue，提供輸入框形式的分頁控制
 * - 允許使用者直接輸入頁碼
 * - Enter 鍵確認跳轉
 * - 顯示總頁數
 */
@Component({
  selector: 'gx-pagination-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input
      type="number"
      [class]="inputClasses()"
      [value]="currentPage()"
      [placeholder]="placeholder() || '頁碼'"
      [disabled]="disabled()"
      (keyup.enter)="handleEnter($event)"
      min="1"
      [max]="totalPages()"
    />
    <span class="ml-1 text-gray-600">/ {{ totalPages() }}</span>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    input[type="number"] {
      width: 4rem;
      border-radius: 0.375rem;
      border: 1px solid #d1d5db;
      padding: 0.25rem 0.5rem;
      text-align: center;
      font-size: 0.875rem;
      transition: all 0.15s ease;
    }

    input[type="number"]:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    input[type="number"]:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: #f3f4f6;
    }

    /* 移除 number input 的上下箭頭 */
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
  `]
})
export class GxPaginationInput {
  /** 當前頁碼 */
  currentPage = input.required<number>();

  /** 總頁數 */
  totalPages = input.required<number>();

  /** 輸入框佔位符 */
  placeholder = input<string>('頁碼');

  /** 自訂 CSS class */
  inputClass = input<string>('');

  /** 是否禁用 */
  disabled = input<boolean>(false);

  /** 頁碼變更事件 */
  pageChange = output<number>();

  /**
   * 計算輸入框的 CSS classes
   */
  protected inputClasses(): string {
    const base = 'w-16 rounded border px-2 py-1 text-center';
    const custom = this.inputClass();
    return custom ? `${base} ${custom}` : base;
  }

  /**
   * 處理 Enter 鍵按下事件
   */
  protected handleEnter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);

    // 驗證輸入
    if (isNaN(value)) {
      // 重置為當前頁
      input.value = this.currentPage().toString();
      return;
    }

    // 確保頁碼在有效範圍內
    const page = Math.max(1, Math.min(value, this.totalPages()));

    // 如果修正後的頁碼與輸入不同，更新輸入框
    if (page !== value) {
      input.value = page.toString();
    }

    // 觸發頁碼變更事件
    this.pageChange.emit(page);
  }
}

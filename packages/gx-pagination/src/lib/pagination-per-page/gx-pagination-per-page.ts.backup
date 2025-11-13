import { Component, input, output, computed, model } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Option interface for per-page select
 */
export interface PerPageOption {
  label: string;
  value: number;
}

/**
 * GxPaginationPerPage Component
 *
 * 對應 Vue 的 PaginationPerPage.vue，提供每頁顯示數量選擇器
 * - 使用原生 select 元素
 * - 支援雙向綁定
 * - 自動轉換選項格式
 */
@Component({
  selector: 'gx-pagination-per-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select
      [class]="selectClasses()"
      [value]="perPage()"
      [name]="name()"
      [disabled]="disabled()"
      (change)="handleChange($event)"
    >
      @for (option of optionObjects(); track option.value) {
        <option [value]="option.value">{{ option.label }}</option>
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
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      background-color: #ffffff;
      cursor: pointer;
      transition: all 0.15s ease;
      min-width: 4rem;
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
export class GxPaginationPerPage {
  /** select 元素的 name 屬性 */
  name = input.required<string>();

  /** 當前每頁顯示數量 */
  perPage = model.required<number>();

  /** 可選的每頁顯示數量選項 */
  perPageOptions = input<number[]>([10, 25, 50, 100]);

  /** 自訂 CSS class */
  customClass = input<string>('');

  /** 是否禁用 */
  disabled = input<boolean>(false);

  /** 是否允許 null 選項 */
  isNullOption = input<boolean>(false);

  /** 每頁數量變更事件 */
  perPageChange = output<number>();

  /**
   * 將數字陣列轉換為選項物件陣列
   */
  protected optionObjects = computed(() => {
    const options = this.perPageOptions();
    return options.map(n => ({
      label: String(n),
      value: n
    }));
  });

  /**
   * 計算 select 的 CSS classes
   */
  protected selectClasses(): string {
    const base = 'rounded border px-2 py-1';
    const custom = this.customClass();
    return custom ? `${base} ${custom}` : base;
  }

  /**
   * 處理選擇變更事件
   */
  protected handleChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;

    // 處理 null 選項
    if (this.isNullOption() && (value === null || value === '')) {
      // 如果允許 null 選項，保持當前值或使用預設值
      return;
    }

    // 轉換為數字
    const num = typeof value === 'number' ? value : Number(value);

    // 驗證數字
    if (Number.isFinite(num) && num > 0) {
      // 更新 model
      this.perPage.set(num);

      // 發出事件
      this.perPageChange.emit(num);
    } else {
      // 如果無效，重置為當前值
      select.value = this.perPage().toString();
    }
  }
}

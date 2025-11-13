import { Component, input, output, computed, model } from '@angular/core';
import { GxSelect, GxSelectOption, GxSelectSize, GxSelectVariant, GxSelectIntent } from '@sanring/gx-ui';

/**
 * GxPaginationPerPage Component
 *
 * 每頁顯示數量選擇器，使用 GxSelect 組件
 * - 支援設計系統的所有特性
 * - 支援 Intent、Variant、Size
 * - 支援深色模式
 * - 完全可自訂樣式
 */
@Component({
  selector: 'gx-pagination-per-page',
  standalone: true,
  imports: [GxSelect],
  template: `
    <div class="per-page-container">
      @if (showLabel()) {
        <span class="per-page-label">{{ labelPrefix() }}</span>
      }

      <gx-select
        [options]="optionObjects()"
        [(value)]="perPage"
        [size]="size()"
        [variant]="variant()"
        [intent]="intent()"
        [disabled]="disabled()"
        [name]="name()"
        [id]="id()"
        (valueChange)="handleChange($event)"
      />

      @if (showLabel()) {
        <span class="per-page-label">{{ labelSuffix() }}</span>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    .per-page-container {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .per-page-label {
      font-size: 0.875rem;
      color: var(--gx-color-gray-600, #525252);
      user-select: none;
    }

    /* 深色模式 */
    @media (prefers-color-scheme: dark) {
      .per-page-label {
        color: var(--gx-color-gray-400, #a3a3a3);
      }
    }

    html[data-theme="dark"] .per-page-label,
    html.dark .per-page-label {
      color: var(--gx-color-gray-400, #a3a3a3);
    }
  `]
})
export class GxPaginationPerPage {
  // ==================== 基本屬性 ====================

  /** select 元素的 name 屬性 */
  name = input<string>('perPage');

  /** select 元素的 id 屬性 */
  id = input<string | undefined>(undefined);

  /** 當前每頁顯示數量（雙向綁定） */
  perPage = model.required<number>();

  /** 可選的每頁顯示數量選項 */
  perPageOptions = input<number[]>([10, 20, 50, 100]);

  /** 是否禁用 */
  disabled = input<boolean>(false);

  // ==================== 設計系統屬性 ====================

  /** 尺寸 */
  size = input<GxSelectSize>('sm');

  /** 變體 */
  variant = input<GxSelectVariant>('ghost');

  /** Intent 語義色彩 */
  intent = input<GxSelectIntent>('info');

  // ==================== 標籤配置 ====================

  /** 是否顯示標籤 */
  showLabel = input<boolean>(true);

  /** 前綴標籤文字 */
  labelPrefix = input<string>('每頁');

  /** 後綴標籤文字 */
  labelSuffix = input<string>('筆');

  // ==================== 自訂樣式 ====================

  /** 自訂 CSS class（已棄用，建議使用 CSS Variables） */
  customClass = input<string>('');

  // ==================== 事件 ====================

  /** 每頁數量變更事件 */
  perPageChange = output<number>();

  // ==================== 計算屬性 ====================

  /**
   * 將數字陣列轉換為 GxSelectOption 格式
   */
  protected optionObjects = computed((): GxSelectOption<number>[] => {
    const options = this.perPageOptions();
    return options.map(n => ({
      label: `${n}`,
      value: n
    }));
  });

  // ==================== 事件處理 ====================

  /**
   * 處理選擇變更事件
   */
  protected handleChange(value: number | null): void {
    if (value !== null) {
      this.perPageChange.emit(value);
    }
  }
}

import { Component, input, output, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxPaginationInput } from '../pagination-input/gx-pagination-input';
import { GxPaginationSelect } from '../pagination-select/gx-pagination-select';
import { GxPaginationList } from '../pagination-list/gx-pagination-list';
import { GxPaginationPerPage } from '../pagination-per-page/gx-pagination-per-page';
import {
  SelectType,
  PaginationButton,
  PaginationCustomClass,
  PaginationInputProps,
  SelectorPosition
} from '../model/pagination.types';

/**
 * GxPagination Component
 *
 * 對應 Vue 的 Pagination.vue，完整的分頁組件
 * - 支援多種選擇模式（select, input, list）
 * - 支援每頁數量選擇
 * - 支援自訂樣式和位置
 * - 完全響應式設計
 */
@Component({
  selector: 'gx-pagination',
  standalone: true,
  imports: [
    CommonModule,
    GxPaginationInput,
    GxPaginationSelect,
    GxPaginationList,
    GxPaginationPerPage
  ],
  templateUrl: './gx-pagination.html',
  styleUrls: ['./gx-pagination.css']
})
export class GxPagination {
  // ==================== 基本配置 ====================

  /** 當前頁碼 */
  currentPageInput = input.required<number>();

  /** 每頁顯示數量 */
  pageSizeInput = input.required<number>();

  /** 總項目數 */
  totalItemsInput = input.required<number>();

  /** 按鈕配置 */
  button = input<PaginationButton>({
    next: { label: '下一頁', icon: true },
    previous: { label: '上一頁', icon: true }
  });

  /** 選擇類型 */
  selectType = input<SelectType>(SelectType.SELECT);

  // ==================== 外觀配置 ====================

  /** 自訂樣式類別 */
  customClass = input<PaginationCustomClass>({});

  /** 輸入框配置 */
  inputConfig = input<PaginationInputProps>({});

  /** 分頁控制器位置 */
  selectorPosition = input<SelectorPosition>('between');

  // ==================== 每頁顯示配置 ====================

  /** 是否顯示每頁數量選擇器 */
  showPerPageSelector = input<boolean>(false);

  /** 每頁選項 */
  perPageOptions = input<number[]>([5, 10, 20, 50]);

  /** 當前每頁顯示數量（用於同步） */
  currentPerPage = input<number | undefined>(undefined);

  // ==================== 事件輸出 ====================

  /** 頁碼變更事件 */
  pageChange = output<number>();

  /** 下一頁事件 */
  pageNext = output<number>();

  /** 上一頁事件 */
  pagePrevious = output<number>();

  /** 每頁數量變更事件 */
  perPageChange = output<number>();

  // ==================== 內部狀態 ====================

  /** 當前頁碼（內部狀態） */
  protected currentPage = signal<number>(1);

  /** 每頁數量（內部狀態） */
  protected perPage = signal<number>(10);

  /** 總頁數 */
  protected readonly totalPages = computed(() => {
    return Math.ceil(this.totalItemsInput() / this.pageSizeInput());
  });

  /** 容器 CSS class */
  protected readonly containerClass = computed(() => {
    const position = this.selectorPosition();
    if (position === 'between') {
      return 'justify-between gap-4';
    }
    return 'gap-4';
  });

  /** 每頁顯示區域容器樣式 */
  protected readonly perPageContainerClass = computed(() => {
    if (!this.showPerPageSelector()) {
      return '';
    }
    if (this.selectorPosition() === 'between') {
      return '';
    }
    return 'flex';
  });

  /** 每頁顯示的位置樣式 */
  protected readonly perPagePositionClass = computed(() => {
    const position = this.selectorPosition();
    if (position === 'left' || position === 'center') {
      return 'ml-auto';
    }
    if (position === 'right') {
      return 'ml-4';
    }
    return '';
  });

  /** 暴露 SelectType 給模板 */
  protected readonly SelectType = SelectType;

  // ==================== 生命週期 ====================

  constructor() {
    // 同步 input 到內部狀態
    effect(() => {
      this.currentPage.set(this.currentPageInput());
    });

    effect(() => {
      this.perPage.set(this.currentPerPage() || this.pageSizeInput());
    });
  }

  // ==================== 事件處理 ====================

  /**
   * 處理頁碼變更
   */
  protected handlePageChange(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }

    if (page !== this.currentPage()) {
      this.currentPage.set(page);
      this.pageChange.emit(page);
    }
  }

  /**
   * 處理上一頁
   */
  protected handlePrevious(): void {
    const current = this.currentPage();
    if (current > 1) {
      const newPage = current - 1;
      this.currentPage.set(newPage);
      this.pageChange.emit(newPage);
      this.pagePrevious.emit(newPage);
    }
  }

  /**
   * 處理下一頁
   */
  protected handleNext(): void {
    const current = this.currentPage();
    const total = this.totalPages();
    if (current < total) {
      const newPage = current + 1;
      this.currentPage.set(newPage);
      this.pageChange.emit(newPage);
      this.pageNext.emit(newPage);
    }
  }

  /**
   * 處理每頁數量變更
   */
  protected handlePerPageChange(value: number): void {
    this.perPage.set(value);
    this.perPageChange.emit(value);
  }

  /**
   * 檢查是否禁用上一頁按鈕
   */
  protected isPreviousDisabled(): boolean {
    return this.currentPage() <= 1;
  }

  /**
   * 檢查是否禁用下一頁按鈕
   */
  protected isNextDisabled(): boolean {
    return this.currentPage() >= this.totalPages();
  }
}

import { Component, input, output, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxButton, GxIcon } from '@sanring/gx-ui';
import { GxPaginationInput } from '../pagination-input/gx-pagination-input';
import { GxPaginationSelect } from '../pagination-select/gx-pagination-select';
import { GxPaginationList } from '../pagination-list/gx-pagination-list';
import { GxPaginationPerPage } from '../pagination-per-page/gx-pagination-per-page';
import {
  SelectType,
  PaginationButton,
  PaginationCustomClass,
  PaginationInputProps,
  SelectorPosition,
  PaginationConfig
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
    GxButton,
    GxIcon,
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

  /**
   * 分頁配置物件（新方式，與 TableService 整合使用）
   * 提供此參數時，會覆蓋 currentPageInput、pageSizeInput、totalItemsInput
   */
  config = input<PaginationConfig | null>(null);

  /** 當前頁碼（舊方式，向後兼容） */
  currentPageInput = input<number>(1);

  /** 每頁顯示數量（舊方式，向後兼容） */
  pageSizeInput = input<number>(10);

  /** 總項目數（舊方式，向後兼容） */
  totalItemsInput = input<number>(0);

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

  /** 每頁選擇器尺寸 */
  perPageSize = input<'sm' | 'md' | 'lg'>('sm');

  /** 每頁選擇器變體 */
  perPageVariant = input<'filled' | 'outline' | 'soft' | 'ghost' | 'glass'>('ghost');

  /** 每頁選擇器 Intent */
  perPageIntent = input<'info' | 'success' | 'warning' | 'error'>('info');

  /** 是否顯示每頁選擇器標籤 */
  perPageShowLabel = input<boolean>(true);

  /** 每頁選擇器前綴標籤 */
  perPageLabelPrefix = input<string>('每頁');

  /** 每頁選擇器後綴標籤 */
  perPageLabelSuffix = input<string>('筆');

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
    const cfg = this.config();
    if (cfg) {
      return Math.ceil(cfg.totalItems / cfg.pageSize);
    }
    return Math.ceil(this.totalItemsInput() / this.pageSizeInput());
  });

  /** 容器 CSS class */
  protected readonly containerClass = computed(() => {
    const position = this.selectorPosition();
    if (position === 'between') {
      return 'justify-between gap-4';
    }
    if (position === 'center-right') {
      return 'relative justify-center gap-4';
    }
    return 'gap-4';
  });

  /** 每頁顯示區域容器樣式 */
  protected readonly perPageContainerClass = computed(() => {
    if (!this.showPerPageSelector()) {
      return '';
    }
    if (this.selectorPosition() === 'between' || this.selectorPosition() === 'center-right') {
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
    if (position === 'center-right') {
      return 'absolute right-4';
    }
    return '';
  });

  /** 暴露 SelectType 給模板 */
  protected readonly SelectType = SelectType;

  // ==================== 生命週期 ====================

  constructor() {
    // 同步 input 到內部狀態
    effect(() => {
      const cfg = this.config();
      if (cfg) {
        // 使用 config 物件
        this.currentPage.set(cfg.currentPage);
      } else {
        // 使用獨立輸入（向後兼容）
        this.currentPage.set(this.currentPageInput());
      }
    });

    effect(() => {
      const cfg = this.config();
      if (cfg) {
        // 使用 config 物件
        this.perPage.set(this.currentPerPage() || cfg.pageSize);
      } else {
        // 使用獨立輸入（向後兼容）
        this.perPage.set(this.currentPerPage() || this.pageSizeInput());
      }
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

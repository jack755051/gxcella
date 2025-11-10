import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { PageChangeEvent } from '../model/pagination.types';

/**
 * Pagination Service Options
 */
export interface PaginationServiceOptions {
  /** 當前頁碼 */
  currentPage?: number;
  /** 每頁顯示數量 */
  pageSize?: number;
  /** 總項目數 */
  totalItems: number;
  /** 每頁選項 */
  pageSizeOptions?: number[];
}

/**
 * Pagination Service
 *
 * 對應 Vue 的 usePagination composable，提供分頁狀態管理功能：
 * - 頁碼管理
 * - 每頁數量管理
 * - 總頁數計算
 * - 頁碼範圍計算
 */
@Injectable()
export class PaginationService {
  // ==================== 內部狀態 ====================

  /** 當前頁碼 */
  readonly currentPage: WritableSignal<number>;

  /** 每頁顯示數量 */
  readonly pageSize: WritableSignal<number>;

  /** 總項目數 */
  readonly totalItems: WritableSignal<number>;

  /** 每頁選項 */
  readonly pageSizeOptions: WritableSignal<number[]>;

  // ==================== 計算屬性 ====================

  /** 總頁數 */
  readonly totalPages: Signal<number>;

  /** 是否有上一頁 */
  readonly hasPrevious: Signal<boolean>;

  /** 是否有下一頁 */
  readonly hasNext: Signal<boolean>;

  /** 當前頁的起始項目索引（從 1 開始） */
  readonly startIndex: Signal<number>;

  /** 當前頁的結束項目索引 */
  readonly endIndex: Signal<number>;

  /** 是否為第一頁 */
  readonly isFirstPage: Signal<boolean>;

  /** 是否為最後一頁 */
  readonly isLastPage: Signal<boolean>;

  constructor() {
    // 初始化狀態
    this.currentPage = signal(1);
    this.pageSize = signal(10);
    this.totalItems = signal(0);
    this.pageSizeOptions = signal([5, 10, 20, 50, 100]);

    // 計算總頁數
    this.totalPages = computed(() => {
      const total = this.totalItems();
      const size = this.pageSize();
      return Math.ceil(total / size) || 1;
    });

    // 計算是否有上一頁
    this.hasPrevious = computed(() => this.currentPage() > 1);

    // 計算是否有下一頁
    this.hasNext = computed(() => this.currentPage() < this.totalPages());

    // 計算起始索引
    this.startIndex = computed(() => {
      const current = this.currentPage();
      const size = this.pageSize();
      return (current - 1) * size + 1;
    });

    // 計算結束索引
    this.endIndex = computed(() => {
      const current = this.currentPage();
      const size = this.pageSize();
      const total = this.totalItems();
      return Math.min(current * size, total);
    });

    // 是否為第一頁
    this.isFirstPage = computed(() => this.currentPage() === 1);

    // 是否為最後一頁
    this.isLastPage = computed(() => this.currentPage() === this.totalPages());
  }

  /**
   * 初始化服務
   */
  initialize(options: PaginationServiceOptions): void {
    if (options.currentPage !== undefined) {
      this.currentPage.set(options.currentPage);
    }
    if (options.pageSize !== undefined) {
      this.pageSize.set(options.pageSize);
    }
    if (options.totalItems !== undefined) {
      this.totalItems.set(options.totalItems);
    }
    if (options.pageSizeOptions !== undefined) {
      this.pageSizeOptions.set(options.pageSizeOptions);
    }
  }

  /**
   * 跳轉到指定頁
   */
  goToPage(page: number): boolean {
    const total = this.totalPages();

    // 驗證頁碼
    if (page < 1 || page > total) {
      return false;
    }

    // 如果是當前頁，不需要更新
    if (page === this.currentPage()) {
      return false;
    }

    this.currentPage.set(page);
    return true;
  }

  /**
   * 前往下一頁
   */
  nextPage(): boolean {
    if (!this.hasNext()) {
      return false;
    }
    return this.goToPage(this.currentPage() + 1);
  }

  /**
   * 前往上一頁
   */
  previousPage(): boolean {
    if (!this.hasPrevious()) {
      return false;
    }
    return this.goToPage(this.currentPage() - 1);
  }

  /**
   * 前往第一頁
   */
  firstPage(): boolean {
    return this.goToPage(1);
  }

  /**
   * 前往最後一頁
   */
  lastPage(): boolean {
    return this.goToPage(this.totalPages());
  }

  /**
   * 更改每頁顯示數量
   */
  changePageSize(size: number): void {
    if (size < 1) {
      return;
    }

    this.pageSize.set(size);

    // 重新計算當前頁碼，確保不超出範圍
    const total = this.totalPages();
    const current = this.currentPage();

    if (current > total) {
      this.currentPage.set(total);
    }
  }

  /**
   * 更新總項目數
   */
  updateTotalItems(total: number): void {
    this.totalItems.set(total);

    // 確保當前頁碼在有效範圍內
    const totalPages = this.totalPages();
    const current = this.currentPage();

    if (current > totalPages && totalPages > 0) {
      this.currentPage.set(totalPages);
    }
  }

  /**
   * 重置到第一頁
   */
  reset(): void {
    this.currentPage.set(1);
  }

  /**
   * 獲取當前分頁狀態
   */
  getState(): PageChangeEvent {
    return {
      currentPage: this.currentPage(),
      pageSize: this.pageSize(),
      totalPages: this.totalPages(),
      totalItems: this.totalItems()
    };
  }

  /**
   * 計算可見的頁碼列表（用於 PaginationList）
   */
  getVisiblePages(maxVisible: number = 5): number[] {
    const total = this.totalPages();
    const current = this.currentPage();

    // 如果總頁數小於等於最大可見數，顯示所有頁碼
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: number[] = [];
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, current - half);
    let end = Math.min(total, start + maxVisible - 1);

    // 調整起始位置
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    // 添加頁碼
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  /**
   * 檢查頁碼是否有效
   */
  isValidPage(page: number): boolean {
    return page >= 1 && page <= this.totalPages();
  }

  /**
   * 檢查是否為當前頁
   */
  isCurrentPage(page: number): boolean {
    return page === this.currentPage();
  }
}

import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { TableColumn, TableState, SortConfig, PaginationConfig } from '../model/table.types';

/**
 * Table Service 配置選項
 */
export interface TableServiceOptions<T = any> {
  /** 表格資料 */
  data: WritableSignal<T[]> | Signal<T[]>;
  /** 欄位配置 */
  columns: TableColumn[];
  /** ID 欄位鍵值 */
  idKey?: string;
  /** 判斷行是否禁用 */
  disabledPredicate?: (row: T) => boolean;
  /** 排序回調函數（用於 API 排序） */
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  /** 分頁配置（啟用分頁功能） */
  pagination?: {
    /** 初始頁碼 */
    initialPage?: number;
    /** 每頁顯示數量 */
    pageSize?: number;
    /** 總項目數（用於 API 分頁） */
    totalItems?: number;
    /** 頁碼變更回調（用於 API 分頁） */
    onPageChange?: (page: number, pageSize: number) => void;
  };
}

/**
 * Table Service
 *
 * 對應 Vue 的 useTable composable，提供表格狀態管理功能：
 * - 排序管理（客戶端 + API）
 * - 行選擇管理（全選、單選、禁用行）
 * - 排序資料計算
 */
@Injectable()
export class TableService<T extends Record<string, any> = any> {
  private options!: Required<TableServiceOptions<T>>;

  // 狀態管理
  readonly state: WritableSignal<TableState>;

  // 排序後的資料
  readonly sortedData: Signal<T[]>;

  // 選擇狀態
  readonly hasSelection: Signal<boolean>;
  readonly selectedCount: Signal<number>;
  readonly isAllSelected: Signal<boolean>;
  readonly isIndeterminate: Signal<boolean>;

  // 可選擇的資料（排除禁用的）
  private readonly selectableData: Signal<T[]>;
  private readonly selectableCount: Signal<number>;

  // 分頁狀態
  readonly paginationState: Signal<PaginationConfig | null>;
  readonly paginatedData: Signal<T[]>;
  readonly totalPages: Signal<number>;

  constructor() {
    // 初始化狀態
    this.state = signal<TableState>({
      sortConfig: {
        key: null,
        direction: 'asc',
      },
      selectedIds: [],
    });

    // 初始化計算屬性（會在 initialize 後重新綁定）
    this.sortedData = computed(() => []);
    this.selectableData = computed(() => []);
    this.selectableCount = computed(() => 0);
    this.hasSelection = computed(() => this.state().selectedIds.length > 0);
    this.selectedCount = computed(() => this.state().selectedIds.length);
    this.isAllSelected = computed(() => false);
    this.isIndeterminate = computed(() => false);
    this.paginationState = computed(() => this.state().pagination ?? null);
    this.paginatedData = computed(() => []);
    this.totalPages = computed(() => 0);
  }

  /**
   * 初始化 Service
   */
  initialize(options: TableServiceOptions<T>): void {
    this.options = {
      idKey: 'id',
      disabledPredicate: undefined,
      onSort: undefined,
      ...options,
    } as Required<TableServiceOptions<T>>;

    // 如果啟用分頁，初始化分頁狀態
    if (options.pagination) {
      const dataLength = this.options.data().length;
      // 客戶端分頁：使用實際資料長度
      // API 分頁：使用提供的 totalItems（可能大於當前載入的資料）
      const totalItems = options.pagination.onPageChange
        ? (options.pagination.totalItems ?? dataLength)
        : dataLength;

      this.state.update(state => ({
        ...state,
        pagination: {
          currentPage: options.pagination?.initialPage ?? 1,
          pageSize: options.pagination?.pageSize ?? 10,
          totalItems,
        }
      }));
    }

    // 重新綁定計算屬性
    this.bindComputedProperties();
  }

  /**
   * 綁定計算屬性
   */
  private bindComputedProperties(): void {
    // 排序後的資料
    (this.sortedData as any) = computed(() => {
      const data = this.options.data();
      const sortConfig = this.state().sortConfig;

      // 如果提供了 onSort 回調，則不在客戶端排序
      if (this.options.onSort) {
        return data;
      }

      // 客戶端排序邏輯
      if (!sortConfig.key) {
        return data;
      }

      const sorted = [...data].sort((a, b) => {
        const key = sortConfig.key as string;
        let aValue = a[key];
        let bValue = b[key];

        // 處理空值
        if (aValue === null || aValue === undefined || aValue === '') aValue = '';
        if (bValue === null || bValue === undefined || bValue === '') bValue = '';

        // 字串排序
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue, 'zh-TW')
            : bValue.localeCompare(aValue, 'zh-TW');
        }

        // 數值排序
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });

      return sorted;
    });

    // 可選擇的資料（排除禁用的）
    (this.selectableData as any) = computed(() => {
      const data = this.options.data();
      return data.filter(item => !this.isRowDisabled(item));
    });

    // 可選擇的資料數量
    (this.selectableCount as any) = computed(() => this.selectableData().length);

    // 是否全選（只考慮可選擇的列）
    (this.isAllSelected as any) = computed(() => {
      const count = this.selectableCount();
      if (count === 0) return false;
      return this.state().selectedIds.length === count;
    });

    // 是否部分選中
    (this.isIndeterminate as any) = computed(() => {
      const selectedCount = this.state().selectedIds.length;
      const selectableCount = this.selectableCount();
      return selectedCount > 0 && selectedCount < selectableCount;
    });

    // 分頁資料
    (this.paginatedData as any) = computed(() => {
      const pagination = this.state().pagination;
      if (!pagination) {
        // 沒有分頁時返回所有排序後的資料
        return this.sortedData();
      }

      // 如果有 onPageChange 回調，表示使用 API 分頁，直接返回 sortedData
      if (this.options.pagination?.onPageChange) {
        return this.sortedData();
      }

      // 客戶端分頁：對排序後的資料進行切片
      const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      return this.sortedData().slice(startIndex, endIndex);
    });

    // 總頁數
    (this.totalPages as any) = computed(() => {
      const pagination = this.state().pagination;
      if (!pagination) {
        return 0;
      }
      return Math.ceil(pagination.totalItems / pagination.pageSize);
    });
  }

  /**
   * 處理排序
   */
  handleSort(key: string): void {
    const column = this.options.columns.find(col => col.key === key);
    if (!column?.sortable) {
      return;
    }

    this.state.update(state => {
      const newState = { ...state };

      if (state.sortConfig.key === key) {
        // 切換排序方向
        newState.sortConfig = {
          key,
          direction: state.sortConfig.direction === 'asc' ? 'desc' : 'asc'
        };
      } else {
        // 新的排序欄位
        newState.sortConfig = {
          key,
          direction: 'asc'
        };
      }

      return newState;
    });

    // 如果提供了 onSort 回調，則調用它（用於 API 排序）
    if (this.options.onSort) {
      const sortConfig = this.state().sortConfig;
      this.options.onSort(sortConfig.key!, sortConfig.direction);
    }
  }

  /**
   * 判斷行是否禁用
   */
  isRowDisabled(row: T): boolean {
    return this.options.disabledPredicate ? this.options.disabledPredicate(row) : false;
  }

  /**
   * 判斷行是否已選中
   */
  isRowSelected(id: string): boolean {
    return this.state().selectedIds.includes(id);
  }

  /**
   * 全選/取消全選（只處理可選擇的列）
   */
  toggleSelectAll(): void {
    this.state.update(state => {
      const newState = { ...state };

      if (this.isAllSelected() || this.isIndeterminate()) {
        // 取消全選
        newState.selectedIds = [];
      } else {
        // 全選（只選擇可選擇的列）
        const idKey = this.options.idKey;
        newState.selectedIds = this.selectableData().map(item => item[idKey]);
      }

      return newState;
    });
  }

  /**
   * 切換單行選擇（禁用的列不允許選擇）
   */
  toggleSelectRow(id: string): void {
    const data = this.options.data();
    const idKey = this.options.idKey;
    const row = data.find(item => item[idKey] === id);

    if (!row || this.isRowDisabled(row)) {
      return; // 禁用的列不處理
    }

    this.state.update(state => {
      const newState = { ...state };
      const index = state.selectedIds.indexOf(id);

      if (index > -1) {
        // 取消選擇
        newState.selectedIds = state.selectedIds.filter(selectedId => selectedId !== id);
      } else {
        // 選擇
        newState.selectedIds = [...state.selectedIds, id];
      }

      return newState;
    });
  }

  /**
   * 清空選擇
   */
  clearSelection(): void {
    this.state.update(state => ({
      ...state,
      selectedIds: []
    }));
  }

  /**
   * 獲取已選中的資料
   */
  getSelectedRows(): T[] {
    const data = this.options.data();
    const idKey = this.options.idKey;
    const selectedIds = this.state().selectedIds;

    return data.filter(item => selectedIds.includes(item[idKey]));
  }

  /**
   * 設置選中的 ID
   */
  setSelectedIds(ids: string[]): void {
    this.state.update(state => ({
      ...state,
      selectedIds: ids
    }));
  }

  /**
   * 重置狀態
   */
  reset(): void {
    this.state.set({
      sortConfig: {
        key: null,
        direction: 'asc',
      },
      selectedIds: [],
    });
  }

  // ==================== 分頁方法 ====================

  /**
   * 處理頁碼變更
   */
  handlePageChange(page: number): void {
    const pagination = this.state().pagination;
    if (!pagination) {
      return;
    }

    // 檢查頁碼是否有效
    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.state.update(state => ({
      ...state,
      pagination: {
        ...state.pagination!,
        currentPage: page,
      }
    }));

    // 如果提供了 onPageChange 回調，調用它（用於 API 分頁）
    if (this.options.pagination?.onPageChange) {
      this.options.pagination.onPageChange(page, pagination.pageSize);
    }
  }

  /**
   * 設置每頁顯示數量
   */
  setPageSize(pageSize: number): void {
    const pagination = this.state().pagination;
    if (!pagination) {
      return;
    }

    this.state.update(state => ({
      ...state,
      pagination: {
        ...state.pagination!,
        pageSize,
        currentPage: 1, // 重置到第一頁
      }
    }));

    // 如果提供了 onPageChange 回調，調用它
    if (this.options.pagination?.onPageChange) {
      this.options.pagination.onPageChange(1, pageSize);
    }
  }

  /**
   * 更新總項目數（用於 API 分頁）
   */
  updateTotalItems(totalItems: number): void {
    const pagination = this.state().pagination;
    if (!pagination) {
      return;
    }

    this.state.update(state => ({
      ...state,
      pagination: {
        ...state.pagination!,
        totalItems,
      }
    }));
  }

  /**
   * 上一頁
   */
  previousPage(): void {
    const pagination = this.state().pagination;
    if (pagination && pagination.currentPage > 1) {
      this.handlePageChange(pagination.currentPage - 1);
    }
  }

  /**
   * 下一頁
   */
  nextPage(): void {
    const pagination = this.state().pagination;
    if (pagination && pagination.currentPage < this.totalPages()) {
      this.handlePageChange(pagination.currentPage + 1);
    }
  }
}

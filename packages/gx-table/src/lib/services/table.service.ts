import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { TableColumn, TableState, SortConfig } from '../model/table.types';

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
}

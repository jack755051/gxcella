/**
 * Table 欄位定義
 */
export interface TableColumn {
  /** 欄位鍵值 */
  key: string;
  /** 欄位標籤 */
  label: string;
  /** 是否可排序 */
  sortable?: boolean;
  /** 欄位寬度，例如 '100px', '20%', 'auto' */
  width?: string;
  /** 最小寬度 */
  minWidth?: string;
  /** 最大寬度 */
  maxWidth?: string;
  /** 對齊方式 */
  align?: 'left' | 'center' | 'right';
}

/**
 * 排序配置
 */
export interface SortConfig {
  /** 排序的欄位鍵值 */
  key: string | null;
  /** 排序方向 */
  direction: 'asc' | 'desc';
}

/**
 * 分頁配置
 */
export interface PaginationConfig {
  /** 當前頁碼（從 1 開始） */
  currentPage: number;
  /** 每頁顯示數量 */
  pageSize: number;
  /** 總項目數 */
  totalItems: number;
}

/**
 * Table 狀態
 */
export interface TableState {
  /** 排序配置 */
  sortConfig: SortConfig;
  /** 已選擇的 ID 列表 */
  selectedIds: string[];
  /** 分頁配置（可選） */
  pagination?: PaginationConfig;
}

/**
 * 排序事件
 */
export interface SortEvent {
  /** 欄位鍵值 */
  key: string;
  /** 排序方向 */
  direction: 'asc' | 'desc';
}

/**
 * 行選擇事件
 */
export interface RowSelectEvent {
  /** 行 ID */
  id: string;
  /** 是否選中 */
  selected: boolean;
}

/**
 * Pagination configuration interface
 */
export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  maxVisiblePages?: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  showPageNumbers?: boolean;
  showPageSize?: boolean;
  pageSizeOptions?: number[];
  disabled?: boolean;
}

/**
 * Pagination change event
 */
export interface PageChangeEvent {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

/**
 * Custom class configuration for pagination
 */
export interface PaginationCustomClass {
  container?: string;
  nav?: string;
  list?: string;
  item?: string;
  link?: string;
  active?: string;
  disabled?: string;
  ellipsis?: string;
  pageSize?: string;
  info?: string;
  previousButton?: string;
  nextButton?: string;
  disableButton?: string;
}

/**
 * Pagination labels for internationalization
 */
export interface PaginationLabels {
  first?: string;
  previous?: string;
  next?: string;
  last?: string;
  page?: string;
  of?: string;
  items?: string;
  itemsPerPage?: string;
}

/**
 * Select type enum - determines how page selection is displayed
 */
export enum SelectType {
  SELECT = 'select',
  INPUT = 'input',
  LIST = 'list'
}

/**
 * Button configuration interface
 */
export interface PaginationButtonProps {
  label: string;
  icon?: boolean;
  customClass?: string;
  action?: () => void;
}

/**
 * Button configuration for prev/next buttons
 */
export interface PaginationButton {
  next: PaginationButtonProps;
  previous: PaginationButtonProps;
}

/**
 * Input configuration for PaginationInput component
 */
export interface PaginationInputProps {
  show?: boolean;
  placeholder?: string;
  inputClass?: string;
  disabled?: boolean;
}

/**
 * Selector position options
 * - 'left': 分頁控制器靠左，每頁選擇器靠右
 * - 'center': 分頁控制器居中，每頁選擇器靠右
 * - 'right': 分頁控制器和每頁選擇器都靠右
 * - 'between': 分頁控制器靠左，每頁選擇器靠右（justify-between）
 * - 'center-right': 分頁控制器居中，每頁選擇器固定右側（新增）
 */
export type SelectorPosition = 'left' | 'center' | 'right' | 'between' | 'center-right';

/**
 * Per-page selector configuration
 * 每頁選擇器樣式配置（使用 GxSelect 組件）
 */
export interface PerPageSelectorConfig {
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 變體 */
  variant?: 'filled' | 'outline' | 'soft' | 'ghost' | 'glass';
  /** Intent 語義色彩 */
  intent?: 'info' | 'success' | 'warning' | 'error';
  /** 是否顯示標籤 */
  showLabel?: boolean;
  /** 前綴標籤文字 */
  labelPrefix?: string;
  /** 後綴標籤文字 */
  labelSuffix?: string;
}

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

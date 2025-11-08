import { TableColumn, SortConfig } from '@sanring/gx-table';
import { ButtonType } from '@shared/lib/button/button.model';

// ==================== 基礎類型定義 ====================

/**
 * Table 欄位擴展配置（支援按鈕渲染）
 */
export type TableColumnWithActions<T = any> = TableColumn & {
  /** 自定義渲染類型 */
  renderType?: 'text' | 'button' | 'buttons' | 'custom';
  /** 按鈕配置函數（當 renderType 為 'button' 或 'buttons' 時使用） */
  buttonConfig?: (row: T) => ButtonType | ButtonType[];
  /** 自定義渲染函數 */
  customRender?: (row: T) => any;
};

/**
 * Table 配置選項
 */
export type TableConfig = {
  /** 是否可選擇（顯示 checkbox） */
  selectable?: boolean;
  /** 是否可排序 */
  sortable?: boolean;
  /** 初始排序配置 */
  initialSort?: SortConfig;
  /** 是否顯示空狀態 */
  showEmptyState?: boolean;
  /** 空狀態文字 */
  emptyStateText?: string;
  /** 是否顯示分頁 */
  showPagination?: boolean;
  /** 每頁顯示數量 */
  pageSize?: number;
  /** ID 欄位鍵值（用於選擇功能） */
  idKey?: string;
};

/**
 * Table 動作按鈕配置
 */
export type TableAction<T = any> = {
  /** 按鈕文字 */
  label: string;
  /** 按鈕圖標 */
  icon?: string;
  /** 按鈕樣式 */
  intent?: 'info' | 'success' | 'warning' | 'error';
  /** 點擊事件 */
  onClick: (row: T) => void;
  /** 是否禁用（可以是函數動態判斷） */
  disabled?: boolean | ((row: T) => boolean);
  /** 是否顯示（可以是函數動態判斷） */
  visible?: boolean | ((row: T) => boolean);
};

// ==================== 基礎 Table 類型 ====================

/**
 * 基礎 Table 配置（泛型 T 代表資料行的類型）
 */
export type TableBase<T extends Record<string, any> = any> = {
  /** 唯一識別 ID */
  id: string;
  /** 欄位配置 */
  columns: TableColumnWithActions<T>[];
  /** 表格資料 */
  data: T[];
  /** 表格配置 */
  config?: TableConfig;
};

// ==================== 擴展 Table 類型 ====================

/**
 * 可選擇的 Table（帶 checkbox）
 */
export type TableWithSelection<T extends Record<string, any> = any> = TableBase<T> & {
  config: TableConfig & {
    selectable: true;
  };
  /** 已選擇的 ID 列表 */
  selectedIds?: string[];
  /** 選擇變更事件 */
  onSelectionChange?: (selectedIds: string[], selectedRows: T[]) => void;
};

/**
 * 可排序的 Table
 */
export type TableWithSort<T extends Record<string, any> = any> = TableBase<T> & {
  config: TableConfig & {
    sortable: true;
  };
  /** 排序變更事件 */
  onSortChange?: (sortConfig: SortConfig) => void;
};

/**
 * 帶行動作按鈕的 Table
 */
export type TableWithActions<T extends Record<string, any> = any> = TableBase<T> & {
  /** 行動作按鈕配置 */
  rowActions: TableAction<T>[];
};

/**
 * 帶工具列按鈕的 Table
 */
export type TableWithToolbar<T extends Record<string, any> = any> = TableBase<T> & {
  /** 工具列按鈕配置 */
  toolbarActions: ButtonType[];
  /** 工具列標題 */
  toolbarTitle?: string;
};

/**
 * 帶分頁的 Table
 */
export type TableWithPagination<T extends Record<string, any> = any> = TableBase<T> & {
  config: TableConfig & {
    showPagination: true;
  };
  /** 總資料筆數 */
  totalItems: number;
  /** 當前頁碼 */
  currentPage?: number;
  /** 頁面變更事件 */
  onPageChange?: (page: number, pageSize: number) => void;
};

/**
 * 完整功能 Table（可選擇 + 可排序 + 行動作 + 分頁）
 */
export type TableWithFullFeatures<T extends Record<string, any> = any> = TableBase<T> & {
  config: TableConfig & {
    selectable: true;
    sortable: true;
    showPagination: true;
  };
  selectedIds?: string[];
  rowActions?: TableAction<T>[];
  toolbarActions?: ButtonType[];
  toolbarTitle?: string;
  totalItems: number;
  currentPage?: number;
  onSelectionChange?: (selectedIds: string[], selectedRows: T[]) => void;
  onSortChange?: (sortConfig: SortConfig) => void;
  onPageChange?: (page: number, pageSize: number) => void;
};

// ==================== 聯合類型 ====================

/**
 * Table 聯合類型（支援所有變體）
 */
export type Table<T extends Record<string, any> = any> =
  | TableBase<T>
  | TableWithSelection<T>
  | TableWithSort<T>
  | TableWithActions<T>
  | TableWithToolbar<T>
  | TableWithPagination<T>
  | TableWithFullFeatures<T>;

// ==================== 使用範例 ====================

/**
 * 範例 1: 基礎用戶列表（無特殊功能）
 */
export type UserData = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
};

const basicUserTable: TableBase<UserData> = {
  id: 'user-table',
  columns: [
    { key: 'name', label: '姓名' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: '角色' },
    { key: 'status', label: '狀態' },
  ],
  data: [
    { id: '1', name: 'John', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: '2', name: 'Jane', email: 'jane@example.com', role: 'User', status: 'active' },
  ],
};

/**
 * 範例 2: 可選擇 + 可排序的產品列表
 */
export type ProductData = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
};

const productTableWithSelectionAndSort: TableWithSelection<ProductData> & TableWithSort<ProductData> = {
  id: 'product-table',
  columns: [
    { key: 'name', label: '產品名稱', sortable: true },
    { key: 'price', label: '價格', sortable: true, align: 'right' },
    { key: 'stock', label: '庫存', sortable: true, align: 'right' },
    { key: 'category', label: '分類' },
  ],
  data: [
    { id: 'p1', name: 'iPhone 15', price: 30000, stock: 50, category: '手機' },
    { id: 'p2', name: 'MacBook Pro', price: 60000, stock: 20, category: '筆電' },
  ],
  config: {
    selectable: true,
    sortable: true,
    idKey: 'id',
  },
  selectedIds: [],
  onSelectionChange: (selectedIds, selectedRows) => {
    console.log('Selected products:', selectedRows);
  },
  onSortChange: (sortConfig) => {
    console.log('Sort changed:', sortConfig);
  },
};

/**
 * 範例 3: 帶行動作按鈕的訂單列表
 */
export type OrderData = {
  id: string;
  orderNumber: string;
  customer: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
};

const orderTableWithActions: TableWithActions<OrderData> = {
  id: 'order-table',
  columns: [
    { key: 'orderNumber', label: '訂單編號' },
    { key: 'customer', label: '客戶' },
    { key: 'total', label: '金額', align: 'right' },
    { key: 'status', label: '狀態' },
    {
      key: 'actions',
      label: '操作',
      renderType: 'buttons',
      buttonConfig: (row) => [
        {
          label: '查看',
          icon: 'eye',
          intent: 'info',
          onClick: () => console.log('View order:', row.id),
        },
        {
          label: '取消',
          icon: 'x',
          intent: 'error',
          onClick: () => console.log('Cancel order:', row.id),
          disabled: row.status === 'cancelled',
        },
      ],
    },
  ],
  data: [
    { id: 'o1', orderNumber: 'ORD-001', customer: 'John Doe', total: 1500, status: 'pending' },
    { id: 'o2', orderNumber: 'ORD-002', customer: 'Jane Smith', total: 2500, status: 'completed' },
  ],
  rowActions: [
    {
      label: '編輯',
      icon: 'edit',
      intent: 'info',
      onClick: (row) => console.log('Edit:', row),
    },
    {
      label: '刪除',
      icon: 'trash',
      intent: 'error',
      onClick: (row) => console.log('Delete:', row),
      disabled: (row) => row.status === 'completed',
    },
  ],
};

/**
 * 範例 4: 完整功能的員工管理表格
 */
export type EmployeeData = {
  id: string;
  name: string;
  email: string;
  department: string;
  salary: number;
  joinDate: string;
  status: 'active' | 'inactive' | 'onLeave';
};

const fullFeaturedEmployeeTable: TableWithFullFeatures<EmployeeData> = {
  id: 'employee-table',
  columns: [
    { key: 'name', label: '姓名', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'department', label: '部門', sortable: true },
    { key: 'salary', label: '薪資', sortable: true, align: 'right' },
    { key: 'joinDate', label: '到職日', sortable: true },
    { key: 'status', label: '狀態' },
    {
      key: 'actions',
      label: '操作',
      renderType: 'buttons',
      buttonConfig: (row) => [
        {
          label: '編輯',
          icon: 'edit',
          intent: 'info',
          onClick: () => console.log('Edit employee:', row.id),
        },
        {
          label: '停用',
          icon: 'user-x',
          intent: 'warning',
          onClick: () => console.log('Deactivate employee:', row.id),
          visible: row.status === 'active',
        },
      ],
    },
  ],
  data: [
    {
      id: 'e1',
      name: 'Alice Johnson',
      email: 'alice@company.com',
      department: 'Engineering',
      salary: 80000,
      joinDate: '2023-01-15',
      status: 'active',
    },
    {
      id: 'e2',
      name: 'Bob Wilson',
      email: 'bob@company.com',
      department: 'Marketing',
      salary: 65000,
      joinDate: '2023-03-20',
      status: 'active',
    },
  ],
  config: {
    selectable: true,
    sortable: true,
    showPagination: true,
    pageSize: 10,
    idKey: 'id',
  },
  selectedIds: [],
  toolbarTitle: '員工管理',
  toolbarActions: [
    {
      label: '新增員工',
      icon: 'user-plus',
      intent: 'success',
      onClick: () => console.log('Add new employee'),
    },
    {
      label: '匯出',
      icon: 'download',
      intent: 'info',
      onClick: () => console.log('Export employees'),
    },
  ],
  rowActions: [
    {
      label: '查看詳情',
      icon: 'eye',
      intent: 'info',
      onClick: (row) => console.log('View details:', row),
    },
    {
      label: '編輯',
      icon: 'edit',
      intent: 'info',
      onClick: (row) => console.log('Edit:', row),
    },
    {
      label: '刪除',
      icon: 'trash',
      intent: 'error',
      onClick: (row) => console.log('Delete:', row),
      disabled: (row) => row.status !== 'inactive',
    },
  ],
  totalItems: 100,
  currentPage: 1,
  onSelectionChange: (selectedIds, selectedRows) => {
    console.log('Selected employees:', selectedRows);
  },
  onSortChange: (sortConfig) => {
    console.log('Sort config:', sortConfig);
  },
  onPageChange: (page, pageSize) => {
    console.log('Page changed:', { page, pageSize });
  },
};

// ==================== 類型守衛（Type Guards） ====================

export function isTableWithSelection<T extends Record<string, any>>(
  table: Table<T>
): table is TableWithSelection<T> {
  return table.config?.selectable === true;
}

export function isTableWithSort<T extends Record<string, any>>(
  table: Table<T>
): table is TableWithSort<T> {
  return table.config?.sortable === true;
}

export function isTableWithActions<T extends Record<string, any>>(
  table: Table<T>
): table is TableWithActions<T> {
  return 'rowActions' in table && Array.isArray(table.rowActions);
}

export function isTableWithPagination<T extends Record<string, any>>(
  table: Table<T>
): table is TableWithPagination<T> {
  return table.config?.showPagination === true;
}

// ==================== 工具函數 ====================

/**
 * 創建基礎 Table 配置
 */
export function createTableBase<T extends Record<string, any>>(
  id: string,
  columns: TableColumnWithActions<T>[],
  data: T[],
  config?: TableConfig
): TableBase<T> {
  return { id, columns, data, config };
}

/**
 * 為 Table 添加選擇功能
 */
export function withSelection<T extends Record<string, any>>(
  table: TableBase<T>,
  options?: {
    selectedIds?: string[];
    onSelectionChange?: (selectedIds: string[], selectedRows: T[]) => void;
  }
): TableWithSelection<T> {
  return {
    ...table,
    config: {
      ...table.config,
      selectable: true,
    },
    selectedIds: options?.selectedIds || [],
    onSelectionChange: options?.onSelectionChange,
  };
}

/**
 * 為 Table 添加排序功能
 */
export function withSort<T extends Record<string, any>>(
  table: TableBase<T>,
  options?: {
    initialSort?: SortConfig;
    onSortChange?: (sortConfig: SortConfig) => void;
  }
): TableWithSort<T> {
  return {
    ...table,
    config: {
      ...table.config,
      sortable: true,
      initialSort: options?.initialSort,
    },
    onSortChange: options?.onSortChange,
  };
}

/**
 * 為 Table 添加行動作
 */
export function withActions<T extends Record<string, any>>(
  table: TableBase<T>,
  rowActions: TableAction<T>[]
): TableWithActions<T> {
  return {
    ...table,
    rowActions,
  };
}

/**
 * 為 Table 添加分頁功能
 */
export function withPagination<T extends Record<string, any>>(
  table: TableBase<T>,
  options: {
    totalItems: number;
    currentPage?: number;
    pageSize?: number;
    onPageChange?: (page: number, pageSize: number) => void;
  }
): TableWithPagination<T> {
  return {
    ...table,
    config: {
      ...table.config,
      showPagination: true,
      pageSize: options.pageSize || 10,
    },
    totalItems: options.totalItems,
    currentPage: options.currentPage || 1,
    onPageChange: options.onPageChange,
  };
}

// ==================== 使用範例：組合模式 ====================

/**
 * 範例：使用工具函數組合出完整功能的 Table
 */
type TaskData = {
  id: string;
  title: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'inProgress' | 'done';
  dueDate: string;
};

// 1. 創建基礎 Table
const baseTaskTable = createTableBase<TaskData>(
  'task-table',
  [
    { key: 'title', label: '任務名稱', sortable: true },
    { key: 'assignee', label: '負責人', sortable: true },
    { key: 'priority', label: '優先級', sortable: true },
    { key: 'status', label: '狀態' },
    { key: 'dueDate', label: '截止日期', sortable: true },
  ],
  [
    {
      id: 't1',
      title: '完成專案報告',
      assignee: 'Alice',
      priority: 'high',
      status: 'inProgress',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      title: '更新文檔',
      assignee: 'Bob',
      priority: 'medium',
      status: 'todo',
      dueDate: '2025-12-15',
    },
  ]
);

// 2. 組合功能
const taskTableWithFeatures = withPagination(
  withSort(
    withSelection(
      withActions(baseTaskTable, [
        {
          label: '編輯',
          icon: 'edit',
          intent: 'info',
          onClick: (row) => console.log('Edit task:', row),
        },
        {
          label: '完成',
          icon: 'check',
          intent: 'success',
          onClick: (row) => console.log('Complete task:', row),
          visible: (row) => row.status !== 'done',
        },
      ]),
      {
        onSelectionChange: (ids, rows) => console.log('Selected tasks:', rows),
      }
    ),
    {
      onSortChange: (config) => console.log('Sort:', config),
    }
  ),
  {
    totalItems: 50,
    pageSize: 10,
    onPageChange: (page, size) => console.log('Page:', page, 'Size:', size),
  }
);

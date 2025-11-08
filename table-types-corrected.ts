import { TableColumn, SortConfig, TableState, SortEvent, RowSelectEvent } from '@sanring/gx-table';
import { Signal, WritableSignal } from '@angular/core';
import { ButtonType } from '@shared/lib/button/button.model';

// ==================== 基於 gx-table 實際 API 的類型擴展 ====================

/**
 * 擴展 TableColumn，支援自定義渲染（如按鈕）
 */
export type TableColumnExtended<T = any> = TableColumn & {
  /** 自定義渲染類型 */
  renderType?: 'text' | 'button' | 'buttons' | 'custom' | 'template';
  /** 按鈕配置函數（當 renderType 為 'button' 或 'buttons' 時使用） */
  buttonConfig?: (row: T) => ButtonType | ButtonType[];
  /** 自定義渲染函數 */
  customRender?: (row: T, value: any) => any;
  /** 格式化函數 */
  formatter?: (value: any, row: T) => string;
};

/**
 * Table 動作按鈕（基於 gx-table 的實際使用場景）
 */
export type TableAction<T = any> = {
  /** 按鈕標籤 */
  label: string;
  /** 按鈕圖標 */
  icon?: string;
  /** 按鈕意圖 */
  intent?: 'info' | 'success' | 'warning' | 'error';
  /** 按鈕變體 */
  variant?: 'filled' | 'outline' | 'soft' | 'ghost';
  /** 點擊事件 */
  onClick: (row: T) => void;
  /** 是否禁用（可以是函數動態判斷） */
  disabled?: boolean | ((row: T) => boolean);
  /** 是否顯示（可以是函數動態判斷） */
  visible?: boolean | ((row: T) => boolean);
};

/**
 * Table 工具列配置
 */
export type TableToolbar = {
  /** 工具列標題 */
  title?: string;
  /** 工具列按鈕 */ 
  actions?: ButtonType[];
  /** 搜尋框配置 */
  searchConfig?: {
    placeholder?: string;
    onSearch?: (keyword: string) => void;
  };
};

/**
 * Table 分頁配置
 */
export type TablePagination = {
  /** 當前頁碼 */
  currentPage: number;
  /** 每頁顯示數量 */
  pageSize: number;
  /** 總資料筆數 */
  totalItems: number;
  /** 頁碼變更事件 */
  onPageChange?: (page: number) => void;
  /** 頁面大小變更事件 */
  onPageSizeChange?: (size: number) => void;
  /** 頁面大小選項 */
  pageSizeOptions?: number[];
};

/**
 * Table 空狀態配置
 */
export type TableEmptyState = {
  /** 標題 */
  title?: string;
  /** 描述 */
  description?: string;
  /** 圖標 */
  icon?: string;
  /** 動作按鈕 */
  action?: ButtonType;
};

// ==================== 基礎 Table 配置（泛型 T 代表資料類型） ====================

/**
 * 基礎 Table 配置
 * 基於 gx-table 的 TableService 和組件 API
 */
export type TableBase<T extends Record<string, any> = any> = {
  /** Table 唯一識別 ID */
  id: string;

  /** 欄位配置 */
  columns: TableColumnExtended<T>[];

  /** 表格資料（Signal） */
  data: WritableSignal<T[]> | Signal<T[]>;

  /** ID 欄位鍵值（用於選擇功能，預設為 'id'） */
  idKey?: string;

  /** 是否為空狀態 */
  isEmpty?: boolean;

  /** 最大高度（如 '500px', '70vh'） */
  maxHeight?: string;

  /** 空狀態配置 */
  emptyState?: TableEmptyState;
};

// ==================== 可選擇的 Table（checkbox） ====================

/**
 * 可選擇的 Table（基於 TableService 的選擇功能）
 */
export type TableWithSelection<T extends Record<string, any> = any> = TableBase<T> & {
  /** 啟用選擇功能 */
  selectable: true;

  /** 已選擇的 ID 列表 */
  selectedIds?: string[];

  /** 判斷行是否禁用（禁用的行無法選擇） */
  disabledPredicate?: (row: T) => boolean;

  /** 選擇變更事件 */
  onSelectionChange?: (event: {
    selectedIds: string[];
    selectedRows: T[];
    hasSelection: boolean;
    selectedCount: number;
    isAllSelected: boolean;
    isIndeterminate: boolean;
  }) => void;

  /** 行選擇事件（單行） */
  onRowSelect?: (event: RowSelectEvent) => void;

  /** 全選切換事件 */
  onToggleSelectAll?: () => void;
};

// ==================== 可排序的 Table ====================

/**
 * 可排序的 Table（基於 TableService 的排序功能）
 */
export type TableWithSort<T extends Record<string, any> = any> = TableBase<T> & {
  /** 啟用排序功能 */
  sortable: true;

  /** 可排序的欄位（如果為空則使用 columns 中 sortable: true 的欄位） */
  sortableColumns?: string[];

  /** 初始排序配置 */
  initialSort?: SortConfig;

  /** 排序變更事件 */
  onSortChange?: (event: SortEvent) => void;

  /** API 排序回調（如果提供，則不進行客戶端排序） */
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
};

// ==================== 帶行動作的 Table ====================

/**
 * 帶行動作按鈕的 Table
 */
export type TableWithActions<T extends Record<string, any> = any> = TableBase<T> & {
  /** 行動作按鈕配置 */
  rowActions: TableAction<T>[];

  /** 動作欄位配置（自動添加到 columns） */
  actionsColumn?: {
    label?: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    fixed?: 'left' | 'right';
  };
};

// ==================== 帶工具列的 Table ====================

/**
 * 帶工具列的 Table
 */
export type TableWithToolbar<T extends Record<string, any> = any> = TableBase<T> & {
  /** 工具列配置 */
  toolbar: TableToolbar;
};

// ==================== 帶分頁的 Table ====================

/**
 * 帶分頁的 Table
 */
export type TableWithPagination<T extends Record<string, any> = any> = TableBase<T> & {
  /** 分頁配置 */
  pagination: TablePagination;
};

// ==================== 完整功能 Table ====================

/**
 * 完整功能的 Table（可選擇 + 可排序 + 行動作 + 工具列 + 分頁）
 */
export type TableWithFullFeatures<T extends Record<string, any> = any> = TableBase<T> & {
  /** 啟用選擇功能 */
  selectable?: true;
  selectedIds?: string[];
  disabledPredicate?: (row: T) => boolean;
  onSelectionChange?: (event: {
    selectedIds: string[];
    selectedRows: T[];
    hasSelection: boolean;
    selectedCount: number;
    isAllSelected: boolean;
    isIndeterminate: boolean;
  }) => void;

  /** 啟用排序功能 */
  sortable?: true;
  sortableColumns?: string[];
  initialSort?: SortConfig;
  onSortChange?: (event: SortEvent) => void;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;

  /** 行動作 */
  rowActions?: TableAction<T>[];
  actionsColumn?: {
    label?: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
  };

  /** 工具列 */
  toolbar?: TableToolbar;

  /** 分頁 */
  pagination?: TablePagination;
};

// ==================== 聯合類型 ====================

/**
 * Table 聯合類型
 */
export type Table<T extends Record<string, any> = any> =
  | TableBase<T>
  | TableWithSelection<T>
  | TableWithSort<T>
  | TableWithActions<T>
  | TableWithToolbar<T>
  | TableWithPagination<T>
  | TableWithFullFeatures<T>;

// ==================== 類型守衛 ====================

export function isTableWithSelection<T extends Record<string, any>>(
  table: Table<T>
): table is TableWithSelection<T> {
  return 'selectable' in table && table.selectable === true;
}

export function isTableWithSort<T extends Record<string, any>>(
  table: Table<T>
): table is TableWithSort<T> {
  return 'sortable' in table && table.sortable === true;
}

export function isTableWithActions<T extends Record<string, any>>(
  table: Table<T>
): table is TableWithActions<T> {
  return 'rowActions' in table && Array.isArray(table.rowActions);
}

export function isTableWithToolbar<T extends Record<string, any>>(
  table: Table<T>
): table is TableWithToolbar<T> {
  return 'toolbar' in table;
}

export function isTableWithPagination<T extends Record<string, any>>(
  table: Table<T>
): table is TableWithPagination<T> {
  return 'pagination' in table;
}

// ==================== 使用範例 ====================

/**
 * 範例 1: 基礎用戶列表
 */
import { signal } from '@angular/core';

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
    { key: 'name', label: '姓名', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: '角色' },
    { key: 'status', label: '狀態' },
  ],
  data: signal<UserData[]>([
    { id: '1', name: 'John', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: '2', name: 'Jane', email: 'jane@example.com', role: 'User', status: 'active' },
  ]),
  idKey: 'id',
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

const productTable: TableWithSelection<ProductData> & TableWithSort<ProductData> = {
  id: 'product-table',
  columns: [
    { key: 'name', label: '產品名稱', sortable: true },
    { key: 'price', label: '價格', sortable: true, align: 'right' },
    { key: 'stock', label: '庫存', sortable: true, align: 'right' },
    { key: 'category', label: '分類' },
  ],
  data: signal<ProductData[]>([
    { id: 'p1', name: 'iPhone 15', price: 30000, stock: 50, category: '手機' },
    { id: 'p2', name: 'MacBook Pro', price: 60000, stock: 20, category: '筆電' },
  ]),
  idKey: 'id',

  // 選擇功能
  selectable: true,
  selectedIds: [],
  disabledPredicate: (row) => row.stock === 0, // 無庫存的產品無法選擇
  onSelectionChange: (event) => {
    console.log('Selected products:', event.selectedRows);
    console.log('Selected count:', event.selectedCount);
  },

  // 排序功能
  sortable: true,
  initialSort: { key: 'name', direction: 'asc' },
  onSortChange: (event) => {
    console.log('Sort by:', event.key, event.direction);
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

const orderTable: TableWithActions<OrderData> = {
  id: 'order-table',
  columns: [
    { key: 'orderNumber', label: '訂單編號', sortable: true },
    { key: 'customer', label: '客戶' },
    { key: 'total', label: '金額', align: 'right', formatter: (value) => `$${value.toLocaleString()}` },
    { key: 'status', label: '狀態' },
  ],
  data: signal<OrderData[]>([
    { id: 'o1', orderNumber: 'ORD-001', customer: 'John Doe', total: 1500, status: 'pending' },
    { id: 'o2', orderNumber: 'ORD-002', customer: 'Jane Smith', total: 2500, status: 'completed' },
  ]),
  idKey: 'id',

  // 行動作按鈕
  rowActions: [
    {
      label: '查看',
      icon: 'eye',
      intent: 'info',
      variant: 'ghost',
      onClick: (row) => console.log('View order:', row.orderNumber),
    },
    {
      label: '編輯',
      icon: 'edit',
      intent: 'info',
      variant: 'outline',
      onClick: (row) => console.log('Edit order:', row.id),
      visible: (row) => row.status === 'pending', // 只有待處理訂單可編輯
    },
    {
      label: '取消',
      icon: 'x',
      intent: 'error',
      variant: 'soft',
      onClick: (row) => console.log('Cancel order:', row.id),
      disabled: (row) => row.status === 'cancelled' || row.status === 'completed',
    },
  ],

  actionsColumn: {
    label: '操作',
    width: '200px',
    align: 'center',
  },
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

const employeeDataSignal = signal<EmployeeData[]>([
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
]);

const fullFeaturedEmployeeTable: TableWithFullFeatures<EmployeeData> = {
  id: 'employee-table',
  columns: [
    { key: 'name', label: '姓名', sortable: true, width: '150px' },
    { key: 'email', label: 'Email', sortable: true, width: '200px' },
    { key: 'department', label: '部門', sortable: true, width: '120px' },
    {
      key: 'salary',
      label: '薪資',
      sortable: true,
      align: 'right',
      width: '120px',
      formatter: (value) => `$${value.toLocaleString()}`
    },
    { key: 'joinDate', label: '到職日', sortable: true, width: '120px' },
    { key: 'status', label: '狀態', width: '100px' },
  ],
  data: employeeDataSignal,
  idKey: 'id',
  maxHeight: '600px',

  // 選擇功能
  selectable: true,
  selectedIds: [],
  disabledPredicate: (row) => row.status === 'inactive', // 已離職員工無法選擇
  onSelectionChange: (event) => {
    console.log('Selected employees:', event.selectedRows);
    console.log('Is all selected:', event.isAllSelected);
    console.log('Is indeterminate:', event.isIndeterminate);
  },

  // 排序功能
  sortable: true,
  initialSort: { key: 'name', direction: 'asc' },
  onSortChange: (event) => {
    console.log('Sort changed:', event);
  },

  // 行動作
  rowActions: [
    {
      label: '查看',
      icon: 'eye',
      intent: 'info',
      variant: 'ghost',
      onClick: (row) => console.log('View employee:', row.id),
    },
    {
      label: '編輯',
      icon: 'edit',
      intent: 'info',
      variant: 'outline',
      onClick: (row) => console.log('Edit employee:', row.id),
    },
    {
      label: '停用',
      icon: 'user-x',
      intent: 'warning',
      variant: 'soft',
      onClick: (row) => console.log('Deactivate employee:', row.id),
      visible: (row) => row.status === 'active',
    },
    {
      label: '刪除',
      icon: 'trash',
      intent: 'error',
      variant: 'soft',
      onClick: (row) => console.log('Delete employee:', row.id),
      disabled: (row) => row.status === 'active',
    },
  ],

  actionsColumn: {
    label: '操作',
    width: '240px',
    align: 'center',
  },

  // 工具列
  toolbar: {
    title: '員工管理',
    actions: [
      {
        label: '新增員工',
        icon: 'user-plus',
        intent: 'success',
        variant: 'filled',
        onClick: () => console.log('Add new employee'),
      },
      {
        label: '匯出',
        icon: 'download',
        intent: 'info',
        variant: 'outline',
        onClick: () => console.log('Export employees'),
      },
    ],
    searchConfig: {
      placeholder: '搜尋員工...',
      onSearch: (keyword) => console.log('Search:', keyword),
    },
  },

  // 分頁
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 100,
    pageSizeOptions: [10, 20, 50, 100],
    onPageChange: (page) => console.log('Page changed to:', page),
    onPageSizeChange: (size) => console.log('Page size changed to:', size),
  },

  // 空狀態
  emptyState: {
    title: '暫無員工資料',
    description: '點擊「新增員工」按鈕來新增第一位員工',
    icon: 'users',
  },
};

/**
 * 範例 5: 帶按鈕欄位的表格（欄位中直接渲染按鈕）
 */
export type TaskData = {
  id: string;
  title: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'inProgress' | 'done';
  dueDate: string;
};

const taskTable: TableBase<TaskData> = {
  id: 'task-table',
  columns: [
    { key: 'title', label: '任務名稱', sortable: true, width: '200px' },
    { key: 'assignee', label: '負責人', width: '120px' },
    { key: 'priority', label: '優先級', width: '100px' },
    { key: 'status', label: '狀態', width: '100px' },
    { key: 'dueDate', label: '截止日期', sortable: true, width: '120px' },
    {
      key: 'quickActions',
      label: '快速操作',
      renderType: 'buttons',
      width: '200px',
      align: 'center',
      buttonConfig: (row) => {
        const buttons: ButtonType[] = [];

        if (row.status === 'todo') {
          buttons.push({
            label: '開始',
            icon: 'play',
            intent: 'success',
            variant: 'soft',
            onClick: () => console.log('Start task:', row.id),
          });
        }

        if (row.status === 'inProgress') {
          buttons.push({
            label: '完成',
            icon: 'check',
            intent: 'success',
            variant: 'filled',
            onClick: () => console.log('Complete task:', row.id),
          });
        }

        buttons.push({
          label: '編輯',
          icon: 'edit',
          intent: 'info',
          variant: 'ghost',
          onClick: () => console.log('Edit task:', row.id),
        });

        return buttons;
      },
    },
  ],
  data: signal<TaskData[]>([
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
  ]),
  idKey: 'id',
};

// ==================== 工具函數（基於 TableService API） ====================

/**
 * 創建 TableService 配置選項
 */
export function createTableServiceOptions<T extends Record<string, any>>(
  table: Table<T>
): {
  data: WritableSignal<T[]> | Signal<T[]>;
  columns: TableColumn[];
  sortableColumns?: string[];
  idKey?: string;
  disabledPredicate?: (row: T) => boolean;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
} {
  const options: any = {
    data: table.data,
    columns: table.columns,
    idKey: table.idKey || 'id',
  };

  if (isTableWithSort(table)) {
    options.sortableColumns = table.sortableColumns;
    options.onSort = table.onSort;
  }

  if (isTableWithSelection(table)) {
    options.disabledPredicate = table.disabledPredicate;
  }

  return options;
}

/**
 * 從 Table 配置提取初始狀態
 */
export function extractInitialTableState<T extends Record<string, any>>(
  table: Table<T>
): TableState {
  const state: TableState = {
    sortConfig: { key: null, direction: 'asc' },
    selectedIds: [],
  };

  if (isTableWithSort(table) && table.initialSort) {
    state.sortConfig = table.initialSort;
  }

  if (isTableWithSelection(table) && table.selectedIds) {
    state.selectedIds = table.selectedIds;
  }

  return state;
}

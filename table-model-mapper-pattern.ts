// ==================== Model 層（純資料模型，不考慮 UI） ====================

/**
 * 基礎 Table 資料模型
 * 純粹的資料結構，不依賴任何 UI 框架
 */
export type TableModel<T extends Record<string, any> = any> = {
  /** 唯一識別 */
  id: string;

  /** 資料列表 */
  data: T[];

  /** 欄位定義（僅資料層面） */
  columns: ColumnModel[];

  /** 功能配置 */
  features?: {
    /** 可選擇 */
    selectable?: boolean;
    /** 可排序 */
    sortable?: boolean;
    /** 可分頁 */
    pageable?: boolean;
  };

  /** 當前狀態 */
  state?: {
    /** 已選擇的 ID */
    selectedIds?: string[];
    /** 排序配置 */
    sort?: {
      field: string;
      order: 'asc' | 'desc';
    };
    /** 分頁狀態 */
    pagination?: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
};

/**
 * 欄位模型（純資料結構）
 */
export type ColumnModel = {
  /** 欄位鍵值 */
  field: string;
  /** 欄位標題 */
  header: string;
  /** 資料類型 */
  dataType?: 'text' | 'number' | 'date' | 'boolean' | 'enum';
  /** 是否可排序 */
  sortable?: boolean;
  /** 寬度（邏輯值，如 100, 200） */
  width?: number;
  /** 對齊方式 */
  align?: 'left' | 'center' | 'right';
  /** 格式化函數 */
  formatter?: (value: any, row: any) => string;
};

/**
 * 行動作模型（業務邏輯，不依賴 UI）
 */
export type ActionModel<T = any> = {
  /** 動作 ID */
  id: string;
  /** 動作名稱 */
  name: string;
  /** 動作類型 */
  type: 'primary' | 'secondary' | 'danger' | 'warning';
  /** 執行函數 */
  execute: (row: T) => void | Promise<void>;
  /** 是否可用（業務規則） */
  canExecute?: (row: T) => boolean;
  /** 是否可見（業務規則） */
  isVisible?: (row: T) => boolean;
};

/**
 * 完整的 Table 模型（包含所有功能）
 */
export type FullTableModel<T extends Record<string, any> = any> = TableModel<T> & {
  /** 行動作 */
  actions?: ActionModel<T>[];

  /** 工具列動作 */
  toolbarActions?: ActionModel<T[]>[];

  /** 元數據 */
  metadata?: {
    title?: string;
    description?: string;
    totalRecords?: number;
    lastUpdated?: Date;
  };

  /** 業務規則 */
  rules?: {
    /** 判斷行是否可選擇 */
    canSelect?: (row: T) => boolean;
    /** 判斷行是否可編輯 */
    canEdit?: (row: T) => boolean;
    /** 判斷行是否可刪除 */
    canDelete?: (row: T) => boolean;
  };
};

// ==================== Mapper 層（Model → UI） ====================

import { signal, Signal, WritableSignal } from '@angular/core';
import { TableColumn, SortConfig } from '@sanring/gx-table';
import { ButtonType } from '@shared/lib/button/button.model';
import {
  TableBase,
  TableWithFullFeatures,
  TableAction,
  TableColumnExtended,
  TablePagination,
  TableToolbar
} from './table-types-corrected';

/**
 * Table Model → UI Config Mapper
 * 將純資料模型轉換為 UI 組件需要的格式
 */
export class TableModelMapper {
  /**
   * 將 ColumnModel 轉換為 gx-table 的 TableColumn
   */
  static mapColumn<T = any>(column: ColumnModel): TableColumnExtended<T> {
    return {
      key: column.field,
      label: column.header,
      sortable: column.sortable,
      width: column.width ? `${column.width}px` : undefined,
      align: column.align,
      formatter: column.formatter,
    };
  }

  /**
   * 將 ActionModel 轉換為 gx-table 的 TableAction
   */
  static mapAction<T = any>(action: ActionModel<T>): TableAction<T> {
    const intentMap: Record<ActionModel['type'], TableAction['intent']> = {
      primary: 'info',
      secondary: 'info',
      danger: 'error',
      warning: 'warning',
    };

    return {
      label: action.name,
      intent: intentMap[action.type],
      onClick: action.execute,
      disabled: action.canExecute ? (row) => !action.canExecute!(row) : false,
      visible: action.isVisible,
    };
  }

  /**
   * 將 ActionModel 轉換為 ButtonType
   */
  static mapActionToButton<T = any>(
    action: ActionModel<T>,
    context?: T | T[]
  ): ButtonType {
    const intentMap: Record<ActionModel['type'], ButtonType['intent']> = {
      primary: 'info',
      secondary: 'info',
      danger: 'error',
      warning: 'warning',
    };

    return {
      label: action.name,
      intent: intentMap[action.type],
      onClick: () => {
        if (context) {
          action.execute(context as any);
        }
      },
    };
  }

  /**
   * 將 TableModel 轉換為基礎 TableBase
   */
  static toTableBase<T extends Record<string, any>>(
    model: TableModel<T>
  ): TableBase<T> {
    return {
      id: model.id,
      columns: model.columns.map(col => this.mapColumn<T>(col)),
      data: signal(model.data),
      idKey: 'id',
    };
  }

  /**
   * 將 FullTableModel 轉換為 TableWithFullFeatures
   */
  static toTableWithFullFeatures<T extends Record<string, any>>(
    model: FullTableModel<T>
  ): TableWithFullFeatures<T> {
    const config: TableWithFullFeatures<T> = {
      id: model.id,
      columns: model.columns.map(col => this.mapColumn<T>(col)),
      data: signal(model.data),
      idKey: 'id',
    };

    // 選擇功能
    if (model.features?.selectable) {
      config.selectable = true;
      config.selectedIds = model.state?.selectedIds || [];
      config.disabledPredicate = model.rules?.canSelect
        ? (row) => !model.rules!.canSelect!(row)
        : undefined;
    }

    // 排序功能
    if (model.features?.sortable) {
      config.sortable = true;
      if (model.state?.sort) {
        config.initialSort = {
          key: model.state.sort.field,
          direction: model.state.sort.order,
        };
      }
    }

    // 行動作
    if (model.actions && model.actions.length > 0) {
      config.rowActions = model.actions.map(action => this.mapAction<T>(action));
    }

    // 工具列
    if (model.toolbarActions && model.toolbarActions.length > 0) {
      config.toolbar = {
        title: model.metadata?.title,
        actions: model.toolbarActions.map(action =>
          this.mapActionToButton(action)
        ),
      };
    }

    // 分頁
    if (model.features?.pageable && model.state?.pagination) {
      config.pagination = {
        currentPage: model.state.pagination.page,
        pageSize: model.state.pagination.pageSize,
        totalItems: model.state.pagination.total,
      };
    }

    return config;
  }

  /**
   * 反向轉換：UI State → Model State
   */
  static syncStateToModel<T extends Record<string, any>>(
    model: FullTableModel<T>,
    uiState: {
      selectedIds?: string[];
      sortConfig?: SortConfig;
      currentPage?: number;
      pageSize?: number;
    }
  ): FullTableModel<T> {
    return {
      ...model,
      state: {
        ...model.state,
        selectedIds: uiState.selectedIds,
        sort: uiState.sortConfig?.key ? {
          field: uiState.sortConfig.key,
          order: uiState.sortConfig.direction,
        } : undefined,
        pagination: uiState.currentPage && uiState.pageSize ? {
          page: uiState.currentPage,
          pageSize: uiState.pageSize,
          total: model.state?.pagination?.total || 0,
        } : undefined,
      },
    };
  }
}

// ==================== 使用範例 ====================

/**
 * 範例 1: 定義純資料模型（不考慮 UI）
 */

// 1. 定義資料類型
export type EmployeeData = {
  id: string;
  name: string;
  email: string;
  department: string;
  salary: number;
  joinDate: string;
  status: 'active' | 'inactive' | 'onLeave';
};

// 2. 定義業務模型
const employeeModel: FullTableModel<EmployeeData> = {
  id: 'employee-table',

  // 純資料
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
      status: 'inactive',
    },
  ],

  // 欄位定義（純資料結構）
  columns: [
    { field: 'name', header: '姓名', sortable: true, width: 150 },
    { field: 'email', header: 'Email', sortable: true, width: 200 },
    { field: 'department', header: '部門', sortable: true, width: 120 },
    {
      field: 'salary',
      header: '薪資',
      sortable: true,
      width: 120,
      align: 'right',
      dataType: 'number',
      formatter: (value) => `$${value.toLocaleString()}`
    },
    { field: 'joinDate', header: '到職日', sortable: true, width: 120, dataType: 'date' },
    { field: 'status', header: '狀態', width: 100 },
  ],

  // 功能開關
  features: {
    selectable: true,
    sortable: true,
    pageable: true,
  },

  // 業務規則
  rules: {
    canSelect: (row) => row.status !== 'inactive',  // 已離職員工無法選擇
    canEdit: (row) => row.status === 'active',       // 只有在職員工可編輯
    canDelete: (row) => row.status === 'inactive',   // 只有離職員工可刪除
  },

  // 行動作（業務邏輯）
  actions: [
    {
      id: 'view',
      name: '查看',
      type: 'secondary',
      execute: (row) => console.log('View employee:', row.id),
    },
    {
      id: 'edit',
      name: '編輯',
      type: 'primary',
      execute: (row) => console.log('Edit employee:', row.id),
      canExecute: (row) => row.status === 'active',
    },
    {
      id: 'deactivate',
      name: '停用',
      type: 'warning',
      execute: async (row) => {
        console.log('Deactivate employee:', row.id);
        // 業務邏輯：調用 API
        // await employeeService.deactivate(row.id);
      },
      isVisible: (row) => row.status === 'active',
    },
    {
      id: 'delete',
      name: '刪除',
      type: 'danger',
      execute: async (row) => {
        console.log('Delete employee:', row.id);
        // 業務邏輯：調用 API
        // await employeeService.delete(row.id);
      },
      canExecute: (row) => row.status === 'inactive',
    },
  ],

  // 工具列動作
  toolbarActions: [
    {
      id: 'add',
      name: '新增員工',
      type: 'primary',
      execute: (selectedRows) => {
        console.log('Add new employee');
      },
    },
    {
      id: 'export',
      name: '匯出',
      type: 'secondary',
      execute: (selectedRows) => {
        console.log('Export employees:', selectedRows);
      },
    },
  ],

  // 元數據
  metadata: {
    title: '員工管理',
    description: '管理公司員工資料',
    totalRecords: 100,
  },

  // 初始狀態
  state: {
    selectedIds: [],
    sort: { field: 'name', order: 'asc' },
    pagination: { page: 1, pageSize: 10, total: 100 },
  },
};

// 3. 使用 Mapper 轉換為 UI 配置
const employeeTableUI = TableModelMapper.toTableWithFullFeatures(employeeModel);

// ========================================
// 在 Component 中使用
// ========================================

import { Component, signal } from '@angular/core';
import { TableService } from '@sanring/gx-table';

@Component({
  selector: 'app-employee-list',
  template: `
    <gx-table-shell [isEmpty]="tableUI.data().length === 0">
      <!-- Toolbar -->
      <div toolbar>
        <h2>{{ tableUI.toolbar?.title }}</h2>
        @for (action of tableUI.toolbar?.actions; track action.label) {
          <button
            [class]="action.intent"
            (click)="action.onClick?.()">
            {{ action.label }}
          </button>
        }
      </div>

      <!-- Table Header -->
      <gx-table-header
        [columns]="tableUI.columns"
        [sortConfig]="tableService.state().sortConfig"
        [selectable]="tableUI.selectable"
        [isAllSelected]="tableService.isAllSelected()"
        [isIndeterminate]="tableService.isIndeterminate()"
        (sort)="tableService.handleSort($event)"
        (toggleSelectAll)="tableService.toggleSelectAll()">
      </gx-table-header>

      <!-- Table Body -->
      <gx-table-body
        [data]="tableService.sortedData()"
        [columns]="tableUI.columns"
        [selectable]="tableUI.selectable"
        [selectedIds]="tableService.state().selectedIds"
        [isRowDisabled]="tableService.isRowDisabled.bind(tableService)"
        (selectRow)="tableService.toggleSelectRow($event)">
      </gx-table-body>
    </gx-table-shell>

    <!-- Pagination -->
    @if (tableUI.pagination) {
      <gx-pagination
        [currentPageInput]="tableUI.pagination.currentPage"
        [pageSizeInput]="tableUI.pagination.pageSize"
        [totalItemsInput]="tableUI.pagination.totalItems">
      </gx-pagination>
    }
  `,
  providers: [TableService],
})
export class EmployeeListComponent {
  // 業務模型（純資料）
  private model = employeeModel;

  // UI 配置（通過 Mapper 轉換）
  tableUI = TableModelMapper.toTableWithFullFeatures(this.model);

  constructor(public tableService: TableService<EmployeeData>) {
    // 初始化 TableService
    tableService.initialize({
      data: this.tableUI.data,
      columns: this.tableUI.columns,
      idKey: 'id',
      disabledPredicate: this.tableUI.disabledPredicate,
    });
  }

  // 同步 UI 狀態回 Model（可選）
  syncStateToModel() {
    const uiState = this.tableService.state();
    this.model = TableModelMapper.syncStateToModel(this.model, {
      selectedIds: uiState.selectedIds,
      sortConfig: uiState.sortConfig,
    });
  }
}

// ==================== 範例 2: API 資料轉換 ====================

/**
 * 從 API 響應轉換為 TableModel
 */
export class EmployeeTableFactory {
  static fromApiResponse(apiData: any): FullTableModel<EmployeeData> {
    return {
      id: 'employee-table',
      data: apiData.employees,  // 直接使用 API 資料
      columns: [
        { field: 'name', header: '姓名', sortable: true },
        { field: 'email', header: 'Email', sortable: true },
        // ...
      ],
      features: {
        selectable: true,
        sortable: true,
        pageable: true,
      },
      state: {
        pagination: {
          page: apiData.page,
          pageSize: apiData.pageSize,
          total: apiData.total,
        },
      },
      actions: this.getEmployeeActions(),
      rules: this.getEmployeeRules(),
    };
  }

  private static getEmployeeActions(): ActionModel<EmployeeData>[] {
    return [
      {
        id: 'edit',
        name: '編輯',
        type: 'primary',
        execute: async (row) => {
          // 調用 Service
          // await employeeService.update(row);
        },
        canExecute: (row) => row.status === 'active',
      },
      // ...
    ];
  }

  private static getEmployeeRules() {
    return {
      canSelect: (row: EmployeeData) => row.status !== 'inactive',
      canEdit: (row: EmployeeData) => row.status === 'active',
      canDelete: (row: EmployeeData) => row.status === 'inactive',
    };
  }
}

// 使用範例
/*
const apiResponse = await fetch('/api/employees');
const employeeModel = EmployeeTableFactory.fromApiResponse(apiResponse);
const employeeTableUI = TableModelMapper.toTableWithFullFeatures(employeeModel);
*/

// ==================== 範例 3: 多種 UI 框架支援 ====================

/**
 * 同一個 Model 可以轉換為不同的 UI 框架
 */
export class TableModelToAntDesignMapper {
  static toAntDesignTable<T extends Record<string, any>>(
    model: TableModel<T>
  ): any {
    return {
      dataSource: model.data,
      columns: model.columns.map(col => ({
        title: col.header,
        dataIndex: col.field,
        sorter: col.sortable,
        width: col.width,
        align: col.align,
      })),
      rowSelection: model.features?.selectable ? {
        type: 'checkbox',
      } : undefined,
    };
  }
}

export class TableModelToPrimeNGMapper {
  static toPrimeNGTable<T extends Record<string, any>>(
    model: TableModel<T>
  ): any {
    return {
      value: model.data,
      columns: model.columns.map(col => ({
        field: col.field,
        header: col.header,
        sortable: col.sortable,
      })),
    };
  }
}

// ==================== 總結 ====================

/**
 * 架構分層：
 *
 * ┌─────────────────────────────────────┐
 * │  Model 層（純資料，不依賴 UI）        │
 * │  - TableModel                        │
 * │  - ColumnModel                       │
 * │  - ActionModel                       │
 * └─────────────────┬───────────────────┘
 *                   │
 *            Mapper 層（轉換）
 *                   │
 * ┌─────────────────▼───────────────────┐
 * │  UI Config 層（UI 框架專用）         │
 * │  - TableBase                         │
 * │  - TableWithFullFeatures             │
 * └─────────────────┬───────────────────┘
 *                   │
 * ┌─────────────────▼───────────────────┐
 * │  UI 組件層（渲染）                   │
 * │  - GxTableShell                      │
 * │  - GxTableHeader                     │
 * │  - GxTableBody                       │
 * └─────────────────────────────────────┘
 *
 * 優點：
 * ✅ Model 層完全獨立，不依賴任何 UI 框架
 * ✅ 可以輕鬆切換 UI 框架（gx-table → Ant Design → PrimeNG）
 * ✅ 業務邏輯集中在 Model 層
 * ✅ Mapper 處理資料轉換，保持 Model 乾淨
 * ✅ 易於測試（Model 層無 UI 依賴）
 */

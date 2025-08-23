export type GxToastCategory = 'info' | 'success' | 'warning' | 'error';

export interface GxToast {
    id: number;
    icon?: string;
    kind: GxToastCategory;
    message: string;
    title?: string;
    duration?: number;
    dismissible?: boolean;
    action?: { label: string; handler: () => void };
    // ★ 新增（可選）：需要顯示倒數嗎？
    countdown?: boolean;
    // ★ 由 service 內部維護，用於 UI 呈現
    remainingSec?: number;
}
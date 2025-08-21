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
}
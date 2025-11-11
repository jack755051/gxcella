import { GxAction } from '../../shared/model/action.model';
import { GxButtonIntent, GxButtonVariant, GxButtonStyle } from '../../button/model/button.types';

export type GxModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type GxModalPosition = 'left' | 'center' | 'right';

/**
 * Modal 按鈕配置
 * 直接對應到 gx-button 的所有屬性
 */
export interface GxModalButton {
    /** 按鈕行為（label + handler + disabled） */
    action: GxAction;
    /** 按鈕外觀（語意） */
    intent?: GxButtonIntent;
    /** 按鈕樣式變體 */
    variant?: GxButtonVariant;
    /** 自訂樣式 tokens */
    styleTokens?: GxButtonStyle;
    /** Tooltip 提示文字 */
    tooltip?: string;
    /** 是否需要 aria-label */
    needsAriaLabel?: boolean;
}

export interface GxModalConfig {
    /** Modal visibility */
    visible: boolean;
    /** Modal title */
    title: string;
    /** Modal size preset or custom width */
    size?: GxModalSize;
    /** Custom width (overrides size) */
    width?: string;
    /** Custom height */
    height?: string;
    /** Show close button */
    showClose?: boolean;
    /** Close on backdrop click */
    closeOnBackdrop?: boolean;
    /** Close on ESC key */
    closeOnEsc?: boolean;
    /** Title position */
    titlePosition?: GxModalPosition;
    /** Footer button position */
    buttonPosition?: GxModalPosition;
    /** Custom CSS class */
    customClass?: string;
}

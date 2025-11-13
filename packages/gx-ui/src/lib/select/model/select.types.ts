import { GxIntent, GxStyleTokens } from '../../shared/model/design-tokens';

/**
 * Select Intent
 * 支援 4 種語義色彩
 */
export type GxSelectIntent = GxIntent;

/**
 * Select Variant
 * - 'filled': 填充背景
 * - 'outline': 邊框樣式（預設）
 * - 'soft': 柔和背景
 * - 'ghost': 透明背景
 * - 'glass': 玻璃態效果
 */
export type GxSelectVariant = 'filled' | 'outline' | 'soft' | 'ghost' | 'glass';

/**
 * Select Size
 * 預定義的尺寸
 */
export type GxSelectSize = 'sm' | 'md' | 'lg';

/**
 * Select Option
 * 選項數據結構
 */
export interface GxSelectOption<T = any> {
    /** 顯示文字 */
    label: string;
    /** 選項值 */
    value: T;
    /** 是否禁用此選項 */
    disabled?: boolean;
}

/**
 * Select Null Option (Placeholder)
 * 空選項配置
 */
export interface GxSelectNullOption {
    /** 顯示文字（預設：「請選擇」） */
    label?: string;
    /** 是否禁用空選項 */
    disabled?: boolean;
    /** 是否隱藏空選項 */
    hidden?: boolean;
}

/**
 * Select Style Tokens
 * 繼承共享的樣式 Token
 */
export interface GxSelectStyle extends GxStyleTokens {
    /** 最小寬度 */
    minWidth?: number;
}

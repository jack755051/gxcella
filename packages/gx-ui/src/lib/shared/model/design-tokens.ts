/**
 * 共享的設計 Token 系統
 *
 * 這些 token 被所有 UI 組件共享，確保設計系統的一致性
 */

/**
 * Intent 色彩語意
 * 用於表達不同的語意狀態（信息、成功、警告、錯誤）
 */
export type GxIntent = 'info' | 'success' | 'warning' | 'error';

/**
 * 尺寸預設值
 */
export type GxSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * 樣式 Token
 * 用於自訂組件的視覺樣式
 */
export interface GxStyleTokens {
    /** 水平 padding (px) */
    px?: number;
    /** 垂直 padding (px) */
    py?: number;
    /** 圓角 (px) */
    radius?: number;
    /** 背景色 */
    background?: string;
    /** 前景色（文字色） */
    foreground?: string;
}

/**
 * 尺寸映射函數
 * 將預設尺寸轉換為具體的數值
 */
export function mapSizeToPixels(size: GxSize | number, defaultValue: number = 16): number {
    if (typeof size === 'number') return size;

    const sizeMap: Record<GxSize, number> = {
        sm: 12,
        md: 16,
        lg: 20,
        xl: 24
    };

    return sizeMap[size] ?? defaultValue;
}

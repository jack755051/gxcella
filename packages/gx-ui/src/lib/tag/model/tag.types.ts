import { GxIntent } from '../../shared/model/design-tokens';

/**
 * Tag 組件配置
 */
export interface GxTagConfig {
    /** 語意顏色 */
    intent: GxIntent;
    /** 是否可移除 */
    removable: boolean;
    /** 是否禁用 */
    disabled: boolean;
    /** 是否可點擊 */
    clickable?: boolean;
}

/**
 * Tag 尺寸
 */
export type GxTagSize = 'sm' | 'md' | 'lg';

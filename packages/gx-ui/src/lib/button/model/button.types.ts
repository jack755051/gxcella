import { GxIntent, GxStyleTokens } from '../../shared/model/design-tokens';

/**
 * Button Intent - 向後兼容
 * 重新導出共享的 GxIntent
 */
export type GxButtonIntent = GxIntent;

/**
 * Button Variant
 * 注意：移除了 'tag' variant，因為 Tag 現在是獨立組件
 */
export type GxButtonVariant = 'filled' | 'outline' | 'soft' | 'ghost';

/**
 * Button Style - 向後兼容
 * 重新導出共享的 GxStyleTokens
 */
export interface GxButtonStyle extends GxStyleTokens {}
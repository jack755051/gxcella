import { GxIntent, GxStyleTokens } from '../../shared/model/design-tokens';

/**
 * Button Intent - 向後兼容
 * 重新導出共享的 GxIntent
 */
export type GxButtonIntent = GxIntent;

/**
 * Button Variant
 * 注意：移除了 'tag' variant，因為 Tag 現在是獨立組件
 *
 * 新增現代化變體：
 * - 'glass': 玻璃態效果（半透明模糊背景）
 * - 'neon': 霓虹發光效果（邊框發光）
 */
export type GxButtonVariant = 'filled' | 'outline' | 'soft' | 'ghost' | 'glass' | 'neon';

/**
 * Button Style - 向後兼容
 * 重新導出共享的 GxStyleTokens
 */
export interface GxButtonStyle extends GxStyleTokens {}
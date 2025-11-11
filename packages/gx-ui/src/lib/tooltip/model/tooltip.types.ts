export type GxTooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type GxTooltipTheme = 'dark' | 'light';

export interface GxTooltipConfig {
    /** Tooltip text content */
    content: string;
    /** Position relative to the element */
    position?: GxTooltipPosition;
    /** Theme styling */
    theme?: GxTooltipTheme;
    /** Delay before showing (ms) */
    showDelay?: number;
    /** Delay before hiding (ms) */
    hideDelay?: number;
    /** Whether to show arrow */
    showArrow?: boolean;
    /** Offset from element (px) */
    offset?: number;
}

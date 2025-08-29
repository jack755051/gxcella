export type GxButtonIntent = 'info'|'success'|'warning'|'error';
export type GxButtonVariant = 'filled'|'outline'|'soft'|'ghost'|'tag';

export interface GxButtonStyle {
    px?: number;      // paddingX
    py?: number;      // paddingY
    radius?: number;  // borderRadius
}
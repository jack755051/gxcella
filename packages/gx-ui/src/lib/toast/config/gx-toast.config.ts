import { InjectionToken } from '@angular/core';

export type GxToastPosition =
    | 'top-right' | 'top-left' | 'top-center'
    | 'bottom-right' | 'bottom-left' | 'bottom-center';


export interface GxToastConfig {
    position: GxToastPosition;
    max: number;
    zIndex: number;
    containerId: string;
    containerClass?: string;
    width?: string;
    attachTo?: 'body' | string | HTMLElement;
    defaultDuration?: number;
}

export const GX_TOAST_CONFIG = new InjectionToken<GxToastConfig>('GX_TOAST_CONFIG');

export const DEFAULT_TOAST_CONFIG: GxToastConfig = {
    position: 'top-right',
    max: 5,
    zIndex: 9999,
    containerId: 'gx-toast-container-root',
    width: '320px',
    attachTo: 'body',
    defaultDuration: 3000,
};
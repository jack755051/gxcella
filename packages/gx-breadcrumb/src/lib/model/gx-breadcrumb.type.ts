import {ActivatedRouteSnapshot} from "@angular/router";

export type BreadcrumbData =
    | string
    | false
    | ((r: ActivatedRouteSnapshot) => IGxBreadCrumb | string)
    | IGxBreadCrumb;

export interface IGxBreadCrumb{
    label: string;
    link?: string;
    icon?: string;
    iconImg?: any;
    active?: boolean;
    disabled?: boolean;
}

export enum GxBreadcrumbSeparator{
    Slash = 'slash',
    Arrow = 'arrow',
    Dot = 'dot',
    Hyphen = 'hyphen',
}
//TODO:後續包裝將 'THEME' 跟 'VARIANT' 至GX-CORE 中，暫時先以type處理
export type GxTheme   = 'default' | 'dark' | 'brand';
export type GxVariant = 'modern'  | 'glass' | 'minimal' | 'colorful';

// export enum GxBreadcrumbVariant {
//     Modern = 'modern',
//     Glass = 'glass',
//     Minimal = 'minimal',
//     Colorful = 'colorful'
// }
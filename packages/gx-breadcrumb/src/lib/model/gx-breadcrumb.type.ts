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
    active?: boolean;
    disabled?: boolean;
}

export enum GxBreadcrumbVariant {
    Modern = 'modern',
    Glass = 'glass',
    Minimal = 'minimal',
    Colorful = 'colorful'
}

export enum GxBreadcrumbSeparator{
    Slash = 'slash',
    Arrow = 'arrow',
    Dot = 'dot',
    Hyphen = 'hyphen',
}
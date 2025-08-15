import { InjectionToken } from '@angular/core';
import { IGxBreadCrumb } from '../model/gx-breadcrumb.type';

/** 全域預設的根麵包屑（預設給 Home；若不想預設可改成 null 或 false） */
export const GX_BREADCRUMB_ROOT = new InjectionToken<IGxBreadCrumb | false | null>(
    'GX_BREADCRUMB_ROOT',
    { factory: () => ({ label: 'Home', link: '/home' }) }
)
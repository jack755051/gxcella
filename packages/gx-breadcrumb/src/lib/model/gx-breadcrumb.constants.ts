import {GxBreadcrumbSeparator} from "./gx-breadcrumb.type";

export const SEP_MAP: Record<GxBreadcrumbSeparator, string> = {
    [GxBreadcrumbSeparator.Slash]:  '/',
    [GxBreadcrumbSeparator.Arrow]:  '›',   // 或 '>'
    [GxBreadcrumbSeparator.Dot]:    '·',
    [GxBreadcrumbSeparator.Hyphen]: '–',
};

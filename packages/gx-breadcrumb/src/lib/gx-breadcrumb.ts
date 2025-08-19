import {Component, inject, Input, Output, EventEmitter, HostBinding} from '@angular/core';
import {CommonModule, NgClass} from "@angular/common";
import { LucideAngularModule } from 'lucide-angular';
import {GxBreadcrumbSeparator, GxTheme, GxVariant, IGxBreadCrumb} from "./model/gx-breadcrumb.type";
import {GxBreadcrumbItem} from "./gx-breadcrumb-item/gx-breadcrumb-item";
import {SEP_MAP} from "./model/gx-breadcrumb.constants";
import { GxBreadcrumbService } from './services/breadcrumb.services';

@Component({
  selector: 'gx-breadcrumb',
  standalone: true,
  imports: [CommonModule, NgClass, LucideAngularModule, GxBreadcrumbItem],
  templateUrl:'gx-breadcrumb.html',
  styleUrls: ['gx-breadcrumb.css'],
})
export class GxBreadcrumb {
  // 用 service 供應自動麵包屑
  public svc = inject(GxBreadcrumbService);
  @Input() theme: GxTheme = 'default';
  @Input() variant: GxVariant = 'modern';
  @Input() separator: GxBreadcrumbSeparator = GxBreadcrumbSeparator.Slash;
  @Input() showIcon = false;
  /** 單頁臨時：false=關閉；物件=覆寫；undefined=用 service (token/route) 結果 */
  @Input() rootCrumb: IGxBreadCrumb | false | undefined;
  /** 有提供 data → 手動模式；沒提供 → 用 svc.breadcrumbs$ */
  @Input() data: IGxBreadCrumb[] | null = null;
  @Output() itemClick = new EventEmitter<IGxBreadCrumb>();
  @HostBinding('class')
  get hostClasses() {
    return `gx-theme-${this.theme} gx-variant-${this.variant}`;
  }

  trackByIndex = (i: number) => i;
  getSeparator(): string { return SEP_MAP[this.separator] ?? '/'; }
  /** 在 template 用：先取來源，再決定是否用 Input 覆蓋 root */
  mergeCrumbs(auto: IGxBreadCrumb[] | null): IGxBreadCrumb[] {
    const src = this.data ?? auto ?? [];
    if (this.rootCrumb === undefined) return src; // 不覆蓋，採用 service 的 token/route 規則
    if (!this.rootCrumb || src.length <= 1) return src; // 關閉或只有首頁
    const already =
        src[0]?.link === this.rootCrumb.link ||
        src[0]?.label?.toLowerCase() === (this.rootCrumb.label ?? '').toLowerCase();
    return already ? src : [this.rootCrumb, ...src];
  }
}

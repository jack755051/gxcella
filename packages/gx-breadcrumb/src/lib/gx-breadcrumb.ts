import {Component, inject, Input, Output ,EventEmitter} from '@angular/core';
import {CommonModule, NgClass} from "@angular/common";
import { LucideAngularModule } from 'lucide-angular';
import {GxBreadcrumbSeparator, GxBreadcrumbVariant, IGxBreadCrumb} from "./model/gx-breadcrumb.type";
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

  @Input() variant: GxBreadcrumbVariant = GxBreadcrumbVariant.Modern;
  @Input() separator: GxBreadcrumbSeparator = GxBreadcrumbSeparator.Slash;
  @Input() showIcon = true;

  /** 有提供 data → 手動模式；沒提供 → 用 svc.breadcrumbs$ */
  @Input() data: IGxBreadCrumb[] | null = null;

  @Output() itemClick = new EventEmitter<IGxBreadCrumb>();

  trackByIndex = (i: number) => i;
  getSeparator(): string { return SEP_MAP[this.separator] ?? '/'; }
}

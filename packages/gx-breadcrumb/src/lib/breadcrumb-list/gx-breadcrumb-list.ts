import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxBreadcrumbSeparator } from '../model/gx-breadcrumb.type';
import { SEP_MAP } from '../model/gx-breadcrumb.constants';

/**
 * GxBreadcrumbList Component
 *
 * 麵包屑列表組件，負責渲染麵包屑項目
 * 類似 gx-table 的 GxTableBody，提供列表容器和分隔符邏輯
 */
@Component({
  selector: 'gx-breadcrumb-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="gx-breadcrumb-list" [attr.aria-label]="ariaLabel()">
      <ng-content></ng-content>
    </nav>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
    }

    .gx-breadcrumb-list {
      display: flex;
      align-items: center;
      gap: var(--gx-breadcrumb-gap, 16px);
      white-space: nowrap;
      flex-wrap: nowrap;
    }
  `]
})
export class GxBreadcrumbList {
  /**
   * 分隔符類型
   */
  separator = input<GxBreadcrumbSeparator>(GxBreadcrumbSeparator.Slash);

  /**
   * Aria label for accessibility
   */
  ariaLabel = input<string>('Breadcrumb navigation');

  /**
   * 獲取分隔符字元
   */
  getSeparator(): string {
    return SEP_MAP[this.separator()] ?? '/';
  }
}

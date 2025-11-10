import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxTheme, GxVariant } from '../model/gx-breadcrumb.type';

/**
 * GxBreadcrumbContainer Component
 *
 * 麵包屑容器組件，提供主題和變體樣式
 * 類似 gx-table 的 GxTableShell，作為最外層容器
 */
@Component({
  selector: 'gx-breadcrumb-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="gx-breadcrumb-container"
      [class]="'gx-theme-' + theme() + ' gx-variant-' + variant()">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      width: 100%;
      display: block;
    }

    .gx-breadcrumb-container {
      background-color: var(--gx-breadcrumb-bg, var(--gx-color-gray-50));
      width: 100%;
      min-height: 50px;
      padding: 20px 40px;
      border-radius: 12px;
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.08),
        0 4px 6px rgba(0, 0, 0, 0.06),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
    }

    /* Glass: 半透明 + 毛玻璃 */
    .gx-variant-glass .gx-breadcrumb-container,
    .gx-breadcrumb-container.gx-variant-glass {
      background-color: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 30px rgba(227, 228, 237, 0.37);
    }

    /* Modern variant */
    .gx-variant-modern .gx-breadcrumb-container,
    .gx-breadcrumb-container.gx-variant-modern {
      /* 可以添加 modern 特定樣式 */
    }

    /* Minimal variant */
    .gx-variant-minimal .gx-breadcrumb-container,
    .gx-breadcrumb-container.gx-variant-minimal {
      background-color: transparent;
      box-shadow: none;
      padding: 10px 0;
    }

    /* Colorful variant */
    .gx-variant-colorful .gx-breadcrumb-container,
    .gx-breadcrumb-container.gx-variant-colorful {
      background: linear-gradient(135deg, var(--gx-color-accent-50, #f0f9ff) 0%, var(--gx-color-gray-50, #f9fafb) 100%);
    }

    /* Dark theme */
    .gx-theme-dark .gx-breadcrumb-container,
    .gx-breadcrumb-container.gx-theme-dark {
      background-color: var(--gx-breadcrumb-bg-dark, var(--gx-color-gray-800, #1f2937));
      color: var(--gx-color-gray-100, #f3f4f6);
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.3),
        0 4px 6px rgba(0, 0, 0, 0.2);
    }

    /* Brand theme */
    .gx-theme-brand .gx-breadcrumb-container,
    .gx-breadcrumb-container.gx-theme-brand {
      background-color: var(--gx-breadcrumb-bg-brand, var(--gx-color-accent-500, #3b82f6));
      color: white;
    }
  `]
})
export class GxBreadcrumbContainer {
  /**
   * 主題配置
   */
  theme = input<GxTheme>('default');

  /**
   * 變體樣式
   */
  variant = input<GxVariant>('modern');
}

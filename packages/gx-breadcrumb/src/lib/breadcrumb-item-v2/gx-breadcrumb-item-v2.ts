import { Component, input, output, computed, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * GxBreadcrumbItemV2 Component (獨立可用版本)
 *
 * 重構後的麵包屑項目組件，完全獨立可用
 * 支援兩種圖標方式：
 * 1. iconImg - Lucide 圖標（需要安裝 lucide-angular）
 * 2. icon - 文字/Emoji 圖標（無需額外依賴）
 *
 * 使用 input() signal 語法，完全獨立，可在任何地方使用
 */
@Component({
  selector: 'gx-breadcrumb-item-v2',
  standalone: true,
  imports: [CommonModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    @if (link() && !disabled() && !active()) {
      <!-- External link -->
      @if (isExternalLink()) {
        <a
          class="gx-breadcrumb-item gx-breadcrumb-item-available"
          [href]="link()!"
          [target]="target()"
          (click)="handleClick($event)">
          <span class="gx-breadcrumb-item-inner">
            @if (showIcon()) {
              @if (iconImg()) {
                <lucide-icon [img]="iconImg()" class="gx-breadcrumb-item-icon"></lucide-icon>
              } @else if (icon()) {
                <span class="gx-breadcrumb-item-icon">{{ icon() }}</span>
              }
            }
            <span class="gx-breadcrumb-item-label">{{ label() }}</span>
          </span>
        </a>
      } @else {
        <!-- Internal router link -->
        <a
          class="gx-breadcrumb-item gx-breadcrumb-item-available"
          [routerLink]="link()"
          (click)="handleClick($event)">
          <span class="gx-breadcrumb-item-inner">
            @if (showIcon()) {
              @if (iconImg()) {
                <lucide-icon [img]="iconImg()" class="gx-breadcrumb-item-icon"></lucide-icon>
              } @else if (icon()) {
                <span class="gx-breadcrumb-item-icon">{{ icon() }}</span>
              }
            }
            <span class="gx-breadcrumb-item-label">{{ label() }}</span>
          </span>
        </a>
      }
    } @else {
      <!-- Disabled or active (current page) -->
      <span
        class="gx-breadcrumb-item gx-breadcrumb-item-disable"
        [attr.aria-current]="active() ? 'page' : null"
        [class.gx-breadcrumb-disabled]="disabled()">
        <span class="gx-breadcrumb-item-inner">
          @if (showIcon()) {
            @if (iconImg()) {
              <lucide-icon [img]="iconImg()" class="gx-breadcrumb-item-icon"></lucide-icon>
            } @else if (icon()) {
              <span class="gx-breadcrumb-item-icon">{{ icon() }}</span>
            }
          }
          <span class="gx-breadcrumb-item-label gx-disable-label">{{ label() }}</span>
        </span>
      </span>
    }

    <!-- Separator -->
    @if (showSeparator()) {
      <span class="gx-breadcrumb-separator" aria-hidden="true">{{ separator() }}</span>
    }
  `,
  styles: [`
    :host {
      --gx-bc-fg: var(--gx-color-gray-900, #111827);
      --gx-bc-muted: var(--gx-color-gray-500, #6b7280);
      --gx-bc-hover: var(--gx-color-accent-500, #3b82f6);
      --gx-normal-weight: var(--gx-weight-medium, 500);
      --gx-active-weight: var(--gx-weight-extraBold, 800);
      --gx-bc-gap: 16px;
      --gx-bc-item-gap: 8px;
      --gx-bc-scale: 1.03;
      --gx-bc-fsz: 16px;

      display: inline-flex;
      align-items: center;
      font-size: var(--gx-bc-fsz);
      gap: var(--gx-bc-gap);
    }

    .gx-breadcrumb-item-available,
    .gx-breadcrumb-item-disable {
      display: inline-flex;
      align-items: center;
      font-weight: var(--gx-normal-weight);
    }

    .gx-breadcrumb-item-inner {
      display: inline-flex;
      align-items: center;
      gap: var(--gx-bc-item-gap);
      transform-origin: center center;
      transition: transform 0.15s ease;
    }

    .gx-breadcrumb-item-icon,
    .gx-breadcrumb-item-label {
      transition: color 0.15s ease;
    }

    .gx-breadcrumb-item-available {
      text-decoration: none;
      color: var(--gx-bc-muted);
      padding: 2px 4px;
    }

    .gx-breadcrumb-item-available:hover {
      color: var(--gx-bc-hover);
    }

    .gx-breadcrumb-item-available:hover .gx-breadcrumb-item-inner {
      transform: scale(var(--gx-bc-scale));
    }

    .gx-breadcrumb-item-available:focus-visible {
      outline: 2px solid var(--gx-bc-hover);
      outline-offset: 2px;
      border-radius: 6px;
    }

    .gx-breadcrumb-item-disable {
      cursor: default;
      color: var(--gx-bc-fg);
      font-weight: var(--gx-active-weight);
      opacity: 0.85;
    }

    .gx-breadcrumb-separator {
      display: inline-block;
      line-height: 1;
      padding: 0 6px;
      color: var(--gx-bc-muted);
      user-select: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .gx-breadcrumb-item-inner,
      .gx-breadcrumb-item-icon,
      .gx-breadcrumb-item-label {
        transition: none;
      }
    }
  `]
})
export class GxBreadcrumbItemV2 {
  /**
   * 項目標籤文字
   */
  label = input.required<string>();

  /**
   * 連結 URL（可選）
   */
  link = input<string | undefined>(undefined);

  /**
   * 文字/Emoji 圖標（可選）
   */
  icon = input<string | undefined>(undefined);

  /**
   * Lucide 圖標（可選，需要 lucide-angular）
   */
  iconImg = input<any>(undefined);

  /**
   * 是否為當前頁（active state）
   */
  active = input<boolean>(false);

  /**
   * 是否禁用
   */
  disabled = input<boolean>(false);

  /**
   * 是否顯示圖標
   */
  showIcon = input<boolean>(false);

  /**
   * 分隔符字元
   */
  separator = input<string>('/');

  /**
   * 是否顯示分隔符
   */
  showSeparator = input<boolean>(true);

  /**
   * 外部連結的 target 屬性
   */
  target = input<'_self' | '_blank'>('_self');

  /**
   * 點擊事件
   */
  itemClick = output<{ label: string; link?: string }>();

  /**
   * 判斷是否為外部連結
   */
  isExternalLink = computed(() => {
    const linkValue = this.link();
    return !!linkValue && /^(https?:)?\/\//.test(linkValue);
  });

  /**
   * 處理點擊事件
   */
  handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.itemClick.emit({
      label: this.label(),
      link: this.link()
    });
  }
}

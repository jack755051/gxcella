import { Component, input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * GxCardContentV2 Component
 *
 * 重構後的 Content 組件，完全獨立可用
 */
@Component({
  selector: 'gx-card-content-v2',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="gx-card-content">
      @if (image()) {
        <img
          [src]="image()!"
          [alt]="imageAlt() || ''"
          class="gx-card-content__image"
          [style.aspect-ratio]="imageRatio() || 'auto'"
        />
      }

      @if (icon()) {
        <div class="gx-card-content__icon">
          <lucide-icon [name]="icon()!" [size]="iconSize()"></lucide-icon>
        </div>
      }

      @if (title()) {
        <h4 class="gx-card-content__title">{{ title() }}</h4>
      }

      @if (subtitle()) {
        <p class="gx-card-content__subtitle">{{ subtitle() }}</p>
      }

      @if (description()) {
        <p class="gx-card-content__description">{{ description() }}</p>
      }

      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .gx-card-content {
      display: flex;
      flex-direction: column;
      gap: var(--gx-card-content-gap, 0.75rem);
    }

    .gx-card-content__image {
      width: 100%;
      border-radius: var(--gx-card-image-radius, 8px);
      object-fit: cover;
    }

    .gx-card-content__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--gx-card-icon-size, 48px);
      height: var(--gx-card-icon-size, 48px);
      border-radius: var(--gx-card-icon-radius, 12px);
      background: var(--gx-card-icon-bg, #f3f4f6);
      color: var(--gx-card-icon-color, #3b82f6);
    }

    .gx-card-content__title {
      margin: 0;
      font-size: var(--gx-card-content-title-size, 1.125rem);
      font-weight: var(--gx-card-content-title-weight, 600);
      color: var(--gx-card-content-title-color, #111827);
      line-height: 1.4;
    }

    .gx-card-content__subtitle {
      margin: 0;
      font-size: var(--gx-card-content-subtitle-size, 0.875rem);
      color: var(--gx-card-content-subtitle-color, #6b7280);
      line-height: 1.5;
    }

    .gx-card-content__description {
      margin: 0;
      font-size: var(--gx-card-content-description-size, 0.875rem);
      color: var(--gx-card-content-description-color, #4b5563);
      line-height: 1.6;
    }
  `]
})
export class GxCardContentV2 {
  /**
   * 圖片 URL
   */
  image = input<string | undefined>(undefined);

  /**
   * 圖片替代文字
   */
  imageAlt = input<string | undefined>(undefined);

  /**
   * 圖片比例
   */
  imageRatio = input<string>('16/9');

  /**
   * Lucide 圖標名稱
   */
  icon = input<string | undefined>(undefined);

  /**
   * 圖標大小
   */
  iconSize = input<number>(24);

  /**
   * 內容標題
   */
  title = input<string | undefined>(undefined);

  /**
   * 內容副標題
   */
  subtitle = input<string | undefined>(undefined);

  /**
   * 描述文字
   */
  description = input<string | undefined>(undefined);
}

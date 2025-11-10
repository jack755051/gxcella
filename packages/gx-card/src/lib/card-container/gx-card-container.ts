import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxCardVariant, GxCardLayout, GxCardShape, IGxCardColors } from '../model/card.type';

/**
 * GxCardContainer Component
 *
 * 卡片容器組件，提供樣式和佈局
 * 類似 gx-table 的 GxTableShell，作為最外層容器
 */
@Component({
  selector: 'gx-card-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      [class]="containerClasses()"
      [ngStyle]="cardStyles()"
      [attr.role]="'article'">
      <ng-content></ng-content>
    </article>
  `,
  styles: [`
    :host {
      display: block;
    }

    article {
      position: relative;
      transition: all 0.2s ease;
    }

    /* Variant: elevated */
    .gx-card--variant-elevated {
      background: var(--gx-card-bg, #ffffff);
      border-radius: var(--gx-card-radius, 12px);
      box-shadow: var(--gx-card-shadow-elevated,
        0 1px 3px rgba(0, 0, 0, 0.12),
        0 1px 2px rgba(0, 0, 0, 0.24)
      );
    }

    .gx-card--variant-elevated:hover {
      box-shadow: var(--gx-card-shadow-elevated-hover,
        0 3px 6px rgba(0, 0, 0, 0.16),
        0 3px 6px rgba(0, 0, 0, 0.23)
      );
    }

    /* Variant: outlined */
    .gx-card--variant-outlined {
      background: var(--gx-card-bg, #ffffff);
      border-radius: var(--gx-card-radius, 12px);
      border: 1px solid var(--gx-card-border-color, #e5e7eb);
    }

    /* Variant: flat */
    .gx-card--variant-flat {
      background: var(--gx-card-bg, #f9fafb);
      border-radius: var(--gx-card-radius, 12px);
    }

    /* Shape: classic */
    .gx-card--shape-classic {
      padding: var(--gx-card-padding, 1.5rem);
    }

    /* Shape: square */
    .gx-card--shape-square {
      aspect-ratio: 1;
      padding: var(--gx-card-padding-compact, 1rem);
    }

    /* Shape: landscape */
    .gx-card--shape-landscape {
      display: flex;
      flex-direction: row;
      gap: var(--gx-card-gap, 1rem);
      padding: var(--gx-card-padding, 1.5rem);
    }

    /* Shape: portrait */
    .gx-card--shape-portrait {
      padding: var(--gx-card-padding, 1.5rem);
    }

    /* Clickable */
    .gx-card--clickable {
      cursor: pointer;
    }

    .gx-card--clickable:hover {
      transform: translateY(-2px);
    }
  `]
})
export class GxCardContainer {
  /**
   * Variant 樣式
   */
  variant = input<GxCardVariant>('elevated');

  /**
   * Layout 佈局
   */
  layout = input<GxCardLayout>('grid');

  /**
   * Shape 形狀
   */
  shape = input<GxCardShape>('classic');

  /**
   * 是否可點擊
   */
  clickable = input<boolean>(false);

  /**
   * 自定義顏色
   */
  colors = input<IGxCardColors | undefined>(undefined);

  /**
   * 容器 CSS 類別
   */
  containerClasses = computed(() => {
    const classes = [
      'gx-card',
      `gx-card--variant-${this.variant()}`,
      `gx-card--shape-${this.shape()}`
    ];

    if (this.clickable()) {
      classes.push('gx-card--clickable');
    }

    return classes.join(' ');
  });

  /**
   * 自定義樣式
   */
  cardStyles = computed(() => {
    const colors = this.colors();
    if (!colors) return {};

    return {
      '--gx-card-bg': colors.background,
      '--gx-card-text-color': colors.textColor,
      '--gx-card-border-color': colors.borderColor,
      '--gx-card-title-color': colors.titleColor,
      '--gx-card-subtitle-color': colors.subtitleColor,
      '--gx-card-hover-bg': colors.hoverBackground
    };
  });
}

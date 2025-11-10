import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * GxCardTitle Component
 *
 * 獨立的標題組件
 */
@Component({
  selector: 'gx-card-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3
      class="gx-card-title"
      [class.gx-card-title--clickable]="clickable()"
      (click)="handleClick($event)">
      <ng-content></ng-content>
      {{ text() }}
    </h3>
  `,
  styles: [`
    .gx-card-title {
      margin: 0;
      font-size: var(--gx-card-title-size, 1.25rem);
      font-weight: var(--gx-card-title-weight, 600);
      color: var(--gx-card-title-color, #111827);
      line-height: 1.4;
    }

    .gx-card-title--clickable {
      cursor: pointer;
      transition: color 0.2s;
    }

    .gx-card-title--clickable:hover {
      color: var(--gx-card-title-hover-color, #3b82f6);
    }
  `]
})
export class GxCardTitle {
  /**
   * 標題文字
   */
  text = input<string>('');

  /**
   * 是否可點擊
   */
  clickable = input<boolean>(false);

  /**
   * 點擊事件
   */
  titleClick = output<MouseEvent>();

  handleClick(event: MouseEvent): void {
    if (this.clickable()) {
      event.stopPropagation();
      this.titleClick.emit(event);
    }
  }
}

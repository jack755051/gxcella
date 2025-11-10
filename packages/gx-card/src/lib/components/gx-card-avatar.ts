import { Component, input, output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxMedia } from '../model/card.type';

/**
 * GxCardAvatar Component
 *
 * 獨立的頭像組件，支援 Lucide 圖標
 */
@Component({
  selector: 'gx-card-avatar',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div
      class="gx-card-avatar"
      [class.gx-card-avatar--clickable]="clickable()"
      (click)="handleClick($event)">
      @if (src()) {
        <img
          [src]="src()!"
          [alt]="alt() || 'Avatar'"
          [style.aspect-ratio]="ratio() || '1'"
          class="gx-card-avatar__image"
        />
      } @else if (icon()) {
        <lucide-icon
          [name]="icon()!"
          [size]="size()"
          class="gx-card-avatar__icon">
        </lucide-icon>
      } @else if (text()) {
        <span class="gx-card-avatar__text">{{ text() }}</span>
      }
    </div>
  `,
  styles: [`
    .gx-card-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--gx-card-avatar-size, 48px);
      height: var(--gx-card-avatar-size, 48px);
      border-radius: var(--gx-card-avatar-radius, 50%);
      overflow: hidden;
      background: var(--gx-card-avatar-bg, #e5e7eb);
      color: var(--gx-card-avatar-color, #6b7280);
    }

    .gx-card-avatar--clickable {
      cursor: pointer;
      transition: transform 0.2s;
    }

    .gx-card-avatar--clickable:hover {
      transform: scale(1.05);
    }

    .gx-card-avatar__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .gx-card-avatar__text {
      font-weight: 600;
      font-size: var(--gx-card-avatar-text-size, 1.25rem);
    }
  `]
})
export class GxCardAvatar {
  /**
   * 圖片 URL
   */
  src = input<string | undefined>(undefined);

  /**
   * 圖片替代文字
   */
  alt = input<string | undefined>(undefined);

  /**
   * 圖片比例
   */
  ratio = input<string>('1');

  /**
   * Lucide 圖標名稱
   */
  icon = input<string | undefined>(undefined);

  /**
   * 圖標大小
   */
  size = input<number>(24);

  /**
   * 文字內容（如姓名縮寫）
   */
  text = input<string | undefined>(undefined);

  /**
   * 是否可點擊
   */
  clickable = input<boolean>(false);

  /**
   * 點擊事件
   */
  avatarClick = output<MouseEvent>();

  handleClick(event: MouseEvent): void {
    if (this.clickable()) {
      event.stopPropagation();
      this.avatarClick.emit(event);
    }
  }
}

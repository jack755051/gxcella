import { Component, input, output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxCardAvatar } from '../components/gx-card-avatar';
import { GxCardTitle } from '../components/gx-card-title';

/**
 * GxCardHeaderV2 Component
 *
 * 重構後的 Header 組件，完全獨立可用
 * 支援 Lucide 圖標
 */
@Component({
  selector: 'gx-card-header-v2',
  standalone: true,
  imports: [CommonModule, GxCardAvatar, GxCardTitle],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <header class="gx-card-header">
      <div class="gx-card-header__main">
        @if (avatarSrc() || avatarIcon() || avatarText()) {
          <gx-card-avatar
            [src]="avatarSrc()"
            [icon]="avatarIcon()"
            [text]="avatarText()"
            [size]="avatarSize()"
            [clickable]="avatarClickable()"
            (avatarClick)="handleAvatarClick($event)"
          />
        }

        <div class="gx-card-header__content">
          @if (title()) {
            <gx-card-title
              [text]="title()!"
              [clickable]="titleClickable()"
              (titleClick)="handleTitleClick($event)"
            />
          }

          @if (subtitle()) {
            <p class="gx-card-subtitle">{{ subtitle() }}</p>
          }
        </div>
      </div>

      @if (actionIcon()) {
        <button
          type="button"
          class="gx-card-header__action"
          (click)="handleActionClick($event)">
          <lucide-icon [name]="actionIcon()!" [size]="20"></lucide-icon>
        </button>
      }

      <ng-content></ng-content>
    </header>
  `,
  styles: [`
    .gx-card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--gx-card-header-gap, 1rem);
      padding-bottom: var(--gx-card-header-padding-bottom, 1rem);
      border-bottom: var(--gx-card-header-border, none);
    }

    .gx-card-header__main {
      display: flex;
      align-items: center;
      gap: var(--gx-card-header-gap, 1rem);
      flex: 1;
    }

    .gx-card-header__content {
      flex: 1;
      min-width: 0;
    }

    .gx-card-subtitle {
      margin: 0.25rem 0 0 0;
      font-size: var(--gx-card-subtitle-size, 0.875rem);
      color: var(--gx-card-subtitle-color, #6b7280);
      line-height: 1.4;
    }

    .gx-card-header__action {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      border: none;
      background: transparent;
      color: var(--gx-card-action-color, #6b7280);
      cursor: pointer;
      transition: all 0.2s;
    }

    .gx-card-header__action:hover {
      background: var(--gx-card-action-hover-bg, #f3f4f6);
      color: var(--gx-card-action-hover-color, #111827);
    }
  `]
})
export class GxCardHeaderV2 {
  // Avatar
  avatarSrc = input<string | undefined>(undefined);
  avatarIcon = input<string | undefined>(undefined);
  avatarText = input<string | undefined>(undefined);
  avatarSize = input<number>(48);
  avatarClickable = input<boolean>(false);

  // Title & Subtitle
  title = input<string | undefined>(undefined);
  subtitle = input<string | undefined>(undefined);
  titleClickable = input<boolean>(false);

  // Action Icon
  actionIcon = input<string | undefined>(undefined);

  // Events
  avatarClick = output<MouseEvent>();
  titleClick = output<MouseEvent>();
  actionClick = output<MouseEvent>();

  handleAvatarClick(event: MouseEvent): void {
    this.avatarClick.emit(event);
  }

  handleTitleClick(event: MouseEvent): void {
    this.titleClick.emit(event);
  }

  handleActionClick(event: MouseEvent): void {
    event.stopPropagation();
    this.actionClick.emit(event);
  }
}

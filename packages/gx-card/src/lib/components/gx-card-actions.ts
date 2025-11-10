import { Component, input, output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CardAction {
  id: string;
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

/**
 * GxCardActions Component
 *
 * 獨立的動作按鈕容器，支援 Lucide 圖標
 */
@Component({
  selector: 'gx-card-actions',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="gx-card-actions" [class]="'gx-card-actions--' + align()">
      @for (action of actions(); track action.id) {
        <button
          type="button"
          [class]="getButtonClass(action)"
          [disabled]="action.disabled"
          (click)="handleClick(action, $event)">
          @if (action.icon) {
            <lucide-icon [name]="action.icon" [size]="16"></lucide-icon>
          }
          <span>{{ action.label }}</span>
        </button>
      }
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .gx-card-actions {
      display: flex;
      gap: var(--gx-card-actions-gap, 0.5rem);
      padding-top: var(--gx-card-actions-padding-top, 1rem);
    }

    .gx-card-actions--left {
      justify-content: flex-start;
    }

    .gx-card-actions--center {
      justify-content: center;
    }

    .gx-card-actions--right {
      justify-content: flex-end;
    }

    button {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 1rem;
      border-radius: var(--gx-button-radius, 6px);
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s;
      cursor: pointer;
      border: none;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .gx-card-action--primary {
      background: var(--gx-color-primary, #3b82f6);
      color: white;
    }

    .gx-card-action--primary:hover:not(:disabled) {
      background: var(--gx-color-primary-hover, #2563eb);
    }

    .gx-card-action--secondary {
      background: var(--gx-color-secondary, #6b7280);
      color: white;
    }

    .gx-card-action--secondary:hover:not(:disabled) {
      background: var(--gx-color-secondary-hover, #4b5563);
    }

    .gx-card-action--danger {
      background: var(--gx-color-danger, #ef4444);
      color: white;
    }

    .gx-card-action--danger:hover:not(:disabled) {
      background: var(--gx-color-danger-hover, #dc2626);
    }
  `]
})
export class GxCardActions {
  /**
   * 動作列表
   */
  actions = input<CardAction[]>([]);

  /**
   * 對齊方式
   */
  align = input<'left' | 'center' | 'right'>('right');

  /**
   * 動作點擊事件
   */
  actionClick = output<CardAction>();

  getButtonClass(action: CardAction): string {
    return `gx-card-action gx-card-action--${action.variant || 'primary'}`;
  }

  handleClick(action: CardAction, event: MouseEvent): void {
    if (!action.disabled) {
      event.stopPropagation();
      this.actionClick.emit(action);
    }
  }
}

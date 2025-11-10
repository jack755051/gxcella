import { Component, input } from '@angular/common';
import { CommonModule } from '@angular/common';
import { GxCardActions, CardAction } from '../components/gx-card-actions';

/**
 * GxCardFooterV2 Component
 *
 * 重構後的 Footer 組件，完全獨立可用
 */
@Component({
  selector: 'gx-card-footer-v2',
  standalone: true,
  imports: [CommonModule, GxCardActions],
  template: `
    <footer class="gx-card-footer">
      @if (actions() && actions()!.length > 0) {
        <gx-card-actions
          [actions]="actions()!"
          [align]="align()"
          (actionClick)="handleActionClick($event)"
        />
      }

      <ng-content></ng-content>
    </footer>
  `,
  styles: [`
    .gx-card-footer {
      padding-top: var(--gx-card-footer-padding-top, 1rem);
      border-top: var(--gx-card-footer-border, 1px solid #e5e7eb);
    }
  `]
})
export class GxCardFooterV2 {
  /**
   * 動作列表
   */
  actions = input<CardAction[] | undefined>(undefined);

  /**
   * 對齊方式
   */
  align = input<'left' | 'center' | 'right'>('right');

  handleActionClick(action: CardAction): void {
    console.log('Action clicked:', action);
  }
}

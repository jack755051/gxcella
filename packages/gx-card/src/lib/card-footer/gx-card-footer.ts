import { Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxButton } from '@sanring/gx-ui';
import { GxAction, IGxCardFooter } from '../model/card.type';
import { GxCardConfigService } from '../core/card-config.service';
import { GxCardGroupContext } from '../core/group-context.service';

@Component({
  selector: 'gx-card-footer',
  standalone: true,
  imports: [CommonModule, GxButton],
  templateUrl: './gx-card-footer.html',
  styleUrls: ['./gx-card-footer.css']
})
export class GxCardFooter {
  /**
   * Footer 資料（可選，也可用 ng-content）
   */
  data = input<IGxCardFooter | undefined>(undefined);

  /**
   * 動作列表
   */
  actions = input<GxAction[] | undefined>(undefined);

  /**
   * 按鈕變體（filled, outline, soft, ghost）
   */
  buttonVariant = input<'filled' | 'outline' | 'soft' | 'ghost' | undefined>(undefined);

  /**
   * 最大顯示動作數量
   */
  maxActions = input<number | undefined>(undefined);

  /**
   * 動作點擊事件
   */
  actionClick = output<GxAction>();

  private cardConfig = inject(GxCardConfigService);
  private group = inject(GxCardGroupContext, { optional: true });

  /**
   * 合併後的動作列表
   */
  get actionsData(): GxAction[] {
    return this.actions() ?? this.data()?.actions ?? [];
  }

  /**
   * 根據配置服務獲取按鈕變體
   */
  readonly effectiveButtonVariant = computed(() => {
    const variant = this.buttonVariant();
    if (variant) return variant;

    // 使用預設的 classic shape
    return this.cardConfig.getButtonVariant('classic');
  });

  /**
   * 根據配置服務限制動作數量
   */
  readonly visibleActions = computed(() => {
    const actions = this.actionsData;
    const maxActions = this.maxActions() ?? Infinity;

    return maxActions === Infinity ? actions : actions.slice(0, maxActions);
  });

  /**
   * 處理動作點擊
   */
  onActionPressed(action: GxAction, ev: MouseEvent) {
    ev.stopPropagation();
    if (action.disabled) return;
    this.actionClick.emit(action);
  }

  /**
   * 映射 GxActionIntent 到 GxButtonIntent
   */
  mapIntent(intent?: 'primary'|'secondary'|'danger'): 'info'|'success'|'warning'|'error' {
    switch (intent) {
      case 'primary':   return 'info';
      case 'secondary': return 'success';
      case 'danger':    return 'error';
      default:          return 'info';
    }
  }
}

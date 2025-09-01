import { Component, computed, inject, input, output } from '@angular/core';
import { GxAction, GxCardVariant, IGxCard } from '../../public-api';
import { GxCardGroupContext } from '../core/group-context.service';

@Component({
  selector: 'gx-card',
  standalone: true,
  imports: [],
  templateUrl: './gx-card.html',
  styleUrls: ['./gx-card.css']
})
export class GxCard {
  /**
   * 1. 支援傳入完整的物件 (IGxCard)
   * 2. 支援投影插槽
   * @memberof GxCard
   */
  data = input<IGxCard | undefined>(undefined);

  /**
   * 覆蓋群組設定（不傳就繼承群組，群組沒有就 fallback） 
   * @memberof GxCard
   */
  variant = input<GxCardVariant | undefined>(undefined);
  actions = output<GxAction>();

  private group = inject<GxCardGroupContext>(GxCardGroupContext, { optional: true });

  readonly effectiveVariant = computed<GxCardVariant>(() =>
    this.variant() ?? this.group?.variant() ?? 'elevated'
  );

  get classes() {
    return `gx-card gx-variant-${this.effectiveVariant()}`;
  }

  onAction(action: GxAction) {
    this.actions.emit(action);
  }
}

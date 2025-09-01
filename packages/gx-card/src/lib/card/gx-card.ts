import { GxButton } from '@sanring/gx-ui';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, NgModule, output } from '@angular/core';
import { ALLOWED, GxAction, GxCardLayout, GxCardShape, GxCardVariant, IGxCard } from '../core/card.type';
import { GxCardGroupContext } from '../core/group-context.service';

@Component({
  selector: 'gx-card',
  standalone: true,
  imports: [ CommonModule,GxButton],
  templateUrl: './gx-card.html',
  styleUrls: ['./gx-card.css']
})
export class GxCard {
  /**
   * 1. 支援傳入完整的物件 (IGxCard)
   * 2. 支援投影插槽
   * @memberof GxCard
   */
  data   = input<IGxCard | undefined>(undefined);

  /**
   * 覆蓋群組設定（不傳就繼承群組，群組沒有就 fallback） 
   * @memberof GxCard
   */
  variant = input<GxCardVariant | undefined>(undefined);
  layout  = input<GxCardLayout  | undefined>(undefined);
  shape = input<GxCardShape | undefined>(undefined);

  /**
   * 對外事件（按鈕/卡片 action）
   * @memberof GxCard
   */
  actions = output<GxAction>();

  private group = inject(GxCardGroupContext, { optional: true });

  readonly effectiveVariant = computed<GxCardVariant>(() =>
    this.variant() ?? this.group?.variant() ?? 'elevated'
  );

  readonly effectiveLayout = computed<GxCardLayout>(() =>
    this.layout() ?? this.group?.layout() ?? 'grid'
  );

  readonly effectiveShape = computed<GxCardShape>(() =>
    this.shape() ?? this.data()?.shape ?? 'square'
  );

  /**
   * 形狀計算邏輯：
   * 1. 單卡覆蓋（@Input shape）
   * 2. data().shape
   * 3. 群組不提供 shape（由 layout + allowed 決定）
   * 4. 不相容就自動降級到 allowed 的第一個（你也可改成更聰明的策略）
   */
  private readonly rawShape = computed<GxCardShape>(() =>
    this.shape() ?? this.data()?.shape ?? 'classic'
  );

  readonly resolvedShape = computed<GxCardShape>(() => {
    const layout = this.effectiveLayout();
    const wanted = this.rawShape();
    const allowed = ALLOWED[layout];
    return (allowed as readonly string[]).includes(wanted) ? wanted : (allowed[0] as GxCardShape);
  });

  readonly isCustom = computed(() => this.resolvedShape() === 'custom');

  get classes() {
    return [
      'gx-card',
      `gx-variant-${this.effectiveVariant()}`,
      `gx-layout-${this.effectiveLayout()}`,
      `gx-shape-${this.resolvedShape()}`
    ].join(' ');
  }

  onActionPressed(action: GxAction, ev: MouseEvent) {
    ev.stopPropagation();
    if (action.disabled) return; // 雙保險
    this.actions.emit(action);
  }

    /** 可選：把 GxActionIntent -> GxButtonIntent 的映射（如果色系想對齊） */
    mapIntent(intent?: 'primary'|'secondary'|'danger'): 'info'|'success'|'warning'|'error' {
      switch (intent) {
        case 'primary':   return 'info';
        case 'secondary': return 'success';
        case 'danger':    return 'error';
        default:          return 'info';
      }
    }
}

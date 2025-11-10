import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { ALLOWED, GxAction, GxCardLayout, GxCardShape, GxCardVariant, IGxCard, IGxCardColors, IGxTag } from '../model/card.type';
import { GxCardGroupContext } from '../core/group-context.service';
import { GxCardConfigService } from '../core/card-config.service';
import { GxCardHeader } from '../card-header/gx-card-header';
import { GxCardContent } from '../card-content/gx-card-content';
import { GxCardFooter } from '../card-footer/gx-card-footer';

@Component({
  selector: 'gx-card',
  standalone: true,
  imports: [CommonModule, GxCardHeader, GxCardContent, GxCardFooter],
  templateUrl: './gx-card.html',
  styleUrls: ['./gx-card.css']
})
export class GxCard {
  /**
   * 1. 支援傳入完整的物件 (IGxCard) - 向後兼容
   * 2. 支援投影插槽 - 推薦使用方式
   * @memberof GxCard
   */
  data = input<IGxCard | undefined>(undefined);

  /**
   * 覆蓋群組設定（不傳就繼承群組，群組沒有就 fallback）
   * @memberof GxCard
   */
  variant = input<GxCardVariant | undefined>(undefined);
  layout = input<GxCardLayout | undefined>(undefined);
  shape = input<GxCardShape | undefined>(undefined);

  /**
   * 對外事件（按鈕/卡片 action）
   * @memberof GxCard
   */
  actions = output<GxAction>();

  /**
   * 卡片點擊事件
   */
  cardClick = output<MouseEvent>();

  /**
   * Tag 相關事件
   */
  tagClick = output<{ tag: IGxTag, event: MouseEvent }>();

  /**
   * Header 子項點擊事件
   */
  headerItemClick = output<{ part: 'avatar'|'title'|'subtitle'; value: any; event: MouseEvent }>();

  private group = inject(GxCardGroupContext, { optional: true });
  private cardConfig = inject(GxCardConfigService);

  readonly effectiveVariant = computed<GxCardVariant>(() =>
    this.variant() ?? this.group?.variant() ?? this.cardConfig.config.defaultVariant ?? 'elevated'
  );

  readonly effectiveLayout = computed<GxCardLayout>(() =>
    this.layout() ?? this.group?.layout() ?? this.cardConfig.config.defaultLayout ?? 'grid'
  );

  /**
   * 形狀計算邏輯
   */
  private readonly rawShape = computed<GxCardShape>(() =>
    this.shape() ?? this.data()?.shape ?? this.cardConfig.config.defaultShape ?? 'classic'
  );

  readonly resolvedShape = computed<GxCardShape>(() => {
    const layout = this.effectiveLayout();
    const wanted = this.rawShape();
    const allowed = ALLOWED[layout];
    return (allowed as readonly string[]).includes(wanted) ? wanted : (allowed[0] as GxCardShape);
  });

  /**
   * 是否為向後兼容模式（使用 data input）
   */
  readonly isLegacyMode = computed(() => !!this.data());

  /**
   * 是否可點擊（用於控制 cursor 和樣式）
   */
  clickable = input<boolean>(false);

  /**
   * Header 點擊設定（傳遞給子組件）
   */
  headerClickable = input<boolean | { avatar?: boolean; title?: boolean; subtitle?: boolean }>(false);

  /**
   * 顏色配置
   */
  colors = input<IGxCardColors | undefined>(undefined);

  /**
   * CSS 樣式綁定（用於動態顏色）
   */
  get cardStyles() {
    const colors = this.colors();
    if (!colors) return {};

    return {
      '--gx-card-background': colors.background,
      '--gx-card-text-color': colors.textColor,
      '--gx-card-border-color': colors.borderColor,
      '--gx-card-title-color': colors.titleColor,
      '--gx-card-subtitle-color': colors.subtitleColor,
      '--gx-card-hover-background': colors.hoverBackground
    };
  }

  get classes() {
    const baseClasses = [
      this.cardConfig.getCssClass('card'),
      this.cardConfig.getCssClass(`variant-${this.effectiveVariant()}`),
      this.cardConfig.getCssClass(`shape-${this.resolvedShape()}`)
    ];

    if (this.clickable()) {
      baseClasses.push('gx-card-clickable');
    }

    return baseClasses.join(' ');
  }

  /**
   * 處理動作點擊事件（從子組件冒泡）
   */
  onActionPressed(action: GxAction) {
    this.actions.emit(action);
  }

  /**
   * 處理 Tag 點擊事件（從子組件冒泡）
   */
  onTagClick(event: { tag: IGxTag, event: MouseEvent }) {
    this.tagClick.emit(event);
  }

  /**
   * 處理 Header 子項點擊事件（從子組件冒泡）
   */
  onHeaderItemClick(event: { part: 'avatar'|'title'|'subtitle'; value: any; event: MouseEvent }) {
    this.headerItemClick.emit(event);
  }

  /**
   * 處理卡片點擊事件
   */
  onCardClick(event: MouseEvent) {
    if (this.clickable() && !this.isInteractiveEvent(event)) {
      this.cardClick.emit(event);
    }
  }

  /**
   * 檢查是否為互動元素
   */
  private isInteractiveEvent(event: MouseEvent): boolean {
    const TAGS = ['button', 'a', 'input', 'select', 'textarea', 'gx-button', 'gx-tag'];
    const path = (event as any).composedPath?.() as Array<EventTarget> | undefined;
    const chain: Element[] = path
      ? (path.filter((n): n is Element => (n as Element)?.nodeType === 1))
      : this.upChain(event.target as Element);
    return chain.some(el =>
      TAGS.includes(el.tagName?.toLowerCase()) ||
      el.classList?.contains('gx-expand-button') ||
      el.closest?.('[data-interactive="true"]')
    );
  }

  private upChain(node: Element) {
    const chain: Element[] = [];
    for (let cur: Element | null = node; cur; cur = cur.parentElement) chain.push(cur);
    return chain;
  }
}

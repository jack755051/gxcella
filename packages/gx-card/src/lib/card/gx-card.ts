import { GxButton, GxTag } from '@sanring/gx-ui';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, NgModule, output, signal } from '@angular/core';
import { ALLOWED, GxAction, GxCardLayout, GxCardShape, GxCardVariant, IGxCard, IGxTag } from '../core/card.type';
import { GxCardGroupContext } from '../core/group-context.service';
import { GxCardConfigService } from '../core/card-config.service';

@Component({
  selector: 'gx-card',
  standalone: true,
  imports: [ CommonModule,GxButton,GxTag],
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

  /**
   * Tag 相關事件
   */
  tagClick = output<{ tag: IGxTag, event: MouseEvent }>();
  tagRemove = output<{ tag: IGxTag }>();

  private group = inject(GxCardGroupContext, { optional: true });
  private cardConfig = inject(GxCardConfigService);

  // 展開/收起狀態管理
  private isExpanded = signal(false);

  readonly effectiveVariant = computed<GxCardVariant>(() =>
    this.variant() ?? this.group?.variant() ?? this.cardConfig.config.defaultVariant ?? 'elevated'
  );

  readonly effectiveLayout = computed<GxCardLayout>(() =>
    this.layout() ?? this.group?.layout() ?? this.cardConfig.config.defaultLayout ?? 'grid'
  );

  /**
   * 形狀計算邏輯：
   * 1. 單卡覆蓋（@Input shape）
   * 2. data().shape
   * 3. 群組不提供 shape（由 layout + allowed 決定）
   * 4. 不相容就自動降級到 allowed 的第一個（你也可改成更聰明的策略）
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
   * Square 卡片只顯示第一個（主要）動作
   */
  readonly primaryAction = computed<GxAction | undefined>(() => {
    const actions = this.data()?.footer?.actions;
    return actions && actions.length > 0 ? actions[0] : undefined;
  });

  /**
   * 根據 shape 決定是否顯示特定內容
   */
  readonly shouldShowContent = computed(() => {
    const shape = this.resolvedShape();
    return {
      avatar: true, // 所有 shape 都顯示頭像
      headerSubtitle: shape !== 'square', // square 不顯示 header subtitle
      contentImage: shape === 'classic', // 只有 classic 顯示內容圖片
      contentSubtitle: shape !== 'square', // square 不顯示 content subtitle  
      contentDescription: shape !== 'square', // square 不顯示描述
      allActions: shape === 'classic', // 只有 classic 顯示所有動作
      limitedActions: shape === 'landscape' // landscape 限制動作數量
    };
  });

  /**
   * 根據配置服務獲取按鈕變體
   */
  readonly buttonVariant = computed(() => {
    return this.cardConfig.getButtonVariant(this.resolvedShape());
  });

  /**
   * 根據配置服務限制動作數量
   */
  readonly visibleActions = computed(() => {
    const actions = this.data()?.footer?.actions || [];
    const shape = this.resolvedShape();
    const maxActions = this.cardConfig.getMaxActions(shape);
    
    return maxActions === Infinity ? actions : actions.slice(0, maxActions);
  });

  /**
   * 文字展開/收起相關計算屬性
   */
  readonly expandableText = computed(() => {
    const description = this.data()?.content?.description;
    const shape = this.resolvedShape();
    
    if (!description || shape !== 'classic') {
      return {
        originalText: description || '',
        truncatedText: description || '',
        shouldShowButton: false,
        isExpanded: this.isExpanded(),
        maxLines: 0
      };
    }

    const maxLines = this.cardConfig.getExpandableLimit(shape);
    
    // 簡化邏輯：如果文字超過一定長度，就認為需要截斷
    // 這裡使用字符數來估算，每行大約 50-60 個字符
    const estimatedLines = Math.ceil(description.length / 55);
    const shouldTruncate = estimatedLines > maxLines;
    
    // 計算截斷位置（大約每行 55 個字符）
    const truncateLength = maxLines * 55;
    const truncatedText = shouldTruncate ? 
      description.substring(0, truncateLength) + '...' : 
      description;
    
    return {
      originalText: description,
      truncatedText,
      shouldShowButton: shouldTruncate,
      isExpanded: this.isExpanded(),
      maxLines
    };
  });

  readonly displayText = computed(() => {
    const { originalText, truncatedText, isExpanded } = this.expandableText();
    return isExpanded ? originalText : truncatedText;
  });

  readonly expandButtonText = computed(() => {
    const isExpanded = this.isExpanded();
    const config = this.cardConfig.config.expandable?.buttonText;
    return isExpanded ? 
      (config?.collapse || '收起內容') : 
      (config?.expand || '展開更多');
  });


  readonly isCustom = computed(() => this.resolvedShape() === 'custom');

  get classes() {
    return [
      this.cardConfig.getCssClass('card'),
      this.cardConfig.getCssClass(`variant-${this.effectiveVariant()}`),
      this.cardConfig.getCssClass(`shape-${this.resolvedShape()}`)
    ].join(' ');
  }

  onActionPressed(action: GxAction, ev: MouseEvent) {
    ev.stopPropagation();
    if (action.disabled) return; // 雙保險
    this.actions.emit(action);
  }

  /**
   * 切換文字展開/收起狀態
   */
  toggleExpand() {
    this.isExpanded.update(value => !value);
  }

  /**
   * 處理 Tag 點擊事件
   */
  onTagClick(tag: IGxTag, event: MouseEvent) {
    this.tagClick.emit({ tag, event });
  }

  /**
   * 處理 Tag 移除事件
   */
  onTagRemove(tag: IGxTag) {
    this.tagRemove.emit({ tag });
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

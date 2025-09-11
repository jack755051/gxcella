import { GxButton } from '@sanring/gx-ui';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, NgModule, output, signal, viewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ALLOWED, GxAction, GxCardLayout, GxCardShape, GxCardVariant, GxMedia, IGxCard, IGxTag, IGxDescriptionCollapse } from '../model/card.type';
import { GxCardGroupContext } from '../core/group-context.service';
import { GxCardConfigService } from '../core/card-config.service';
import { GxClickableDirective, GxClickableEvent } from '../directives/gx-clickable.directive';
import { HeightMeasurementService, HeightMeasurementResult } from '../core/height-measurement.service';

@Component({
  selector: 'gx-card',
  standalone: true,
  imports: [ CommonModule, GxButton, GxClickableDirective],
  templateUrl: './gx-card.html',
  styleUrls: ['./gx-card.css']
})
export class GxCard implements AfterViewInit, OnDestroy {
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
   * 卡片點擊事件
   */
  cardClick = output<MouseEvent>();

  /**
   * Tag 相關事件
   */
  tagClick = output<{ tag: IGxTag, event: MouseEvent }>();

  /**
   * Header 點擊事件
   */
  headerClick = output<{ headerData: IGxCard['header'], event: MouseEvent }>();

  /**
   * Avatar 點擊事件
   */
  avatarClick = output<{ avatarData: GxMedia | undefined, event: MouseEvent }>();

  /**
   * Title 點擊事件
   */
  titleClick = output<{ title: string, event: MouseEvent }>();

  /**
   * Subtitle 點擊事件
   */
  subtitleClick = output<{ subtitle: string, event: MouseEvent }>();

  private group = inject(GxCardGroupContext, { optional: true });
  private cardConfig = inject(GxCardConfigService);
  private heightMeasurement = inject(HeightMeasurementService);

  // ViewChild 用於獲取描述文字容器的引用
  descriptionContainer = viewChild<ElementRef<HTMLDivElement>>('descriptionContainer');

  // 展開/收起狀態管理
  private isExpanded = signal(false);
  // 高度測量結果
  private measurementResult = signal<HeightMeasurementResult | null>(null);

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
   * 優化的 computed - 快取常用的資料
   */
  readonly headerData = computed(() => this.data()?.header);
  readonly contentData = computed(() => this.data()?.content);
  readonly footerData = computed(() => this.data()?.footer);

  /**
   * 優化的 computed - 避免重複計算
   */
  readonly hasAvatar = computed(() => !!this.headerData()?.avatar?.src);
  readonly hasTitle = computed(() => !!this.headerData()?.title);
  readonly hasSubtitle = computed(() => !!this.headerData()?.subtitle);
  readonly hasContentImage = computed(() => !!this.contentData()?.image?.src);
  readonly hasDescription = computed(() => !!this.contentData()?.description);
  readonly hasTags = computed(() => !!this.contentData()?.tags?.length);
  readonly hasActions = computed(() => !!this.footerData()?.actions?.length);
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
   * 收合配置計算屬性
   */
  readonly collapseConfig = computed(() => {
    const contentData = this.contentData();
    const userConfig = contentData?.descriptionCollapse;
    
    // 如果用戶明確設定 enabled: false，則不啟用收合功能
    if (userConfig && userConfig.enabled === false) {
      return null;
    }
    
    // 如果沒有 description，則不啟用收合功能
    if (!contentData?.description) {
      return null;
    }
    
    // 如果用戶設定 enabled: true 或提供了收合配置，則啟用
    if (userConfig?.enabled === true || userConfig) {
      const defaultConfig = this.cardConfig.getDefaultCollapseConfig();
      return {
        enabled: true,
        maxLines: userConfig.maxLines ?? defaultConfig.maxLines ?? 3,
        fontSize: userConfig.fontSize ?? defaultConfig.fontSize ?? 14,
        lineHeight: userConfig.lineHeight ?? defaultConfig.lineHeight ?? 20,
        expandText: userConfig.expandText ?? defaultConfig.expandText ?? '展開更多',
        collapseText: userConfig.collapseText ?? defaultConfig.collapseText ?? '收起內容'
      } as Required<IGxDescriptionCollapse>;
    }
    
    return null;
  });

  /**
   * 文字展開/收起相關計算屬性
   */
  readonly expandableText = computed(() => {
    const description = this.data()?.content?.description;
    const shape = this.resolvedShape();
    const collapseConfig = this.collapseConfig();
    
    // 如果沒有描述文字或沒有收合配置，則不顯示收合功能
    if (!description || !collapseConfig) {
      return {
        originalText: description || '',
        truncatedText: description || '',
        shouldShowButton: false,
        isExpanded: this.isExpanded(),
        maxLines: 0,
        useRealMeasurement: false,
        collapseConfig: null
      };
    }

    const maxLines = collapseConfig.maxLines;
    const useRealMeasurement = this.cardConfig.isRealHeightMeasurementEnabled();
    
    if (useRealMeasurement) {
      // 使用實際高度測量
      const measurement = this.measurementResult();
      if (measurement) {
        return {
          originalText: description,
          truncatedText: measurement.shouldTruncate ? this.truncateTextToLines(description, measurement.maxLines) : description,
          shouldShowButton: measurement.shouldTruncate,
          isExpanded: this.isExpanded(),
          maxLines: measurement.maxLines,
          useRealMeasurement: true,
          measurementResult: measurement,
          collapseConfig
        };
      } else {
        // 測量尚未完成，使用原文字但不顯示按鈕
        return {
          originalText: description,
          truncatedText: description,
          shouldShowButton: false,
          isExpanded: this.isExpanded(),
          maxLines,
          useRealMeasurement: true,
          collapseConfig
        };
      }
    } else {
      // 使用舊的字符數估算方式（作為後備）
      const estimatedLines = Math.ceil(description.length / 55);
      const shouldTruncate = estimatedLines > maxLines;
      const truncateLength = maxLines * 55;
      const truncatedText = shouldTruncate ? 
        description.substring(0, truncateLength) + '...' : 
        description;
      
      return {
        originalText: description,
        truncatedText,
        shouldShowButton: shouldTruncate,
        isExpanded: this.isExpanded(),
        maxLines,
        useRealMeasurement: false,
        collapseConfig
      };
    }
  });

  readonly displayText = computed(() => {
    const { originalText, truncatedText, isExpanded } = this.expandableText();
    return isExpanded ? originalText : truncatedText;
  });

  readonly expandButtonText = computed(() => {
    const isExpanded = this.isExpanded();
    const collapseConfig = this.collapseConfig();
    
    if (collapseConfig) {
      return isExpanded ? collapseConfig.collapseText : collapseConfig.expandText;
    }
    
    // 後備方案
    const config = this.cardConfig.config.expandable?.buttonText;
    return isExpanded ? 
      (config?.collapse || '收起內容') : 
      (config?.expand || '展開更多');
  });


  readonly isCustom = computed(() => this.resolvedShape() === 'custom');

  /**
   * 是否可點擊（用於控制 cursor 和樣式）
   */
  clickable = input<boolean>(false);

  get classes() {
    const baseClasses = [
      this.cardConfig.getCssClass('card'),
      this.cardConfig.getCssClass(`variant-${this.effectiveVariant()}`),
      this.cardConfig.getCssClass(`shape-${this.resolvedShape()}`)
    ];

    // 如果卡片可點擊，添加可點擊類別
    if (this.clickable()) {
      baseClasses.push('gx-card-clickable');
    }

    return baseClasses.join(' ');
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
   * 處理 Header 點擊事件
   */
  onHeaderClick(event: MouseEvent) {
    const headerData = this.data()?.header;
    
    if (!headerData?.href) return;
    
    event.stopPropagation(); // 防止觸發卡片點擊
    
    // 如果有 href，進行路由導航
    if (headerData.href) {
      if (headerData.target === '_blank') {
        window.open(headerData.href, '_blank');
      } else {
        // 這裡可以使用 Router 進行內部路由導航
        // 或者觸發事件讓父組件處理
        window.location.href = headerData.href;
      }
    }
    
    // 發送點擊事件給父組件
    this.headerClick.emit({ headerData, event });
  }

  /**
   * 處理 Avatar 點擊事件
   */
  onAvatarClick(event: GxClickableEvent<GxMedia>) {
    event.event.stopPropagation();
    this.avatarClick.emit({ avatarData: event.data, event: event.event });
  }

  /**
   * 處理 Title 點擊事件
   */
  onTitleClick(event: GxClickableEvent<string>) {
    event.event.stopPropagation();
    const title = event.data;
    if (title) {
      this.titleClick.emit({ title, event: event.event });
    }
  }

  /**
   * 處理 Subtitle 點擊事件
   */
  onSubtitleClick(event: GxClickableEvent<string>) {
    event.event.stopPropagation();
    const subtitle = event.data;
    if (subtitle) {
      this.subtitleClick.emit({ subtitle, event: event.event });
    }
  }

  /**
   * 處理卡片點擊事件
   */
  onCardClick(event: MouseEvent) {
    // 只有在可點擊且點擊的不是互動元素時才觸發
    if (this.clickable() && !this.isInteractiveElement(event.target as Element)) {
      this.cardClick.emit(event);
    }
  }

  /**
   * 檢查點擊的元素是否為互動元素 - 優化版本
   */
  private readonly interactiveSelectors = [
    'button', 'gx-button', 'gx-tag', 'a', 'input', 'select', 'textarea'
  ];

  private readonly interactiveClasses = [
    'gx-expand-button',
    'gx-card-header-img', 
    'title',
    'subtitle'
  ];

  private isInteractiveElement(target: Element): boolean {
    if (!target) return false;
    
    let current: Element | null = target;
    while (current) {
      const tagName = current.tagName.toLowerCase();
      
      // 檢查標籤名稱
      if (this.interactiveSelectors.includes(tagName)) {
        return true;
      }
      
      // 檢查類別名稱
      if (this.interactiveClasses.some(className => 
        current!.classList.contains(className))) {
        return true;
      }
      
      // 檢查是否有點擊處理器
      if (current.hasAttribute('gxClickable') || 
          current.hasAttribute('(click)') || 
          current.hasAttribute('ng-click')) {
        return true;
      }
      
      current = current.parentElement;
    }
    
    return false;
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

  /**
   * Angular 生命週期 - 視圖初始化後
   */
  ngAfterViewInit(): void {
    // 如果啟用實際高度測量，開始測量
    if (this.cardConfig.isRealHeightMeasurementEnabled()) {
      this.setupHeightMeasurement();
    }
  }

  /**
   * Angular 生命週期 - 組件銷毀
   */
  ngOnDestroy(): void {
    this.cleanupHeightMeasurement();
  }

  /**
   * 設置高度測量
   */
  private setupHeightMeasurement(): void {
    const container = this.descriptionContainer();
    const collapseConfig = this.collapseConfig();
    
    if (!container?.nativeElement || !collapseConfig) return;

    const element = container.nativeElement;
    const description = this.data()?.content?.description;
    if (!description) return;

    // 執行初始測量
    this.performHeightMeasurement(element, description, collapseConfig);

    // 監聽容器大小變化
    this.heightMeasurement.observeElementResize(element, () => {
      this.performHeightMeasurement(element, description, collapseConfig);
    });
  }

  /**
   * 執行高度測量
   */
  private performHeightMeasurement(element: HTMLElement, text: string, collapseConfig: Required<IGxDescriptionCollapse>): void {
    const maxLines = collapseConfig.maxLines;
    const lineHeight = collapseConfig.lineHeight;
    const containerPadding = this.cardConfig.getContainerPadding();

    const result = this.heightMeasurement.measureTextHeight(
      text,
      element,
      maxLines,
      lineHeight,
      containerPadding
    );

    this.measurementResult.set(result);
  }

  /**
   * 清理高度測量相關資源
   */
  private cleanupHeightMeasurement(): void {
    const container = this.descriptionContainer();
    if (container?.nativeElement) {
      this.heightMeasurement.unobserveElementResize(container.nativeElement);
    }
  }

  /**
   * 根據行數截斷文字
   */
  private truncateTextToLines(text: string, maxLines: number): string {
    // 這裡可以使用更精確的算法
    // 暫時使用簡化版本，實際應該根據實際測量結果來截斷
    const wordsPerLine = 15; // 估算每行字數
    const maxWords = maxLines * wordsPerLine;
    const words = text.split(/\s+/);
    
    if (words.length <= maxWords) {
      return text;
    }
    
    return words.slice(0, maxWords).join(' ') + '...';
  }
}

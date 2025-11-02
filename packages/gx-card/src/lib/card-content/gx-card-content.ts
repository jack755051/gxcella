import { Component, computed, inject, input, output, signal, viewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxButton } from '@sanring/gx-ui';
import { GxMedia, IGxCardContent, IGxTag, IGxDescriptionCollapse } from '../model/card.type';
import { GxCardConfigService } from '../core/card-config.service';
import { HeightMeasurementService, HeightMeasurementResult } from '../core/height-measurement.service';

@Component({
  selector: 'gx-card-content',
  standalone: true,
  imports: [CommonModule, GxButton],
  templateUrl: './gx-card-content.html',
  styleUrls: ['./gx-card-content.css']
})
export class GxCardContent implements AfterViewInit, OnDestroy {
  /**
   * Content 資料（可選，也可用 ng-content）
   */
  data = input<IGxCardContent | undefined>(undefined);

  /**
   * 標題
   */
  title = input<string | undefined>(undefined);

  /**
   * 副標題
   */
  subtitle = input<string | undefined>(undefined);

  /**
   * 描述文字
   */
  description = input<string | undefined>(undefined);

  /**
   * 圖片
   */
  image = input<GxMedia | undefined>(undefined);

  /**
   * 標籤
   */
  tags = input<IGxTag[] | undefined>(undefined);

  /**
   * 描述文字收合配置
   */
  descriptionCollapse = input<IGxDescriptionCollapse | undefined>(undefined);

  /**
   * Tag 點擊事件
   */
  tagClick = output<{ tag: IGxTag, event: MouseEvent }>();

  private cardConfig = inject(GxCardConfigService);
  private heightMeasurement = inject(HeightMeasurementService);

  // ViewChild 用於獲取描述文字容器的引用
  descriptionContainer = viewChild<ElementRef<HTMLDivElement>>('descriptionContainer');

  // 展開/收起狀態管理
  private isExpanded = signal(false);
  // 高度測量結果
  private measurementResult = signal<HeightMeasurementResult | null>(null);

  /**
   * 合併後的資料
   */
  get titleText(): string | undefined {
    return this.title() ?? this.data()?.title;
  }

  get subtitleText(): string | undefined {
    return this.subtitle() ?? this.data()?.subtitle;
  }

  get descriptionText(): string | undefined {
    return this.description() ?? this.data()?.description;
  }

  get imageData(): GxMedia | undefined {
    return this.image() ?? this.data()?.image;
  }

  get tagsData(): IGxTag[] | undefined {
    return this.tags() ?? this.data()?.tags;
  }

  get collapseData(): IGxDescriptionCollapse | undefined {
    return this.descriptionCollapse() ?? this.data()?.descriptionCollapse;
  }

  /**
   * 收合配置計算屬性
   */
  readonly collapseConfig = computed(() => {
    const userConfig = this.collapseData;

    // 如果用戶明確設定 enabled: false，則不啟用收合功能
    if (userConfig && userConfig.enabled === false) {
      return null;
    }

    // 如果沒有 description，則不啟用收合功能
    if (!this.descriptionText) {
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
    const description = this.descriptionText;
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
    const description = this.descriptionText;
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
    const wordsPerLine = 15;
    const maxWords = maxLines * wordsPerLine;
    const words = text.split(/\s+/);

    if (words.length <= maxWords) {
      return text;
    }

    return words.slice(0, maxWords).join(' ') + '...';
  }
}

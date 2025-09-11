import { Injectable, signal, computed } from '@angular/core';

/**
 * 高度測量結果介面
 */
export interface HeightMeasurementResult {
  /** 內容的實際高度 */
  contentHeight: number;
  /** 允許的最大高度 */
  maxAllowedHeight: number;
  /** 是否需要截斷 */
  shouldTruncate: boolean;
  /** 實際行數 */
  actualLines: number;
  /** 允許的最大行數 */
  maxLines: number;
}

/**
 * 高度測量服務
 * 負責實際測量文字內容的高度並判斷是否需要展開按鈕
 */
@Injectable({
  providedIn: 'root'
})
export class HeightMeasurementService {
  private measurementCache = new Map<string, HeightMeasurementResult>();
  private resizeObservers = new Map<Element, ResizeObserver>();

  /**
   * 測量文字內容的實際高度
   * @param text 要測量的文字內容
   * @param containerElement 容器元素（用於獲取樣式）
   * @param maxLines 允許的最大行數
   * @param lineHeight 行高（px）
   * @param containerPadding 容器邊距（px）
   * @returns 測量結果
   */
  measureTextHeight(
    text: string,
    containerElement: HTMLElement,
    maxLines: number,
    lineHeight: number,
    containerPadding: number = 0
  ): HeightMeasurementResult {
    // 創建緩存鍵
    const cacheKey = this.createCacheKey(text, containerElement, maxLines, lineHeight, containerPadding);
    
    // 檢查緩存
    if (this.measurementCache.has(cacheKey)) {
      return this.measurementCache.get(cacheKey)!;
    }

    // 創建測量元素
    const measureElement = this.createMeasureElement(text, containerElement);
    
    try {
      // 測量實際高度
      const contentHeight = measureElement.scrollHeight;
      const maxAllowedHeight = maxLines * lineHeight + containerPadding;
      const actualLines = Math.ceil(contentHeight / lineHeight);
      
      const result: HeightMeasurementResult = {
        contentHeight,
        maxAllowedHeight,
        shouldTruncate: contentHeight > maxAllowedHeight,
        actualLines,
        maxLines
      };

      // 存入緩存
      this.measurementCache.set(cacheKey, result);
      
      return result;
    } finally {
      // 清理測量元素
      measureElement.remove();
    }
  }

  /**
   * 監聽元素大小變化
   * @param element 要監聽的元素
   * @param callback 變化時的回調函數
   */
  observeElementResize(
    element: HTMLElement,
    callback: (entry: ResizeObserverEntry) => void
  ): void {
    // 如果已經有觀察器，先移除
    this.unobserveElementResize(element);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        callback(entry);
      }
    });

    observer.observe(element);
    this.resizeObservers.set(element, observer);
  }

  /**
   * 停止監聽元素大小變化
   * @param element 要停止監聽的元素
   */
  unobserveElementResize(element: HTMLElement): void {
    const observer = this.resizeObservers.get(element);
    if (observer) {
      observer.disconnect();
      this.resizeObservers.delete(element);
    }
  }

  /**
   * 清理指定的緩存
   * @param pattern 緩存鍵的模式（可選）
   */
  clearCache(pattern?: string): void {
    if (pattern) {
      for (const key of this.measurementCache.keys()) {
        if (key.includes(pattern)) {
          this.measurementCache.delete(key);
        }
      }
    } else {
      this.measurementCache.clear();
    }
  }

  /**
   * 創建用於測量的隱藏元素
   */
  private createMeasureElement(text: string, referenceElement: HTMLElement): HTMLElement {
    const measureElement = document.createElement('div');
    
    // 複製參考元素的計算樣式
    const computedStyle = window.getComputedStyle(referenceElement);
    
    // 設置基本樣式
    measureElement.style.position = 'absolute';
    measureElement.style.visibility = 'hidden';
    measureElement.style.height = 'auto';
    measureElement.style.width = computedStyle.width;
    measureElement.style.maxWidth = computedStyle.maxWidth;
    measureElement.style.minWidth = computedStyle.minWidth;
    
    // 複製文字相關樣式
    const textStyleProperties = [
      'fontFamily', 'fontSize', 'fontWeight', 'fontStyle',
      'lineHeight', 'letterSpacing', 'wordSpacing', 'textAlign',
      'wordBreak', 'whiteSpace', 'wordWrap', 'hyphens'
    ];
    
    textStyleProperties.forEach(prop => {
      measureElement.style[prop as any] = computedStyle[prop as any];
    });
    
    // 設置內容
    measureElement.textContent = text;
    
    // 添加到 DOM 中進行測量
    document.body.appendChild(measureElement);
    
    return measureElement;
  }

  /**
   * 創建緩存鍵
   */
  private createCacheKey(
    text: string,
    containerElement: HTMLElement,
    maxLines: number,
    lineHeight: number,
    containerPadding: number
  ): string {
    const computedStyle = window.getComputedStyle(containerElement);
    const styleFingerprint = [
      computedStyle.width,
      computedStyle.fontSize,
      computedStyle.fontFamily,
      computedStyle.lineHeight,
      computedStyle.wordBreak,
      computedStyle.whiteSpace
    ].join('|');
    
    return `${text.length}-${styleFingerprint}-${maxLines}-${lineHeight}-${containerPadding}`;
  }

  /**
   * 清理所有資源
   */
  destroy(): void {
    // 清理所有觀察器
    for (const observer of this.resizeObservers.values()) {
      observer.disconnect();
    }
    this.resizeObservers.clear();
    
    // 清理緩存
    this.measurementCache.clear();
  }
}

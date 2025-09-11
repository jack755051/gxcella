import { Injectable, InjectionToken, inject } from '@angular/core';
import { GxCardShape, GxCardVariant, GxCardLayout } from '../model/card.type';

/**
 * 卡片全域配置介面
 */
export interface GxCardGlobalConfig {
  /** 預設的卡片變體 */
  defaultVariant?: GxCardVariant;
  
  /** 預設的佈局方式 */
  defaultLayout?: GxCardLayout;
  
  /** 預設的卡片形狀 */
  defaultShape?: GxCardShape;
  
  /** 擴展卡片配置 */
  expandable?: {
    /** 不同 shape 的預設行數限制 */
    shapeLimits?: {
      classic?: number;
      landscape?: number;
      square?: number;
    };
    
    /** 預設收合配置 */
    defaultCollapse?: {
      /** 預設最大行數 */
      maxLines?: number;
      /** 預設字型大小 (px) */
      fontSize?: number;
      /** 預設行高 (px) */
      lineHeight?: number;
      /** 預設展開按鈕文字 */
      expandText?: string;
      /** 預設收起按鈕文字 */
      collapseText?: string;
    };
    
    /** 行高設定 (px)，用於計算實際高度 */
    lineHeight?: number;
    
    /** 容器邊距設定 (px)，用於精確計算 */
    containerPadding?: number;
    
    /** 動畫持續時間 (ms) */
    animationDuration?: number;
    
    /** 按鈕文字自定義 */
    buttonText?: {
      expand?: string;
      collapse?: string;
    };
    
    /** 是否啟用實際高度測量 */
    useRealHeightMeasurement?: boolean;
  };
  
  /** 動作按鈕配置 */
  actions?: {
    /** 預設最大動作數量 */
    maxActions?: Record<GxCardShape, number>;
    
    /** 預設按鈕變體 */
    buttonVariants?: Record<GxCardShape, 'filled' | 'outline' | 'soft' | 'ghost' | 'tag'>;
  };
  
  /** 自定義 CSS 類別前綴 */
  cssPrefix?: string;
}

/**
 * 預設配置
 */
export const DEFAULT_CARD_CONFIG: GxCardGlobalConfig = {
  defaultVariant: 'elevated',
  defaultLayout: 'grid',
  defaultShape: 'classic',
  expandable: {
    shapeLimits: {
      classic: 3,
      landscape: 2,
      square: 1
    },
    defaultCollapse: {
      maxLines: 3,
      fontSize: 14,
      lineHeight: 20, // fontSize * 1.4 ≈ 20px (1.4 line-height ratio)
      expandText: '展開更多',
      collapseText: '收起內容'
    },
    lineHeight: 24, // 預設行高 24px
    containerPadding: 0, // 預設無額外邊距
    animationDuration: 300,
    useRealHeightMeasurement: true, // 預設啟用實際高度測量
    buttonText: {
      expand: '展開更多',
      collapse: '收起內容'
    }
  },
  actions: {
    maxActions: {
      classic: Infinity,
      square: 1,
      landscape: 2,
      portrait: 3,
      custom: Infinity
    },
    buttonVariants: {
      classic: 'filled',
      square: 'filled',
      landscape: 'outline',
      portrait: 'filled',
      custom: 'filled'
    }
  },
  cssPrefix: 'gx'
};

/**
 * 配置注入 Token
 */
export const GX_CARD_CONFIG = new InjectionToken<Partial<GxCardGlobalConfig>>(
  'GX_CARD_CONFIG'
);

/**
 * 卡片配置服務
 */
@Injectable({
  providedIn: 'root'
})
export class GxCardConfigService {
  private readonly userConfig = inject(GX_CARD_CONFIG, { optional: true });
  
  /** 合併後的完整配置 */
  readonly config: GxCardGlobalConfig;
  
  constructor() {
    // 深度合併用戶配置和預設配置
    this.config = this.deepMerge(DEFAULT_CARD_CONFIG, this.userConfig || {});
  }
  
  /**
   * 獲取預設收合配置
   */
  getDefaultCollapseConfig() {
    return this.config.expandable?.defaultCollapse || 
           DEFAULT_CARD_CONFIG.expandable!.defaultCollapse!;
  }
  
  /**
   * 獲取擴展卡片的行數限制
   */
  getExpandableLimit(shape: GxCardShape): number {
    return this.config.expandable?.shapeLimits?.[shape] || 
           this.config.expandable?.shapeLimits?.classic || 
           DEFAULT_CARD_CONFIG.expandable!.shapeLimits!.classic!;
  }
  
  /**
   * 獲取行高設定
   */
  getLineHeight(): number {
    return this.config.expandable?.lineHeight || 
           DEFAULT_CARD_CONFIG.expandable!.lineHeight!;
  }
  
  /**
   * 獲取容器邊距設定
   */
  getContainerPadding(): number {
    return this.config.expandable?.containerPadding || 
           DEFAULT_CARD_CONFIG.expandable!.containerPadding!;
  }
  
  /**
   * 是否啟用實際高度測量
   */
  isRealHeightMeasurementEnabled(): boolean {
    return this.config.expandable?.useRealHeightMeasurement ?? 
           DEFAULT_CARD_CONFIG.expandable!.useRealHeightMeasurement!;
  }
  
  /**
   * 獲取動作按鈕的最大數量
   */
  getMaxActions(shape: GxCardShape): number {
    return this.config.actions?.maxActions?.[shape] || 
           this.config.actions?.maxActions?.classic || 
           DEFAULT_CARD_CONFIG.actions!.maxActions!.classic!;
  }
  
  /**
   * 獲取按鈕變體
   */
  getButtonVariant(shape: GxCardShape): 'filled' | 'outline' | 'soft' | 'ghost' | 'tag' {
    return this.config.actions?.buttonVariants?.[shape] || 
           this.config.actions?.buttonVariants?.classic || 
           DEFAULT_CARD_CONFIG.actions!.buttonVariants!.classic!;
  }
  
  /**
   * 獲取 CSS 類別名稱
   */
  getCssClass(suffix: string): string {
    return `${this.config.cssPrefix || 'gx'}-${suffix}`;
  }
  
  /**
   * 深度合併物件
   */
  private deepMerge<T>(target: T, source: Partial<T>): T {
    const result = { ...target };
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(result[key], source[key] as any);
      } else if (source[key] !== undefined) {
        result[key] = source[key] as any;
      }
    }
    
    return result;
  }
}

import { Injectable, InjectionToken, inject } from '@angular/core';
import { GxCardShape, GxCardVariant, GxCardLayout } from './card.type';

/**
 * 簡化的卡片全域配置介面
 */
export interface GxCardGlobalConfig {
  defaultVariant?: GxCardVariant;
  defaultLayout?: GxCardLayout;
  defaultShape?: GxCardShape;
  cssPrefix?: string;
}

/**
 * 預設配置
 */
export const DEFAULT_CARD_CONFIG: GxCardGlobalConfig = {
  defaultVariant: 'elevated',
  defaultLayout: 'grid',
  defaultShape: 'classic',
  cssPrefix: 'gx'
};

/**
 * 配置注入 Token
 */
export const GX_CARD_CONFIG = new InjectionToken<Partial<GxCardGlobalConfig>>(
  'GX_CARD_CONFIG'
);

/**
 * 簡化的卡片配置服務
 */
@Injectable({
  providedIn: 'root'
})
export class GxCardConfigService {
  private readonly userConfig = inject(GX_CARD_CONFIG, { optional: true });
  
  readonly config: GxCardGlobalConfig;
  
  constructor() {
    this.config = { ...DEFAULT_CARD_CONFIG, ...this.userConfig };
  }
  
  /**
   * 獲取 CSS 類別名稱
   */
  getCssClass(suffix: string): string {
    return `${this.config.cssPrefix || 'gx'}-${suffix}`;
  }
}
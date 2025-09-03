import { Provider } from '@angular/core';
import { GX_CARD_CONFIG, GxCardGlobalConfig } from './card-config.service';

/**
 * 提供 GxCard 全域配置的便利函數
 * 
 * @example
 * ```typescript
 * import { provideGxCardConfig } from '@sanring/gx-card';
 * 
 * // 在 main.ts 或 app.config.ts 中
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideGxCardConfig({
 *       defaultVariant: 'outlined',
 *       expandable: {
 *         animationDuration: 500,
 *         buttonText: {
 *           expand: '查看更多',
 *           collapse: '收起'
 *         }
 *       }
 *     })
 *   ]
 * });
 * ```
 */
export function provideGxCardConfig(config: Partial<GxCardGlobalConfig>): Provider {
  return {
    provide: GX_CARD_CONFIG,
    useValue: config
  };
}

/**
 * 多個配置來源的合併提供者
 * 當您需要從多個來源（如環境變數、遠端配置等）合併配置時使用
 */
export function provideGxCardConfigFactory(
  configFactory: () => Partial<GxCardGlobalConfig>
): Provider {
  return {
    provide: GX_CARD_CONFIG,
    useFactory: configFactory
  };
}

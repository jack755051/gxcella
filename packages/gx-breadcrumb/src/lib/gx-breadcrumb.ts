import { Component, computed, inject, input, output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxBreadcrumbSeparator, GxTheme, GxVariant, IGxBreadCrumb } from './model/gx-breadcrumb.type';
import { GxBreadcrumbContainer } from './breadcrumb-container/gx-breadcrumb-container';
import { GxBreadcrumbList } from './breadcrumb-list/gx-breadcrumb-list';
import { GxBreadcrumbItemV2 } from './breadcrumb-item-v2/gx-breadcrumb-item-v2';
import { GxBreadcrumbService } from './services/breadcrumb.services';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * GxBreadcrumb Component (新版組合式包裝組件)
 *
 * 支援兩種使用模式：
 * 1. **自動模式（推薦）** - 使用 `mode="auto"`，基於路由自動生成麵包屑
 * 2. **手動模式** - 使用 `mode="manual"` + `[data]` input，手動提供資料
 * 3. **自定義模式** - 使用 `mode="custom"`，完全自定義內容投影
 *
 * @example
 * <!-- 自動模式（從路由生成） -->
 * <gx-breadcrumb mode="auto" />
 *
 * @example
 * <!-- 手動模式 -->
 * <gx-breadcrumb mode="manual" [data]="breadcrumbs" />
 *
 * @example
 * <!-- 自定義模式 -->
 * <gx-breadcrumb mode="custom">
 *   <gx-breadcrumb-container>
 *     <gx-breadcrumb-list>
 *       <gx-breadcrumb-item-v2 label="首頁" link="/" />
 *       <gx-breadcrumb-item-v2 label="產品" [active]="true" />
 *     </gx-breadcrumb-list>
 *   </gx-breadcrumb-container>
 * </gx-breadcrumb>
 */
@Component({
  selector: 'gx-breadcrumb',
  standalone: true,
  imports: [
    CommonModule,
    GxBreadcrumbContainer,
    GxBreadcrumbList,
    GxBreadcrumbItemV2
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    @if (mode() === 'custom') {
      <!-- Custom 模式：完全自定義 -->
      <ng-content></ng-content>
    } @else {
      <!-- Auto 或 Manual 模式：使用組合式組件 -->
      <gx-breadcrumb-container [theme]="theme()" [variant]="variant()">
        <gx-breadcrumb-list [separator]="separator()">
          @for (item of displayData(); track item.label; let last = $last) {
            <gx-breadcrumb-item-v2
              [label]="item.label"
              [link]="item.link"
              [icon]="item.icon"
              [iconImg]="item.iconImg"
              [active]="last || item.active || false"
              [disabled]="item.disabled || false"
              [showIcon]="showIcon()"
              [separator]="separatorChar()"
              [showSeparator]="!last"
              (itemClick)="handleItemClick(item)"
            />
          }
        </gx-breadcrumb-list>
      </gx-breadcrumb-container>
    }
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class GxBreadcrumb {
  private breadcrumbService = inject(GxBreadcrumbService);

  /**
   * 使用模式
   * - auto: 從路由自動生成（預設）
   * - manual: 手動提供資料
   * - custom: 完全自定義（投影內容）
   */
  mode = input<'auto' | 'manual' | 'custom'>('auto');

  /**
   * 手動模式的資料（僅 mode="manual" 時使用）
   */
  data = input<IGxBreadCrumb[] | null>(null);

  /**
   * 主題配置
   */
  theme = input<GxTheme>('default');

  /**
   * 變體樣式
   */
  variant = input<GxVariant>('modern');

  /**
   * 分隔符類型
   */
  separator = input<GxBreadcrumbSeparator>(GxBreadcrumbSeparator.Slash);

  /**
   * 是否顯示圖標
   */
  showIcon = input<boolean>(false);

  /**
   * Root 麵包屑設定
   * - undefined: 使用 service 的 token/route 規則
   * - false: 不顯示 root
   * - IGxBreadCrumb: 自定義 root
   */
  rootCrumb = input<IGxBreadCrumb | false | undefined>(undefined);

  /**
   * 項目點擊事件
   */
  itemClick = output<IGxBreadCrumb>();

  /**
   * 自動模式的麵包屑資料（從 service 獲取）
   */
  private autoBreadcrumbs = toSignal(this.breadcrumbService.breadcrumbs$, {
    initialValue: []
  });

  /**
   * 分隔符字元
   */
  separatorChar = computed(() => {
    const sep = this.separator();
    const map: Record<GxBreadcrumbSeparator, string> = {
      [GxBreadcrumbSeparator.Slash]: '/',
      [GxBreadcrumbSeparator.Arrow]: '›',
      [GxBreadcrumbSeparator.Dot]: '·',
      [GxBreadcrumbSeparator.Hyphen]: '-'
    };
    return map[sep] ?? '/';
  });

  /**
   * 顯示的資料（根據模式決定）
   */
  displayData = computed(() => {
    const currentMode = this.mode();

    // Custom 模式不需要資料
    if (currentMode === 'custom') {
      return [];
    }

    // Manual 模式使用 data input
    if (currentMode === 'manual') {
      return this.mergeCrumbs(this.data() ?? []);
    }

    // Auto 模式使用 service 資料
    return this.mergeCrumbs(this.autoBreadcrumbs());
  });

  /**
   * 合併 Root 麵包屑
   */
  private mergeCrumbs(source: IGxBreadCrumb[]): IGxBreadCrumb[] {
    const root = this.rootCrumb();

    // undefined: 使用 service 的規則（已在 service 中處理）
    if (root === undefined) return source;

    // false: 不顯示 root
    if (!root || source.length <= 1) return source;

    // 檢查是否已經有 root
    const first = source[0];
    const alreadyHasRoot =
      first?.link === root.link ||
      (first?.label ?? '').toLowerCase() === (root.label ?? '').toLowerCase();

    return alreadyHasRoot ? source : [root, ...source];
  }

  /**
   * 處理項目點擊
   */
  handleItemClick(item: IGxBreadCrumb): void {
    this.itemClick.emit(item);
  }
}

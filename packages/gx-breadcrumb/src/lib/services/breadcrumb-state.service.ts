import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GxBreadcrumbService } from './breadcrumb.services';
import { IGxBreadCrumb } from '../model/gx-breadcrumb.type';

/**
 * BreadcrumbStateService
 *
 * 提供基於 Signal 的狀態管理，類似 TableService
 * 包裝原有的 GxBreadcrumbService，提供更現代的 Signal API
 */
@Injectable()
export class BreadcrumbStateService {
  private breadcrumbService = inject(GxBreadcrumbService);

  /**
   * 麵包屑列表 Signal（從 Observable 轉換）
   */
  readonly breadcrumbs: Signal<IGxBreadCrumb[]>;

  constructor() {
    // 將 Observable 轉換為 Signal
    this.breadcrumbs = toSignal(this.breadcrumbService.breadcrumbs$, {
      initialValue: []
    });
  }

  /**
   * 獲取當前麵包屑列表
   */
  getBreadcrumbs(): IGxBreadCrumb[] {
    return this.breadcrumbs();
  }

  /**
   * 獲取 Root 覆蓋設定
   */
  getRootOverride(): IGxBreadCrumb | false | null {
    return this.breadcrumbService.getCurrentRootOverride();
  }
}

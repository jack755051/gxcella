import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxMedia, IGxCardHeader } from '../model/card.type';
import { GxClickableDirective, GxClickableEvent } from '../directives/gx-clickable.directive';

@Component({
  selector: 'gx-card-header',
  standalone: true,
  imports: [CommonModule, GxClickableDirective],
  templateUrl: './gx-card-header.html',
  styleUrls: ['./gx-card-header.css', '../directives/gx-clickable.css']
})
export class GxCardHeader {
  /**
   * Header 資料（可選，也可用 ng-content）
   */
  data = input<IGxCardHeader | undefined>(undefined);

  /**
   * Avatar 圖片來源
   */
  avatar = input<GxMedia | undefined>(undefined);

  /**
   * 標題
   */
  title = input<string | undefined>(undefined);

  /**
   * 副標題
   */
  subtitle = input<string | undefined>(undefined);

  /**
   * 連結 URL
   */
  href = input<string | undefined>(undefined);

  /**
   * 連結目標
   */
  target = input<'_self' | '_blank' | undefined>(undefined);

  /**
   * Header 點擊控制
   */
  headerClickable = input<boolean | { avatar?: boolean; title?: boolean; subtitle?: boolean }>(false);

  /**
   * Header 子項點擊事件
   */
  headerItemClick = output<{ part: 'avatar'|'title'|'subtitle'; value: any; event: MouseEvent }>();

  /**
   * 合併後的 avatar 資料
   */
  get avatarData(): GxMedia | undefined {
    return this.avatar() ?? this.data()?.avatar;
  }

  /**
   * 合併後的 title
   */
  get titleText(): string | undefined {
    return this.title() ?? this.data()?.title;
  }

  /**
   * 合併後的 subtitle
   */
  get subtitleText(): string | undefined {
    return this.subtitle() ?? this.data()?.subtitle;
  }

  /**
   * 合併後的 href
   */
  get hrefUrl(): string | undefined {
    return this.href() ?? this.data()?.href;
  }

  /**
   * 合併後的 target
   */
  get targetType(): '_self' | '_blank' {
    return this.target() ?? this.data()?.target ?? '_self';
  }

  /**
   * 是否啟用指定部分的點擊
   */
  isHeaderClickEnabledFor(part: 'avatar'|'title'|'subtitle'): boolean {
    const cfg = this.headerClickable();
    if (typeof cfg === 'boolean') return cfg;
    return Boolean(cfg?.[part]);
  }

  /**
   * Avatar 點擊事件處理
   */
  onAvatarClick(event: GxClickableEvent<GxMedia>) {
    event.event.stopPropagation();
    this.emitHeaderItemClick('avatar', event.data, event.event);
  }

  /**
   * Title 點擊事件處理
   */
  onTitleClick(event: GxClickableEvent<string>) {
    event.event.stopPropagation();
    if (event.data) {
      this.emitHeaderItemClick('title', event.data, event.event);
    }
  }

  /**
   * Subtitle 點擊事件處理
   */
  onSubtitleClick(event: GxClickableEvent<string>) {
    event.event.stopPropagation();
    if (event.data) {
      this.emitHeaderItemClick('subtitle', event.data, event.event);
    }
  }

  /**
   * Header 容器點擊處理
   */
  onHeaderContainerClick(e: GxClickableEvent) {
    this.onHeaderClick(e.event);
  }

  /**
   * Header 點擊處理（用於 href 導向）
   */
  onHeaderClick(event: MouseEvent) {
    const href = this.hrefUrl;
    const target = this.targetType;
    if (!href) return;
    if (this.isInteractiveEvent(event)) return;
    event.stopPropagation();
    if (typeof window !== 'undefined') {
      try { window.open(href, target); } catch {}
    }
  }

  /**
   * 統一發送 header 子項點擊事件
   */
  private emitHeaderItemClick(part: 'avatar'|'title'|'subtitle', value: any, ev: MouseEvent) {
    this.headerItemClick.emit({ part, value, event: ev });
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

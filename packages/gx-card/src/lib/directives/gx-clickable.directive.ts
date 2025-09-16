import { Directive, ElementRef, HostListener, input, output, Renderer2, inject, OnChanges } from '@angular/core';

export interface GxClickableEvent<T = any> {
  data?: T;
  event: MouseEvent;
}

@Directive({
  selector: '[gxClickable]',
  standalone: true
})
export class GxClickableDirective<T = any> implements OnChanges {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  /**
   * 要傳遞的數據
   */
  gxClickableData = input<T>();

  /**
   * 是否禁用點擊
   */
  gxClickableDisabled = input<boolean>(false);

  /**
   * 是否顯示點擊樣式（cursor: pointer）
   */
  gxClickableShowCursor = input<boolean>(true);

  /**
   * 自定義樣式類別
   */
  gxClickableClass = input<string>('');

  /**
   * 預設型別樣式，會自動套用對應類別
   * - text -> gx-clickable-text
   * - avatar -> gx-clickable-avatar
   * - header -> gx-clickable-header
   */
  gxClickableType = input<'' | 'text' | 'avatar' | 'header'>('');

  /**
   * 點擊事件輸出
   */
  gxClick = output<GxClickableEvent<T>>();

  /**
   * Hover 樣式類別
   */
  gxClickableHoverClass = input<string>('gx-clickable-hover');

  constructor() {
    // 初始化樣式
    this.updateStyles();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.gxClickableDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // 停止事件冒泡，避免觸發父級事件
    event.stopPropagation();

    // 發送點擊事件
    this.gxClick.emit({
      data: this.gxClickableData(),
      event
    });
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.gxClickableDisabled() && this.gxClickableHoverClass()) {
      this.renderer.addClass(this.elementRef.nativeElement, this.gxClickableHoverClass());
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.gxClickableHoverClass()) {
      this.renderer.removeClass(this.elementRef.nativeElement, this.gxClickableHoverClass());
    }
  }

  private updateStyles() {
    const element = this.elementRef.nativeElement;

    // 基礎可點擊類別（提供一致的焦點與游標行為）
    this.renderer.addClass(element, 'gx-clickable');

    // 設置 cursor 樣式
    if (this.gxClickableShowCursor() && !this.gxClickableDisabled()) {
      this.renderer.setStyle(element, 'cursor', 'pointer');
    } else {
      this.renderer.removeStyle(element, 'cursor');
    }

    // 先移除已知的型別類別避免殘留
    ['gx-clickable-text', 'gx-clickable-avatar', 'gx-clickable-header']
      .forEach(cls => this.renderer.removeClass(element, cls));

    // 套用型別類別（如有）
    const type = this.gxClickableType();
    if (type) {
      const typeClass = type === 'text' ? 'gx-clickable-text'
                       : type === 'avatar' ? 'gx-clickable-avatar'
                       : type === 'header' ? 'gx-clickable-header'
                       : '';
      if (typeClass) this.renderer.addClass(element, typeClass);
    }

    // 保留對舊 API 的支援：自定義類別
    if (this.gxClickableClass()) this.renderer.addClass(element, this.gxClickableClass());

    // 設置過渡效果
    this.renderer.setStyle(element, 'transition', 'all 0.2s ease');
  }

  ngOnChanges() {
    this.updateStyles();
  }
}

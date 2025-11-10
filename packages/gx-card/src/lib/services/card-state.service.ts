import { Injectable, Signal, computed, signal } from '@angular/core';
import { GxCardVariant, GxCardLayout, GxCardShape, ALLOWED } from '../model/card.type';

/**
 * CardStateService
 *
 * 獨立的狀態管理服務，類似 TableService
 * 負責計算 variant、layout、shape 的有效值
 */
@Injectable()
export class CardStateService {
  // 狀態 Signals
  private _variant = signal<GxCardVariant>('elevated');
  private _layout = signal<GxCardLayout>('grid');
  private _shape = signal<GxCardShape>('classic');

  // 預設值
  private _defaultVariant = signal<GxCardVariant>('elevated');
  private _defaultLayout = signal<GxCardLayout>('grid');
  private _defaultShape = signal<GxCardShape>('classic');

  // 群組覆蓋值
  private _groupVariant = signal<GxCardVariant | undefined>(undefined);
  private _groupLayout = signal<GxCardLayout | undefined>(undefined);

  /**
   * 有效的 variant（考慮群組和預設值）
   */
  readonly effectiveVariant: Signal<GxCardVariant> = computed(() =>
    this._variant() ?? this._groupVariant() ?? this._defaultVariant()
  );

  /**
   * 有效的 layout（考慮群組和預設值）
   */
  readonly effectiveLayout: Signal<GxCardLayout> = computed(() =>
    this._layout() ?? this._groupLayout() ?? this._defaultLayout()
  );

  /**
   * 解析後的 shape（根據 layout 限制）
   */
  readonly resolvedShape: Signal<GxCardShape> = computed(() => {
    const layout = this.effectiveLayout();
    const wanted = this._shape();
    const allowed = ALLOWED[layout];
    return (allowed as readonly string[]).includes(wanted)
      ? wanted
      : (allowed[0] as GxCardShape);
  });

  /**
   * 設定 variant
   */
  setVariant(variant: GxCardVariant): void {
    this._variant.set(variant);
  }

  /**
   * 設定 layout
   */
  setLayout(layout: GxCardLayout): void {
    this._layout.set(layout);
  }

  /**
   * 設定 shape
   */
  setShape(shape: GxCardShape): void {
    this._shape.set(shape);
  }

  /**
   * 設定預設 variant
   */
  setDefaultVariant(variant: GxCardVariant): void {
    this._defaultVariant.set(variant);
  }

  /**
   * 設定預設 layout
   */
  setDefaultLayout(layout: GxCardLayout): void {
    this._defaultLayout.set(layout);
  }

  /**
   * 設定預設 shape
   */
  setDefaultShape(shape: GxCardShape): void {
    this._defaultShape.set(shape);
  }

  /**
   * 設定群組 variant
   */
  setGroupVariant(variant: GxCardVariant | undefined): void {
    this._groupVariant.set(variant);
  }

  /**
   * 設定群組 layout
   */
  setGroupLayout(layout: GxCardLayout | undefined): void {
    this._groupLayout.set(layout);
  }

  /**
   * 計算 CSS 類別
   */
  computeClasses(baseClass: string): string[] {
    return [
      baseClass,
      `${baseClass}--variant-${this.effectiveVariant()}`,
      `${baseClass}--shape-${this.resolvedShape()}`
    ];
  }
}

// 基於 Angular CDK 的增強版排序列表指令
import { 
  Directive, 
  ElementRef, 
  inject, 
  input, 
  output, 
  OnInit, 
  OnDestroy,
  AfterViewInit
} from "@angular/core";

// 條件匯入 CDK drag-drop (因為是 optional dependency)
let CdkDropList: any;
let moveItemInArray: any;

try {
  const dragDropModule = require('@angular/cdk/drag-drop');
  CdkDropList = dragDropModule.CdkDropList;
  moveItemInArray = dragDropModule.moveItemInArray;
} catch (e) {
  // CDK 不可用時的錯誤處理
  console.warn('@angular/cdk/drag-drop is not available. SortableCdkDirective requires @angular/cdk to be installed.');
}

export interface GxSortableItem {
  id: string | number;
  [key: string]: any;
}

export interface GxSortableConfig {
  /** 是否顯示拖拽把手 */
  showHandle?: boolean;
  /** 拖拽把手的圖示 */
  handleIcon?: string;
  /** 是否啟用拖拽 */
  disabled?: boolean;
  /** 拖拽時的動畫持續時間(ms) */
  animationDuration?: number;
  /** 排序方向 */
  orientation?: 'vertical' | 'horizontal';
  /** 進入拖拽區域時的樣式類別 */
  enterPredicate?: (drag: any, drop: any) => boolean;
}

@Directive({
  selector: '[gxSortableCdk]',
  standalone: true
})
export class SortableCdkDirective implements OnInit, AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private cdkDropList: any;

  /** 必須提供的資料陣列，每個項目需要有 id */
  sortableItems = input.required<GxSortableItem[]>();
  
  /** 設定選項 */
  config = input<GxSortableConfig>({});
  
  /** 是否啟用排序 */
  disabled = input(false);
  
  /** 排序方向 */
  orientation = input<'vertical' | 'horizontal'>('vertical');
  
  /** 連接到其他拖放清單 */
  connectedTo = input<string[]>([]);
  
  /** 排序事件 */
  sorted = output<{
    previousIndex: number;
    currentIndex: number;
    items: GxSortableItem[];
    item: GxSortableItem;
  }>();
  
  /** 項目進入時的事件 */
  itemEntered = output<{
    item: GxSortableItem;
    container: any;
    currentIndex: number;
  }>();
  
  /** 項目離開時的事件 */
  itemExited = output<{
    item: GxSortableItem;
    container: any;
  }>();

  ngOnInit() {
    // 檢查 CDK 是否可用
    if (!CdkDropList) {
      console.error('SortableCdkDirective requires @angular/cdk/drag-drop to be installed');
      return;
    }

    // 創建 CdkDropList 實例
    try {
      this.cdkDropList = new CdkDropList(this.el, null as any, null as any, null as any, null as any, null as any, null as any);
    } catch (e) {
      console.error('Failed to initialize CdkDropList:', e);
      return;
    }

    // 設定 CdkDropList 的屬性
    if (this.cdkDropList) {
      this.cdkDropList.disabled = this.disabled();
      this.cdkDropList.orientation = this.orientation();
      this.cdkDropList.connectedTo = this.connectedTo();
      
      // 設定 data 屬性用於識別
      this.cdkDropList.data = this.sortableItems();
      
      // 監聽 drop 事件
      this.cdkDropList.dropped.subscribe((event: any) => {
        this.handleDrop(event);
      });
      
      // 監聽 entered 事件
      this.cdkDropList.entered.subscribe((event: any) => {
        this.itemEntered.emit({
          item: event.item.data,
          container: event.container,
          currentIndex: event.currentIndex
        });
      });
      
      // 監聽 exited 事件
      this.cdkDropList.exited.subscribe((event: any) => {
        this.itemExited.emit({
          item: event.item.data,
          container: event.container
        });
      });
    }
  }

  ngAfterViewInit() {
    this.setupDragElements();
  }

  ngOnDestroy() {
    // CDK 會自動清理
  }

  private setupDragElements() {
    // 為每個子元素添加 CdkDrag 行為
    const container = this.el.nativeElement;
    const items = Array.from(container.children) as HTMLElement[];
    
    items.forEach((element, index) => {
      // 如果元素還沒有 CdkDrag，則添加
      if (!element.hasAttribute('cdkDrag')) {
        element.setAttribute('cdkDrag', '');
        
        // 設定拖拽資料
        const itemData = this.sortableItems()[index];
        if (itemData) {
          (element as any).__cdkDragData = itemData;
        }
        
        // 如果需要拖拽把手
        const config = this.config();
        if (config.showHandle) {
          this.addDragHandle(element, config);
        }
      }
    });
  }
  
  private addDragHandle(element: HTMLElement, config: GxSortableConfig) {
    // 檢查是否已經有把手
    if (element.querySelector('.gx-drag-handle')) {
      return;
    }
    
    // 創建拖拽把手
    const handle = document.createElement('div');
    handle.className = 'gx-drag-handle';
    handle.setAttribute('cdkDragHandle', '');
    handle.style.cssText = `
      cursor: grab;
      padding: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #666;
      font-size: 16px;
    `;
    
    // 設定圖示
    const icon = config.handleIcon || '⋮⋮';
    handle.innerHTML = icon;
    
    // 添加到元素開頭
    element.insertBefore(handle, element.firstChild);
    
    // 添加樣式
    if (!element.style.position) {
      element.style.position = 'relative';
    }
  }

  private handleDrop(event: any) {
    if (event.previousContainer === event.container) {
      // 同一個容器內的排序
      const items = [...this.sortableItems()];
      moveItemInArray(items, event.previousIndex, event.currentIndex);
      
      this.sorted.emit({
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
        items,
        item: items[event.currentIndex]
      });
    } else {
      // 跨容器的移動 (需要在父組件處理)
      this.sorted.emit({
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
        items: this.sortableItems(),
        item: event.item.data
      });
    }
  }
  
  /**
   * 更新項目資料
   * @param items 新的項目陣列
   */
  updateItems(items: GxSortableItem[]) {
    this.cdkDropList.data = items;
    // 需要重新設定拖拽元素的資料
    setTimeout(() => this.setupDragElements(), 0);
  }
  
  /**
   * 取得指定 ID 的項目索引
   * @param id 項目 ID
   */
  getItemIndex(id: string | number): number {
    return this.sortableItems().findIndex(item => item.id === id);
  }
  
  /**
   * 取得指定索引的項目
   * @param index 索引
   */
  getItem(index: number): GxSortableItem | undefined {
    return this.sortableItems()[index];
  }
}
// 排序列表指令
import {AfterViewInit, Directive, ElementRef, inject, input, output, effect, OnDestroy, Renderer2} from "@angular/core";
import {GxDragService} from "../core";

@Directive({
    selector: '[gxSortable]',
    standalone: true
})
export class SortableDirective implements AfterViewInit, OnDestroy {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    /** Inputs（外部可設定的行為） */
    sortableItems = input.required<any[]>();
    sortableEnabled = input(true);
    sortableHandle = input<string>('');  // 拖曳把手選擇器

    /** Outputs（事件）*/
    sorted = output<{ previousIndex: number; currentIndex: number; items: any[] }>();

    private draggedElement: HTMLElement | null = null;
    private draggedIndex: number = -1;
    private placeholder: HTMLElement | null = null;
    private unlistenFunctions: Array<() => void> = [];

    constructor() {
        // 監聽 sortableItems 變化，重新設置
        effect(() => {
            const items = this.sortableItems();
            if (items) {
                // 延遲重新設置，確保 DOM 已更新
                setTimeout(() => this.setupSortable(), 0);
            }
        });
    }

    ngAfterViewInit() {
        this.setupSortable();
    }

    ngOnDestroy() {
        this.removeAllEventListeners();
    }

    private removeAllEventListeners() {
        this.unlistenFunctions.forEach(unlisten => unlisten());
        this.unlistenFunctions = [];
    }

    private setupSortable() {
        // 先清除舊的事件監聽器
        this.removeAllEventListeners();
        
        const container = this.el.nativeElement;
        const items = Array.from(container.children) as HTMLElement[];

        items.forEach((element: HTMLElement, index: number) => {
            element.draggable = this.sortableEnabled();

            // 設置拖曳把手
            if (this.sortableHandle()) {
                const handle = element.querySelector(this.sortableHandle()) as HTMLElement;
                if (handle) {
                    this.renderer.setStyle(handle, 'cursor', 'move');
                    element.draggable = false;

                    const mousedownUnlisten = this.renderer.listen(handle, 'mousedown', () => {
                        element.draggable = true;
                    });

                    const mouseupUnlisten = this.renderer.listen(handle, 'mouseup', () => {
                        element.draggable = false;
                    });

                    this.unlistenFunctions.push(mousedownUnlisten, mouseupUnlisten);
                }
            }

            const dragStartListener = (e: DragEvent) => {
                this.handleDragStart(e, element, index);
            };
            const dragOverListener = (e: DragEvent) => {
                this.handleDragOver(e, element);
            };
            const dropListener = (e: DragEvent) => {
                this.handleDrop(e);
            };
            const dragEndListener = () => {
                this.handleDragEnd();
            };

            // 使用 Renderer2 添加事件監聽器
            const dragStartUnlisten = this.renderer.listen(element, 'dragstart', dragStartListener);
            const dragOverUnlisten = this.renderer.listen(element, 'dragover', dragOverListener);
            const dropUnlisten = this.renderer.listen(element, 'drop', dropListener);
            const dragEndUnlisten = this.renderer.listen(element, 'dragend', dragEndListener);

            // 記錄解除監聽函數以便後續清理
            this.unlistenFunctions.push(
                dragStartUnlisten,
                dragOverUnlisten,
                dropUnlisten,
                dragEndUnlisten
            );
        });
    }

    private handleDragStart(e: DragEvent, element: HTMLElement, index: number) {
        this.draggedElement = element;
        this.draggedIndex = index;
        element.classList.add('gx-sortable-dragging');

        // 創建佔位符，但不要克隆整個元素，避免複製 Angular 的追蹤屬性
        this.placeholder = this.renderer.createElement('div');
        this.renderer.addClass(this.placeholder, 'gx-sortable-placeholder');
        this.renderer.setStyle(this.placeholder, 'height', `${element.offsetHeight}px`);
        this.renderer.setStyle(this.placeholder, 'width', `${element.offsetWidth}px`);
        this.renderer.setStyle(this.placeholder, 'opacity', '0.4');
        this.renderer.setStyle(this.placeholder, 'border', '2px dashed #ccc');
        this.renderer.setStyle(this.placeholder, 'background', 'rgba(0, 0, 0, 0.05)');
        this.renderer.setStyle(this.placeholder, 'border-radius', '4px');
        // 添加唯一識別，避免與 Angular 追蹤衝突
        this.renderer.setAttribute(this.placeholder, 'data-placeholder', 'true');
    }

    private handleDragOver(e: DragEvent, overElement: HTMLElement) {
        e.preventDefault();
        if (!this.draggedElement || !this.placeholder) return;

        const container = this.el.nativeElement;
        const afterElement = this.getDragAfterElement(container, e.clientY);

        if (afterElement == null) {
            container.appendChild(this.placeholder);
        } else {
            container.insertBefore(this.placeholder, afterElement);
        }
    }

    private handleDrop(e: DragEvent) {
        e.preventDefault();
        if (!this.draggedElement || !this.placeholder) return;

        const container = this.el.nativeElement;
        const allChildren = Array.from(container.children);
        
        // 找到 placeholder 的位置，但要排除 placeholder 本身來計算真實索引
        const placeholderIndex = allChildren.indexOf(this.placeholder);
        
        // 計算真實的新索引（排除 placeholder）
        const realChildren = allChildren.filter(child => child !== this.placeholder);
        let newIndex = placeholderIndex;
        
        // 如果 placeholder 在最後，新索引就是實際子元素的長度
        if (placeholderIndex >= realChildren.length) {
            newIndex = realChildren.length;
        } else {
            // 否則找到 placeholder 前面有多少個真實元素
            newIndex = allChildren.slice(0, placeholderIndex)
                .filter(child => child !== this.placeholder).length;
        }

        if (newIndex !== this.draggedIndex) {
            const items = [...this.sortableItems()];
            const [movedItem] = items.splice(this.draggedIndex, 1);
            items.splice(newIndex, 0, movedItem);

            this.sorted.emit({
                previousIndex: this.draggedIndex,
                currentIndex: newIndex,
                items
            });
        }
    }

    private handleDragEnd() {
        if (this.draggedElement) {
            this.draggedElement.classList.remove('gx-sortable-dragging');
        }
        if (this.placeholder && this.placeholder.parentNode) {
            this.renderer.removeChild(this.placeholder.parentNode, this.placeholder);
        }

        this.draggedElement = null;
        this.draggedIndex = -1;
        this.placeholder = null;
    }

    private getDragAfterElement(container: HTMLElement, y: number): Element | null {
        const draggableElements = Array.from(container.children).filter(
            child => child !== this.draggedElement && 
                    child !== this.placeholder &&
                    !child.hasAttribute('data-placeholder')
        );

        return draggableElements.reduce<{ offset: number; element: Element | null }>(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            { offset: Number.NEGATIVE_INFINITY, element: null }
        ).element;
    }
}
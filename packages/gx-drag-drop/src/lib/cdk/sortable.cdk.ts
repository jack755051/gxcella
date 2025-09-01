// 排序列表指令
import {AfterViewInit, Directive, ElementRef, inject, input, output} from "@angular/core";
import {GxDragService} from "../core";

@Directive({
    selector: '[gxSortable]',
    standalone: true
})
export class SortableDirective implements AfterViewInit {
    private el = inject(ElementRef);

    /** Inputs（外部可設定的行為） */
    sortableItems = input.required<any[]>();
    sortableEnabled = input(true);
    sortableHandle = input<string>('');  // 拖曳把手選擇器

    /** Outputs（事件）*/
    sorted = output<{ previousIndex: number; currentIndex: number; items: any[] }>();

    private draggedElement: HTMLElement | null = null;
    private draggedIndex: number = -1;
    private placeholder: HTMLElement | null = null;

    ngAfterViewInit() {
        this.setupSortable();
    }

    private setupSortable() {
        const container = this.el.nativeElement;
        const items = container.children;

        Array.from(items).forEach((item: Element, index: number) => {
            const element = item as HTMLElement;
            element.draggable = this.sortableEnabled();

            // 設置拖曳把手
            if (this.sortableHandle()) {
                const handle = element.querySelector(this.sortableHandle()) as HTMLElement;
                if (handle) {
                    handle.style.cursor = 'move';
                    element.draggable = false;

                    handle.addEventListener('mousedown', () => {
                        element.draggable = true;
                    });

                    handle.addEventListener('mouseup', () => {
                        element.draggable = false;
                    });
                }
            }

            element.addEventListener('dragstart', (e: DragEvent) => {
                this.handleDragStart(e, element, index);
            });

            element.addEventListener('dragover', (e: DragEvent) => {
                this.handleDragOver(e, element);
            });

            element.addEventListener('drop', (e: DragEvent) => {
                this.handleDrop(e);
            });

            element.addEventListener('dragend', () => {
                this.handleDragEnd();
            });
        });
    }

    private handleDragStart(e: DragEvent, element: HTMLElement, index: number) {
        this.draggedElement = element;
        this.draggedIndex = index;
        element.classList.add('gx-sortable-dragging');

        // 創建佔位符
        this.placeholder = element.cloneNode(true) as HTMLElement;
        this.placeholder.classList.add('gx-sortable-placeholder');
        this.placeholder.style.opacity = '0.4';
        this.placeholder.style.border = '2px dashed #ccc';
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
        const allItems = Array.from(container.children);
        const newIndex = allItems.indexOf(this.placeholder);

        if (newIndex !== -1 && newIndex !== this.draggedIndex) {
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
            this.placeholder.parentNode.removeChild(this.placeholder);
        }

        this.draggedElement = null;
        this.draggedIndex = -1;
        this.placeholder = null;
    }

    private getDragAfterElement(container: HTMLElement, y: number): Element | null {
        const draggableElements = Array.from(container.children).filter(
            child => child !== this.draggedElement && child !== this.placeholder
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
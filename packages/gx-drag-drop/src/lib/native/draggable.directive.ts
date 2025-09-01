// 可拖拽指令
import {Directive, effect, ElementRef, HostBinding, HostListener, inject, input, output, Renderer2, OnDestroy} from "@angular/core";
import {DragData, GxDragService} from "../core";

@Directive({
    selector: '[gxDraggable]',
    standalone: true
})
export class DraggableDirective implements OnDestroy {
    private el = inject(ElementRef);
    private dragService = inject(GxDragService);
    private renderer = inject(Renderer2);
    private unlistenFunctions: Array<() => void> = [];

    /** Inputs（外部可設定的行為） */
    dragData = input.required<any>();
    dragType = input<string>('default');
    dragEnabled = input(true);
    dragEffect = input<'copy' | 'move' | 'link'>('move');
    dragHandle = input<string>('');  // CSS selector for drag handle

    /** Outputs（事件）*/
    dragStart = output<DragEvent>();
    dragEnd = output<DragEvent>();

    /** HostBinding：同步宿主屬性/樣式 */
    @HostBinding('draggable')
    get draggable() { return this.dragEnabled(); }
    @HostBinding('style.cursor')
    get cursor() { return this.dragEnabled() ? 'move' : 'default'; }

    constructor() {
        // 如果有指定拖曳把手，設置事件監聽
        effect(() => {
            const handle = this.dragHandle();
            // 先清理舊的事件監聽器
            this.cleanupEventListeners();
            if (handle) {
                this.setupDragHandle(handle);
            }
        });
    }

    ngOnDestroy() {
        this.cleanupEventListeners();
    }

    private cleanupEventListeners() {
        this.unlistenFunctions.forEach(unlisten => unlisten());
        this.unlistenFunctions = [];
    }

    private setupDragHandle(selector: string) {
        const element = this.el.nativeElement;
        const handle = element.querySelector(selector);

        if (handle) {
            // 只有把手區域可以拖曳
            element.draggable = false;
            this.renderer.setStyle(handle, 'cursor', 'move');

            const mousedownUnlisten = this.renderer.listen(handle, 'mousedown', () => {
                element.draggable = this.dragEnabled();
            });

            const mouseupUnlisten = this.renderer.listen(handle, 'mouseup', () => {
                element.draggable = false;
            });

            this.unlistenFunctions.push(mousedownUnlisten, mouseupUnlisten);
        }
    }

    /**監聽 dragstart*/
    @HostListener('dragstart', ['$event'])
    onDragStart(event: DragEvent) {
        if (!this.dragEnabled()) {
            event.preventDefault();
            return;
        }

        const dragData: DragData = {
            type: this.dragType(),
            data: this.dragData(),
            effectAllowed: this.dragEffect()
        };

        this.dragService.startDrag(dragData, this.el.nativeElement);

        // 設置拖曳效果
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = this.dragEffect();
            event.dataTransfer.setData('text/plain', JSON.stringify(dragData));

            // 添加拖曳時的樣式
            this.el.nativeElement.classList.add('gx-dragging');
        }

        this.dragStart.emit(event);
    }
    /**監聽 dragend*/
    @HostListener('dragend', ['$event'])
    onDragEnd(event: DragEvent) {
        this.dragService.endDrag();
        this.el.nativeElement.classList.remove('gx-dragging');
        this.dragEnd.emit(event);
    }
}
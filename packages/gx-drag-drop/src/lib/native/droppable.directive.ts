// 可放置指令

import {
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    inject,
    input,
    OnDestroy,
    OnInit,
    output
} from "@angular/core";
import {GxDragService} from "../core";

@Directive({
    selector: '[gxDroppable]',
    standalone: true
})
export class DroppableDirective implements OnInit, OnDestroy {
    private el = inject(ElementRef);
    private dragService = inject(GxDragService);
    private zoneId = `drop-zone-${Math.random().toString(36).substr(2, 9)}`;

    /** Inputs（外部可設定的行為） */
    acceptTypes = input<string[]>(['*']);  // 接受的拖曳類型
    dropEnabled = input(true);
    dropEffect = input<'copy' | 'move' | 'link'>('move');

    /** Outputs（事件）*/
    dropped = output<{ event: DragEvent; data: any }>();
    dragEnter = output<DragEvent>();
    dragLeave = output<DragEvent>();
    dragOver = output<DragEvent>();

    /** HostBinding：同步宿主屬性/樣式 */
    @HostBinding('class.gx-drop-active')
    dropActive = false;
    @HostBinding('class.gx-drop-valid')
    canDropHere = false;

    ngOnInit() {
        this.dragService.registerDropZone(this.zoneId, this.acceptTypes());
    }
    ngOnDestroy() {
        this.dragService.unregisterDropZone(this.zoneId);
    }

    @HostListener('dragenter', ['$event'])
    onDragEnter(event: DragEvent) {
        if (!this.dropEnabled()) return;

        event.preventDefault();
        this.dropActive = true;
        this.canDropHere = this.dragService.canDrop(this.zoneId);

        if (this.canDropHere) {
            this.el.nativeElement.classList.add('gx-drop-hover');
        }

        this.dragEnter.emit(event);
    }

    @HostListener('dragover', ['$event'])
    onDragOver(event: DragEvent) {
        if (!this.dropEnabled() || !this.dragService.canDrop(this.zoneId)) {
            return;
        }

        event.preventDefault();
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = this.dropEffect();
        }

        this.dragOver.emit(event);
    }

    @HostListener('dragleave', ['$event'])
    onDragLeave(event: DragEvent) {
        // 確保是真的離開了這個元素
        const rect = this.el.nativeElement.getBoundingClientRect();
        const x = event.clientX;
        const y = event.clientY;

        if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
            this.dropActive = false;
            this.canDropHere = false;
            this.el.nativeElement.classList.remove('gx-drop-hover');
            this.dragLeave.emit(event);
        }
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();

        this.dropActive = false;
        this.canDropHere = false;
        this.el.nativeElement.classList.remove('gx-drop-hover');

        if (!this.dropEnabled() || !this.dragService.canDrop(this.zoneId)) {
            return;
        }

        const dragData = this.dragService.getDragData();
        if (dragData) {
            this.dropped.emit({ event, data: dragData });
        }

        // 處理檔案拖放
        if (event.dataTransfer?.files.length) {
            const files = Array.from(event.dataTransfer.files);
            this.dropped.emit({
                event,
                data: { type: 'file', data: files }
            });
        }
    }

}
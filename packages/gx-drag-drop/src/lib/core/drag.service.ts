import { Injectable, signal } from '@angular/core';
import {DragData} from "./types";

@Injectable({ providedIn: 'root' })
export class GxDragService{
    private dragData = signal<DragData | null>(null);
    private dragElement = signal<HTMLElement | null>(null);
    private dropZones = new Map<string, Set<string>>();
    // 公開的唯讀狀態
    readonly isDragging = signal(false);
    readonly currentDragData = this.dragData.asReadonly();
    readonly currentDragElement = this.dragElement.asReadonly();

    startDrag(data:DragData, element?: HTMLElement):void{
        this.dragData.set(data);
        this.dragElement.set(element || null);
        this.isDragging.set(true);
    }

    endDrag():void{
        this.dragData.set(null);
        this.dragElement.set(null);
        this.isDragging.set(false);
    }

    getDragData(): DragData | null {
        return this.dragData();
    }
    /** 註冊可放置區域*/
    registerDropZone(zoneId: string, acceptedTypes: string[]) {
        this.dropZones.set(zoneId, new Set(acceptedTypes));
    }
    /** 取消註冊可放置區域*/
    unregisterDropZone(zoneId: string) {
        this.dropZones.delete(zoneId);
    }
    canDrop(zoneId: string): boolean {
        const data = this.dragData();
        if (!data) return false;

        const acceptedTypes = this.dropZones.get(zoneId);
        if (!acceptedTypes) return false;

        return acceptedTypes.has(data.type) || acceptedTypes.has('*');
    }
}
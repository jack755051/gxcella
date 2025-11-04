import {Component, EventEmitter, Input, Output, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {GxVariant, IGxBreadCrumb} from "../model/gx-breadcrumb.type";

/**
 * GxBreadcrumbItem Component
 *
 * 麵包屑項目組件，支援兩種圖標方式：
 * 1. iconImg - Lucide 圖標（需要安裝 lucide-angular）
 * 2. icon - 文字/Emoji 圖標（無需額外依賴）
 */
@Component({
    selector: 'gx-breadcrumb-item',
    standalone: true,
    imports: [CommonModule, RouterLink],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // 允許 lucide-icon 元素（當用戶安裝 lucide-angular 時）
    templateUrl: 'gx-breadcrumb-item.html',
    styleUrls: ['gx-breadcrumb-item.css'],
})
export class GxBreadcrumbItem {
    @Input({ required: true }) item!: IGxBreadCrumb;
    @Input() isLast = false;
    @Input() showIcon = false;
    @Input() variant: GxVariant = 'modern';
    @Output() itemClick = new EventEmitter<IGxBreadCrumb>();

    onClick(e: MouseEvent) {
        if (this.item.disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.itemClick.emit(this.item);
    }

    isExternal(link?: string) {
        return !!link && /^(https?:)?\/\//.test(link);
    }

    get isActive() {
        return this.isLast || !!this.item.active;
    }

}
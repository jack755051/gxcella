import { Component, input, output, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxIntent } from '../shared/model/design-tokens';
import { GxTagSize } from './model/tag.types';

/**
 * GxTag 組件 - 獨立實現
 *
 * 用於顯示標籤、徽章、狀態標記等
 * 不再依賴 GxButton，完全獨立的實現
 */
@Component({
    selector: 'gx-tag',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'gx-tag.html',
    styleUrls: [
        '../shared/styles/intent-colors.css',
        'gx-tag.css'
    ]
})
export class GxTag {
    /**
     * 語意顏色
     */
    intent = input<GxIntent>('info');

    /**
     * 是否可移除
     */
    removable = input<boolean>(false);

    /**
     * 是否禁用
     */
    disabled = input<boolean>(false);

    /**
     * 尺寸
     */
    size = input<GxTagSize>('md');

    /**
     * 是否可點擊
     */
    clickable = input<boolean>(false);

    /**
     * 點擊事件（當 Tag 可點擊時）
     */
    onClick = output<MouseEvent>();

    /**
     * 移除事件
     */
    remove = output<void>();

    /**
     * 綁定 intent 到 host element，用於 CSS 樣式
     */
    @HostBinding('attr.data-intent')
    get intentAttr() {
        return this.intent();
    }

    /**
     * 綁定 disabled 狀態到 host element
     */
    @HostBinding('attr.data-disabled')
    get disabledAttr() {
        return this.disabled() ? 'true' : null;
    }

    /**
     * 綁定 size 到 host element
     */
    @HostBinding('attr.data-size')
    get sizeAttr() {
        return this.size();
    }

    /**
     * 處理 Tag 點擊
     */
    handleClick(event: MouseEvent) {
        if (!this.disabled() && this.clickable()) {
            this.onClick.emit(event);
        }
    }

    /**
     * 處理移除按鈕點擊
     */
    handleRemove(event: MouseEvent) {
        event.stopPropagation();
        if (!this.disabled()) {
            this.remove.emit();
        }
    }
}

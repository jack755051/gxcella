import { Component, computed, input, output, model, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
    GxSelectIntent,
    GxSelectVariant,
    GxSelectSize,
    GxSelectOption,
    GxSelectNullOption,
    GxSelectStyle
} from './model/select.types';

@Component({
    selector: 'gx-select',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: 'gx-select.html',
    styleUrls: [
        '../shared/styles/intent-colors.css',
        'gx-select.css'
    ]
})
export class GxSelect<T = any> {
    // ========== 資料綁定 ==========
    /** 當前選中的值 (雙向綁定) */
    value = model<T | null>(null);

    /** 選項列表 */
    options = input.required<GxSelectOption<T>[]>();

    // ========== 空選項（Placeholder）配置 ==========
    /** 是否顯示空選項 */
    showNullOption = input<boolean>(false);

    /** 空選項配置 */
    nullOption = input<GxSelectNullOption>({
        label: '請選擇',
        disabled: true,
        hidden: false
    });

    // ========== 外觀（語意）==========
    /** Intent 語義色彩 */
    intent = input<GxSelectIntent>('info');

    /** Variant 樣式變體 */
    variant = input<GxSelectVariant>('outline');

    /** Size 尺寸 */
    size = input<GxSelectSize>('md');

    /** 是否禁用 */
    disabled = input<boolean>(false);

    // ========== 外觀（細節）==========
    /** 樣式 Token */
    styleTokens = input<GxSelectStyle>({
        px: 12,
        py: 8,
        radius: 8
    });

    /** 欄位 ID */
    id = input<string | undefined>(undefined);

    /** 欄位名稱 */
    name = input<string | undefined>(undefined);

    /** Placeholder 文字（當沒有選中值時顯示） */
    placeholder = input<string | undefined>(undefined);

    // ========== 事件 ==========
    /** 值變更事件 */
    valueChange = output<T | null>();

    // ========== 內部狀態 ==========
    /** 內部值（用於 select 元素綁定） */
    protected internalValue = computed(() => {
        const val = this.value();
        // 將 null 轉換為空字串，以便 select 元素正確顯示
        return val === null || val === undefined ? '' : String(val);
    });

    /** 計算出的空選項配置 */
    protected computedNullOption = computed(() => {
        const defaults: GxSelectNullOption = {
            label: '請選擇',
            disabled: true,
            hidden: false
        };
        return { ...defaults, ...this.nullOption() };
    });

    /**
     * 處理選擇變更
     */
    protected onSelectChange(event: Event): void {
        if (this.disabled()) return;

        const target = event.target as HTMLSelectElement;
        const rawValue = target.value;

        // 空字串轉為 null
        if (rawValue === '') {
            this.value.set(null);
            this.valueChange.emit(null);
            return;
        }

        // 從 options 中找到對應的值
        const selectedOption = this.options().find(opt => String(opt.value) === rawValue);
        if (selectedOption) {
            this.value.set(selectedOption.value);
            this.valueChange.emit(selectedOption.value);
        }
    }

    /**
     * 追踪選項變化
     */
    protected trackByValue(_index: number, option: GxSelectOption<T>): T {
        return option.value;
    }
}

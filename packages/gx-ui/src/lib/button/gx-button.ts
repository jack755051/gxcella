import {Component, computed, input, output} from "@angular/core";
import {GxButtonIntent, GxButtonStyle, GxButtonVariant} from "./model/button.types";
import {GxAction} from "../shared/model/action.model";

@Component({
    selector:'gx-button',
    standalone:true,
    imports:[],
    templateUrl:'gx-button.html',
    styleUrls:['gx-button.css'],
})
export class GxButton {
    // 行為導向
    action = input<GxAction | undefined>(undefined);
    // 事件導向
    pressed = output<MouseEvent>();
    // 外觀（語意）
    intent  = input<GxButtonIntent>('info');
    variant = input<GxButtonVariant>('filled');
    disabled = input<boolean>(false);
    // 外觀（細節）
    styleTokens = input<GxButtonStyle>({ px: 12, py: 8, radius: 8 });
    tooltip   = input<string | undefined>(undefined);   // 滑鼠 hover 顯示
    needsAriaLabel = input<boolean>(false);             // 若內容沒有可見文字時設 true

    /** 單一資訊來源：是否停用 */
    readonly isDisabled = computed(
        () => !!this.disabled() || !!this.action()?.disabled
    );
    /** 計算出的原生工具提示（title） */
    readonly computedTitle = computed<string | null>(() =>
        this.tooltip() ?? this.action()?.label ?? null
    );
    /** 計算出的可存取名稱（aria-label）— 只有在 needsAriaLabel=true 時才提供 */
    readonly computedAriaLabel = computed<string | null>(() => {
    if (this.needsAriaLabel()) {
        return this.action()?.label ?? this.tooltip() ?? 'button';
    }
    return null;
    });

    onClick(ev: MouseEvent) {
        if (this.isDisabled()) return;  // ✅ 使用統一的邏輯
        try { this.action()?.handler?.(); }
        finally { this.pressed.emit(ev); }
    }
}
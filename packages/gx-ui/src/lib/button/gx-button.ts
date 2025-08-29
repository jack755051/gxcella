import {Component, computed, HostBinding, input, output} from "@angular/core";
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

    @HostBinding('style.--gx-btn-px.px') get _px() { return this.styleTokens()?.px ?? 12; }
    @HostBinding('style.--gx-btn-py.px') get _py() { return this.styleTokens()?.py ?? 8;  }
    @HostBinding('style.--gx-btn-radius.px') get _r() { return this.styleTokens()?.radius ?? 8; }

    /** 單一資訊來源：是否停用 */
    readonly isDisabled = computed(
        () => !!this.disabled() || !!this.action()?.disabled
    );

    onClick(ev: MouseEvent) {
        if (this.isDisabled()) return;  // ✅ 使用統一的邏輯
        try { this.action()?.handler?.(); }
        finally { this.pressed.emit(ev); }
    }
}
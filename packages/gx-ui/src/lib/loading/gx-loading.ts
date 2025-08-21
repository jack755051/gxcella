import {Component, computed, input } from "@angular/core";
import {GxLoadingSize, GxLoadingSpeed, GxLoadingType} from "./model/gx-loading.type";
import {NgStyle} from "@angular/common";
import {GxLoadingBar} from "./gx-loading-bar/gx-loading-bar";
import {GxLoadingSpinner} from "./gx-loading-spinner/gx-loading-spinner";
import {DUR_MAP, GAP_MAP, RADIUS_RATIO, SIZE_MAP} from "./constants/gx-loading-map";
import {TOKENS} from "./constants/gx-loading-token";

@Component({
    selector: 'gx-loading',
    standalone: true,
    imports: [
        NgStyle,
        GxLoadingBar,
        GxLoadingSpinner
    ],
    templateUrl: 'gx-loading.html',
    styleUrls: ['gx-loading.css'],
})
export class GxLoading {
    type = input<GxLoadingType>('bar');
    size = input<GxLoadingSize>('md');
    speed = input<GxLoadingSpeed>('normal');
    color = input<string | undefined>(undefined);

    /** 只有 spinner 用得到（可選），父層先宣告好再往下傳 */
    colors = input<string[]|undefined>(undefined);
    strokeWidth = input<number, number|string>(4, {
        transform: v => {
            const n = typeof v === 'string' ? parseFloat(v) : v;
            const safe = Number.isFinite(n) ? n : 4;
            return Math.min(8, Math.max(1, safe));
        }
    });

    // 對應成 CSS 變數
    readonly hostVars = computed(() => {
        const h   = SIZE_MAP[this.size()] ?? SIZE_MAP.md;
        const gap = GAP_MAP[this.size()] ?? GAP_MAP.md;
        const dur = DUR_MAP[this.speed()] ?? DUR_MAP.normal;
        const rad = Math.round(h * RADIUS_RATIO);

        return {
            [TOKENS.baseHeight]: `${h}px`,
            [TOKENS.barGap]: `${gap}px`,
            [TOKENS.radius]: `${rad}px`,
            [TOKENS.barDuration]: dur,
            [TOKENS.spinnerSize]: `${h}px`,
            ...(this.color() ? { [TOKENS.barColor]: this.color()! } : {}),
            // 如果你要用均分模式，可暴露 --gx-bars 給 CSS 算寬
            [TOKENS.bars]: String(this.barsAmount()),
        };
    });

    /** for loading bar*/
    barsAmount = input<number, number | string>(5, {
        transform: (v) => {
            const n = typeof v === 'string' ? parseInt(v, 10) : v;
            const safe = Number.isFinite(n) ? n : 5;
            return Math.min(12, Math.max(3, safe)); // 建議範圍 3~12，可依需求調整
        },
    });
}
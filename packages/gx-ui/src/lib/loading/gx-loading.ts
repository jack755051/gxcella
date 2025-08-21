import {Component, computed, input } from "@angular/core";
import {GxLoadingSize, GxLoadingSpeed, GxLoadingType} from "./model/gx-loading.type";
import {NgStyle} from "@angular/common";
import {GxLoadingBar} from "./gx-loading-bar/gx-loading-bar";
import {GxLoadingSpinner} from "./gx-loading-spinner/gx-loading-spinner";
import {DUR_MAP, GAP_MAP, RADIUS_RATIO, SIZE_MAP} from "./constants/gx-loading-map";
import {TOKENS} from "./constants/gx-loading-token";
import {clampNumberLike} from "./util";

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
        transform: (v) => clampNumberLike(v, 1, 8, 4)
    });
    barsAmount = input<number, number | string>(5, {
        transform: v => clampNumberLike(v, 3, 12, 5)
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
        };
    });
}
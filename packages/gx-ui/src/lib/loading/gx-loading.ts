import {Component, computed, input } from "@angular/core";
import {GxLoadingSize, GxLoadingSpeed, GxLoadingType} from "./model/gx-loading.type";
import {NgStyle} from "@angular/common";
import {GxLoadingBar} from "./gx-loading-bar/gx-loading-bar";
import {GxLoadingSpinner} from "./gx-loading-spinner/gx-loading-spinner";

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

    // 對應成 CSS 變數
    readonly hostVars = computed(() => {
        const sizeMap = { sm: 24, md: 40, lg: 56 };           // 高度 px
        const gapMap = { sm: 4, md: 8, lg: 10 };
        const durMap = { slow: '1.2s', normal: '0.8s', fast: '0.5s' };

        const radiusRatio = 0.15;

        const h = sizeMap[this.size()];
        const gap = gapMap[this.size()];
        const rad = Math.round(h * radiusRatio);

        return {
            '--gx-base-height': `${h}px`,
            '--gx-bar-gap':     `${gap}px`,
            '--gx-radius':      `${rad}px`,
            '--gx-bar-duration': durMap[this.speed()],
            '--gx-spinner-size':  `${h}px`,        // ★ 同步 spinner 預設
            ...(this.color() ? { '--gx-bar-bc': this.color()! } : {}),
            // 如果你要用均分模式，可暴露 --gx-bars 給 CSS 算寬
            '--gx-bars': String(this.barsAmount()),
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
    barsArray = computed(() => Array.from({ length: this.barsAmount() }, (_, i) => i));
}
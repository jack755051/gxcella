import {Component, computed, input} from "@angular/core";

@Component({
    selector: 'gx-loading-bar',
    standalone: true,
    templateUrl: 'gx-loading-bar.html',
    styleUrls: ['gx-loading-bar.css'],
})
export class GxLoadingBar {
    color = input<string|undefined>(undefined);
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
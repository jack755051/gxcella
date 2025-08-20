import {Component, computed, input } from "@angular/core";
import {GxLoadingType} from "./model/gx-loading.type";

@Component({
    selector: 'gx-loading',
    standalone: true,
    imports: [],
    templateUrl: 'gx-loading.html',
    styleUrls: ['gx-loading.css'],
})
export class GxLoading {
    type = input<GxLoadingType>('bar');
    barsAmount = input<number, number | string>(5, {
        transform: (v) => {
            const n = typeof v === 'string' ? parseInt(v, 10) : v;
            const safe = Number.isFinite(n) ? n : 5;
            return Math.min(12, Math.max(3, safe)); // 建議範圍 3~12，可依需求調整
        },
    });
    barsArray = computed(() => Array.from({ length: this.barsAmount() }, (_, i) => i));
}
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
    type = input<GxLoadingType>('spinner');
    barsAmount = input<number, number | string>(5, {
        transform: (v) => {
            const n = typeof v === 'string' ? parseInt(v, 10) : v;
            return Number.isFinite(n) ? Math.max(5, n) : 5;
        },
    });
    barsArray = computed(() => Array.from({ length: Math.max(5, this.barsAmount()) }));
}
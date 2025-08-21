import {Component, computed, input} from "@angular/core";
import {clampNumberLike} from "../util/number.util";

@Component({
    selector: 'gx-loading-bar',
    standalone: true,
    templateUrl: 'gx-loading-bar.html',
    styleUrls: ['gx-loading-bar.css'],
    host: {
        // 若 CSS 有用到 --gx-bars，就在這裡統一輸出
        '[style.--gx-bars]': 'String(barsAmount())'
    }
})
export class GxLoadingBar {
    color = input<string|undefined>(undefined);
    barsAmount = input<number, number | string>(5, {
        transform: v => clampNumberLike(v, 3, 12, 5)
    });
    barsArray = computed(() => Array.from({ length: this.barsAmount() }, (_, i) => i));
    protected readonly String = String;
}
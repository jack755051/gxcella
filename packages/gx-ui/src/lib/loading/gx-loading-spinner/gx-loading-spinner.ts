import {Component, computed, input} from "@angular/core";
import {clampNumberLike} from "../util";

let _gid = 0;

@Component({
    selector: 'gx-loading-spinner',
    standalone:true,
    imports: [],
    templateUrl: 'gx-loading-spinner.html',
    styleUrls: ['gx-loading-spinner.css'],
    host: {
        '[style.--gx-spinner-color]': 'resolvedColor()'  // 無值時不會覆蓋 --gx-bar-bc
    }
})
export class GxLoadingSpinner {
    color = input<string|undefined>(undefined);
    colors = input<string[] | undefined>(undefined);
    strokeWidth = input<number, number|string>(4, {
        transform: (v) => clampNumberLike(v, 1, 8, 4)
    });
    /** 漸層 id，避免同頁多個 spinner 衝突 */
    readonly gradId = `gx-spinner-grad-${++_gid}`;
    /** 單色 → 回傳字串；未設定 → 回傳 null（不覆蓋 --gx-bar-bc） */
    readonly resolvedColor = computed(() => this.colors()?.length ? null : (this.color() ?? null));
}
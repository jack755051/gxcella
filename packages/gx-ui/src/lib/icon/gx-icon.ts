import { Component, computed, input } from "@angular/core";
import { LucideAngularModule } from 'lucide-angular';
import { BuiltinIconDef } from "./model/icon.type";

@Component({
    selector: 'gx-icon',
    standalone: true,
    // 若使用端沒有安裝 lucide-angular，也能先用內建 icons 跑；有裝就會生效 fallback
    imports: [LucideAngularModule],
    templateUrl: 'gx-icon.html',
    styleUrls: ['gx-icon.css'],
}) 
export class GxIcon {
     /** 內建的最小可用圖示集（你可慢慢擴充） */
    private static BUILTINS: Record<string, BuiltinIconDef> = {
        x: {
        paths: ['M18 6 6 18', 'M6 6 18 18'],
        },
        plus: {
        paths: ['M12 5v14', 'M5 12h14'],
        },
        minus: {
        paths: ['M5 12h14'],
        },
        'chevron-left': {
        paths: ['M15 18 9 12l6-6'],
        },
        'chevron-right': {
        paths: ['M9 18l6-6-6-6'],
        },
    };

    /**
     * name - icon 名稱，必填
     * ariaLabel - 無障礙名稱，預設為 null
     * size - 預設大小為16，尺寸（數字或字串），數字會自動加上 unit
     * unit - 預設單位為 px
     * @memberof GxIcon
     */
    name = input.required<string>();
    //無障礙名稱；若提供則 role="img"
    ariaLabel = input<string | null>(null);
    size = input<string | number>('16');
    unit = input<string>('px');
    strokeWidth = input<number>(2);
    color = input<string | null>(null);

    /** 有沒有內建 */
    readonly hasBuiltin = computed(() => {
        const n = this.name();
        return !!GxIcon.BUILTINS[n];
    });

      /** 內建定義 */
    readonly builtinDef = computed(() => {
        const n = this.name();
        return GxIcon.BUILTINS[n] ?? null;
    });

    /** aria role */
    readonly role = computed(() => (this.ariaLabel() ? 'img' : null));

    /** 計算 CSS 尺寸（ex: 16px / 1.5rem / 24） */
    readonly cssSize = computed(() => {
        const s = this.size();
        if (typeof s === 'number') return `${s}${this.unit()}`;
        // 若字串本身已帶單位就直接用；沒帶也照原樣給（交給使用者自己負責）
        return s;
    });

    /** lucide-icon 的數字尺寸（它接受 number） */
    readonly numericSize = computed(() => {
        const s = this.size();
        if (typeof s === 'number') return s;
        const parsed = parseFloat(String(s));
        return isNaN(parsed) ? 16 : parsed;
    });

}
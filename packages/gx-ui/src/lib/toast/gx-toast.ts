import {Component, inject, input} from "@angular/core";
import {GxToastItem} from "./components/item/gx-toast-item";
import {GxToastService} from "./service/gx-toast.service";

@Component({
    selector: 'gx-toast-host',
    imports: [GxToastItem],
    standalone: true,
    templateUrl: 'gx-toast.html',
    styleUrls: ['gx-toast.css'],
    host: {
        '[style.--gx-toast-width]': 'toastWidth()'  // ★ 對應 CSS 變數
    }
})
export class GxToastHost {
    svc = inject(GxToastService);

    // 預設 320px，可讓使用者改
    toastWidth = input<string>('320px');

    onAction(e: { id: number; handler?: () => void }) {
        try { e.handler?.(); } finally { this.svc.dismiss(e.id); }
    }
}
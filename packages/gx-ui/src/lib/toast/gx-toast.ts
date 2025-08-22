import {Component, computed, HostBinding, inject, input} from "@angular/core";
import {GxToastItem} from "./components/item/gx-toast-item";
import {GxToastService} from "./service/gx-toast.service";
import {GX_TOAST_CONFIG} from "./config/gx-toast.config";

@Component({
    selector: 'gx-toast-host',
    imports: [GxToastItem],
    standalone: true,
    templateUrl: 'gx-toast.html',
    styleUrls: ['gx-toast.css'],
    host: {
        role: 'region',
        'aria-label': 'Notifications',
        'aria-live': 'polite',
        class: 'gx-toast-host' // 若你想沿用這個 class 名稱；非必要
    }
})
export class GxToastHost {
    svc = inject(GxToastService);
    cfg = inject(GX_TOAST_CONFIG);

    // 顯示上限
    visibleToasts = computed(() => this.svc.toasts().slice(0, this.cfg.max));

    // 讓 provider 的 width 進 CSS 變數
    @HostBinding('style.--gx-toast-width') get widthVar() {
        return this.cfg.width ?? '320px';
    }

    onAction(e: { id: number; handler?: () => void }) {
        try { e.handler?.(); } finally { this.svc.dismiss(e.id); }
    }
}
import {Component, inject} from "@angular/core";
import {GxToastItem} from "./components/item/gx-toast-item";
import {GxToastService} from "./service/gx-toast.service";

@Component({
    selector: 'gx-toast-host',
    imports: [GxToastItem],
    standalone: true,
    templateUrl: 'gx-toast.html',
    styleUrls: ['gx-toast.css']
})
export class GxToastHost {
    svc = inject(GxToastService);

    onAction(e: { id: number; handler?: () => void }) {
        try { e.handler?.(); } finally { this.svc.dismiss(e.id); }
    }
}
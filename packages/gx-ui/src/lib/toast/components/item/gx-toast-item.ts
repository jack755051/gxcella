import {Component, HostBinding, input, output} from "@angular/core";
import {GxToast} from "../../model/toast.type";

@Component({
    selector:'gx-toast-item',
    imports:[],
    standalone:true,
    templateUrl:'gx-toast-item.html',
    styleUrls:['gx-toast-item.css']
})
export class GxToastItem {
    item = input.required<GxToast>();
    dismiss = output<number>();
    action = output<{ id: number; handler?: () => void }>();

    @HostBinding('class')
    get hostClasses() {
        const t = this.item();
        return `gx-toast-item gx-toast-${t.kind}`;
    }

    onDismiss() {
        this.dismiss.emit(this.item().id);
    }
    onAction() {
        const t = this.item();
        this.action.emit({ id: t.id, handler: t.action?.handler });
    }
}
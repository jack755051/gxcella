import {Component, input, output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GxButton} from "../button/gx-button";
import {GxButtonIntent, GxButtonStyle} from "../button/model/button.types";

@Component({
    selector:'gx-tag',
    standalone:true,
    imports:[GxButton, CommonModule],
    templateUrl:'gx-tag.html',
    styleUrls:['gx-tag.css'],
})
export class GxTag {
    intent = input<GxButtonIntent>('info');
    removable = input<boolean>(false);
    disabled = input<boolean>(false);

    onClick = output<MouseEvent>();
    remove = output<void>();

    readonly tagStyles: GxButtonStyle = {
        px: 10,
        py: 4,
        radius: 999  // 藥丸形狀
    };

    onRemove(event: MouseEvent) {
        event.stopPropagation();
        if (!this.disabled()) {
            this.remove.emit();
        }
    }
}
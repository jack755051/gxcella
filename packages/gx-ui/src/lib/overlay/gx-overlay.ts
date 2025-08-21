import {Component, HostListener, input, output} from "@angular/core";

@Component({
    selector: 'gx-overlay',
    imports: [],
    standalone: true,
    templateUrl: 'gx-overlay.html',
    styleUrls: ['gx-overlay.css']
})
export class GxOverlay {
    // 可選：讓父決定是否按 ESC 關閉
    closeOnEsc = input(true);
    backdropClickFn = input<() => void>(() => {});
    backdropClick = output<void>();

    @HostListener('document:keydown.escape', ['$event'])
    onEsc(e: KeyboardEvent) {
        if (this.closeOnEsc()) this.backdropClick.emit();
    }

    onBackdropClick() {
        // 發事件
        this.backdropClick.emit();
        // 同時支援 callback
        this.backdropClickFn()?.();
    }
}
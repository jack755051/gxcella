import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxOverlay } from '../overlay/gx-overlay';
import { GxButton } from '../button/gx-button';
import { GxIcon } from '../icon/gx-icon';
import { GxModalButton, GxModalPosition, GxModalSize } from './model/modal.types';

@Component({
    selector: 'gx-modal',
    standalone: true,
    imports: [CommonModule, GxOverlay, GxButton, GxIcon],
    templateUrl: 'gx-modal.html',
    styleUrls: ['gx-modal.css']
})
export class GxModal {
    // Core properties
    visible = input<boolean>(false);
    title = input<string>('');

    // Size and dimensions
    size = input<GxModalSize>('md');
    width = input<string | undefined>(undefined);
    height = input<string>('auto');

    // Behavior
    showClose = input<boolean>(true);
    closeOnBackdrop = input<boolean>(true);
    closeOnEsc = input<boolean>(true);

    // Layout
    titlePosition = input<GxModalPosition>('center');
    buttonPosition = input<GxModalPosition>('center');

    // Buttons
    buttons = input<GxModalButton[]>([]);

    // Icon
    titleIcon = input<string | undefined>(undefined);
    titleIconSize = input<number>(20);

    // Styling
    customClass = input<string>('');

    // Events
    closed = output<void>();
    visibleChange = output<boolean>();
    buttonPressed = output<{ button: GxModalButton; event: MouseEvent }>();

    /** Computed modal width based on size or custom width */
    readonly modalWidth = computed(() => {
        const customWidth = this.width();
        if (customWidth) return customWidth;

        const sizeMap: Record<GxModalSize, string> = {
            sm: '400px',
            md: '600px',
            lg: '800px',
            xl: '1000px',
            full: '95vw'
        };

        return sizeMap[this.size()];
    });

    /** Computed modal height */
    readonly modalHeight = computed(() => this.height());

    /** Handle close action */
    close() {
        this.closed.emit();
        this.visibleChange.emit(false);
    }

    /** Handle backdrop click */
    onBackdropClick() {
        if (this.closeOnBackdrop()) {
            this.close();
        }
    }

    /** Handle button click - 先執行 action handler，再 emit event */
    onButtonClick(button: GxModalButton, event: MouseEvent) {
        // 執行按鈕的 action handler
        button.action.handler?.();
        // Emit 按鈕點擊事件，讓父組件可以額外處理
        this.buttonPressed.emit({ button, event });
    }
}

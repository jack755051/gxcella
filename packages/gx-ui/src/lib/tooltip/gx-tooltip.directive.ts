import {
    Directive,
    ElementRef,
    HostListener,
    input,
    inject,
    ComponentRef,
    ViewContainerRef,
    Renderer2
} from '@angular/core';
import { GxTooltipPosition, GxTooltipTheme } from './model/tooltip.types';
import { GxTooltipComponent } from './gx-tooltip.component';

@Directive({
    selector: '[gxTooltip]',
    standalone: true
})
export class GxTooltip {
    private elementRef = inject(ElementRef);
    private viewContainerRef = inject(ViewContainerRef);
    private renderer = inject(Renderer2);

    /** Tooltip content */
    gxTooltip = input<string>('');
    /** Position */
    tooltipPosition = input<GxTooltipPosition>('top');
    /** Theme */
    tooltipTheme = input<GxTooltipTheme>('dark');
    /** Show delay */
    tooltipShowDelay = input<number>(200);
    /** Hide delay */
    tooltipHideDelay = input<number>(0);
    /** Show arrow */
    tooltipShowArrow = input<boolean>(true);
    /** Offset */
    tooltipOffset = input<number>(8);

    private tooltipRef: ComponentRef<GxTooltipComponent> | null = null;
    private showTimeout: any;
    private hideTimeout: any;

    @HostListener('mouseenter')
    onMouseEnter() {
        const content = this.gxTooltip();
        if (!content) return;

        // Clear hide timeout if exists
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }

        // Show with delay
        this.showTimeout = setTimeout(() => {
            this.show();
        }, this.tooltipShowDelay());
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        // Clear show timeout if exists
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
        }

        // Hide with delay
        this.hideTimeout = setTimeout(() => {
            this.hide();
        }, this.tooltipHideDelay());
    }

    @HostListener('click')
    onClick() {
        // Hide on click
        this.hide();
    }

    private show() {
        if (this.tooltipRef) return;

        // Create tooltip component
        this.tooltipRef = this.viewContainerRef.createComponent(GxTooltipComponent);

        // Set inputs
        this.tooltipRef.setInput('content', this.gxTooltip());
        this.tooltipRef.setInput('position', this.tooltipPosition());
        this.tooltipRef.setInput('theme', this.tooltipTheme());
        this.tooltipRef.setInput('showArrow', this.tooltipShowArrow());

        // Position tooltip
        this.positionTooltip();

        // Append to body
        document.body.appendChild(this.tooltipRef.location.nativeElement);
    }

    private hide() {
        if (this.tooltipRef) {
            this.tooltipRef.destroy();
            this.tooltipRef = null;
        }
    }

    private positionTooltip() {
        if (!this.tooltipRef) return;

        const hostElement = this.elementRef.nativeElement;
        const tooltipElement = this.tooltipRef.location.nativeElement;
        const hostRect = hostElement.getBoundingClientRect();
        const offset = this.tooltipOffset();

        // Wait for next tick to get tooltip dimensions
        setTimeout(() => {
            const tooltipRect = tooltipElement.getBoundingClientRect();
            let top = 0;
            let left = 0;

            const position = this.tooltipPosition();

            switch (position) {
                case 'top':
                    top = hostRect.top - tooltipRect.height - offset;
                    left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
                    break;
                case 'bottom':
                    top = hostRect.bottom + offset;
                    left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
                    break;
                case 'left':
                    top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
                    left = hostRect.left - tooltipRect.width - offset;
                    break;
                case 'right':
                    top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
                    left = hostRect.right + offset;
                    break;
            }

            // Keep tooltip within viewport
            const margin = 8;
            if (left < margin) {
                left = margin;
            } else if (left + tooltipRect.width > window.innerWidth - margin) {
                left = window.innerWidth - tooltipRect.width - margin;
            }

            if (top < margin) {
                top = margin;
            } else if (top + tooltipRect.height > window.innerHeight - margin) {
                top = window.innerHeight - tooltipRect.height - margin;
            }

            this.renderer.setStyle(tooltipElement, 'position', 'fixed');
            this.renderer.setStyle(tooltipElement, 'top', `${top}px`);
            this.renderer.setStyle(tooltipElement, 'left', `${left}px`);
            this.renderer.setStyle(tooltipElement, 'z-index', '9999');
        });
    }

    ngOnDestroy() {
        this.hide();
        if (this.showTimeout) clearTimeout(this.showTimeout);
        if (this.hideTimeout) clearTimeout(this.hideTimeout);
    }
}

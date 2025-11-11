import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxTooltipPosition, GxTooltipTheme } from './model/tooltip.types';

@Component({
    selector: 'gx-tooltip',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'gx-tooltip.component.html',
    styleUrls: ['gx-tooltip.component.css']
})
export class GxTooltipComponent {
    content = input<string>('');
    position = input<GxTooltipPosition>('top');
    theme = input<GxTooltipTheme>('dark');
    showArrow = input<boolean>(true);
}

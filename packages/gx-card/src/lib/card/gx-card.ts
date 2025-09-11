import { GxButton } from '@sanring/gx-ui';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { ALLOWED, GxAction, GxCardLayout, GxCardShape, GxCardVariant, IGxCard, IGxTag } from '../core/card.type';
import { GxCardGroupContext } from '../core/group-context.service';
import { GxCardConfigService } from '../core/card-config.service';
import { GxClickableDirective } from '../directives/gx-clickable.directive';

@Component({
  selector: 'gx-card',
  standalone: true,
  imports: [CommonModule, GxButton, GxClickableDirective],
  templateUrl: './gx-card.html',
  styleUrls: ['./gx-card.css']
})
export class GxCard {
  data = input<IGxCard | undefined>(undefined);
  variant = input<GxCardVariant | undefined>(undefined);
  layout = input<GxCardLayout | undefined>(undefined);
  shape = input<GxCardShape | undefined>(undefined);
  clickable = input<boolean>(false);

  actions = output<GxAction>();
  cardClick = output<MouseEvent>();
  tagClick = output<{ tag: IGxTag, event: MouseEvent }>();
  tagRemove = output<{ tag: IGxTag }>();

  private group = inject(GxCardGroupContext, { optional: true });
  private cardConfig = inject(GxCardConfigService);

  readonly effectiveVariant = computed<GxCardVariant>(() =>
    this.variant() ?? this.group?.variant() ?? this.cardConfig.config.defaultVariant ?? 'elevated'
  );

  readonly effectiveLayout = computed<GxCardLayout>(() =>
    this.layout() ?? this.group?.layout() ?? this.cardConfig.config.defaultLayout ?? 'grid'
  );

  readonly resolvedShape = computed<GxCardShape>(() => {
    const layout = this.effectiveLayout();
    const wanted = this.shape() ?? this.data()?.shape ?? this.cardConfig.config.defaultShape ?? 'classic';
    const allowed = ALLOWED[layout];
    return (allowed as readonly string[]).includes(wanted) ? wanted : (allowed[0] as GxCardShape);
  });

  readonly isCompact = computed(() => this.resolvedShape() === 'compact');
  readonly isCustom = computed(() => this.resolvedShape() === 'custom');

  get classes() {
    const baseClasses = [
      this.cardConfig.getCssClass('card'),
      this.cardConfig.getCssClass(`variant-${this.effectiveVariant()}`),
      this.cardConfig.getCssClass(`shape-${this.resolvedShape()}`)
    ];

    if (this.clickable()) {
      baseClasses.push('gx-card-clickable');
    }

    return baseClasses.join(' ');
  }

  onActionPressed(action: GxAction, ev: MouseEvent) {
    ev.stopPropagation();
    if (action.disabled) return;
    this.actions.emit(action);
  }

  onTagClick(tag: IGxTag, event: MouseEvent) {
    this.tagClick.emit({ tag, event });
  }

  onTagRemove(tag: IGxTag) {
    this.tagRemove.emit({ tag });
  }

  onCardClick(event: MouseEvent) {
    if (this.clickable() && !this.isInteractiveElement(event.target as Element)) {
      this.cardClick.emit(event);
    }
  }

  private readonly interactiveSelectors = [
    'button', 'gx-button', 'gx-tag', 'a', 'input', 'select', 'textarea'
  ];

  private isInteractiveElement(target: Element): boolean {
    if (!target) return false;
    
    let current: Element | null = target;
    while (current) {
      const tagName = current.tagName.toLowerCase();
      
      if (this.interactiveSelectors.includes(tagName)) {
        return true;
      }
      
      if (current.hasAttribute('gxClickable') || 
          current.hasAttribute('(click)') || 
          current.hasAttribute('ng-click')) {
        return true;
      }
      
      current = current.parentElement;
    }
    
    return false;
  }

  mapIntent(intent?: 'primary'|'secondary'|'danger'): 'info'|'success'|'warning'|'error' {
    switch (intent) {
      case 'primary': return 'info';
      case 'secondary': return 'success';
      case 'danger': return 'error';
      default: return 'info';
    }
  }
}
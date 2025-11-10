/*
 * Public API Surface of gx-card
 */

// Main Card Component
export * from './lib/card/gx-card';

// Legacy Components (for backward compatibility)
export * from './lib/card-header/gx-card-header';
export * from './lib/card-content/gx-card-content';
export * from './lib/card-footer/gx-card-footer';

// V2 Components (refactored standalone components)
export * from './lib/card-header-v2/gx-card-header-v2';
export * from './lib/card-content-v2/gx-card-content-v2';
export * from './lib/card-footer-v2/gx-card-footer-v2';

// Container and Group
export * from './lib/card-container/gx-card-container';
export * from './lib/card-group/gx-card-group';

// Atomic Components
export * from './lib/components/gx-card-avatar';
export * from './lib/components/gx-card-title';
export * from './lib/components/gx-card-actions';

// Types and Models
export * from './lib/model/card.type';

// Core Services
export * from './lib/core/card-config.service';
export * from './lib/core/card-config.provider';
export * from './lib/core/height-measurement.service';
export * from './lib/core/group-context.service';

// Directives
export * from './lib/directives/gx-clickable.directive';
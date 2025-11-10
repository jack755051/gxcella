/*
 * Public API Surface of gx-breadcrumb
 */

// 新的組合式組件（推薦使用）
export * from './lib/gx-breadcrumb';
export * from './lib/breadcrumb-container/gx-breadcrumb-container';
export * from './lib/breadcrumb-list/gx-breadcrumb-list';
export * from './lib/breadcrumb-item-v2/gx-breadcrumb-item-v2';

// 向後兼容組件
export * from './lib/gx-breadcrumb-legacy';
export * from './lib/gx-breadcrumb-item/gx-breadcrumb-item';

// Services
export * from './lib/services/breadcrumb.services';
export * from './lib/services/breadcrumb-state.service';
export * from './lib/services/breadcrumb.token';

// Types and Constants
export * from './lib/model/gx-breadcrumb.type';
export * from './lib/model/gx-breadcrumb.constants';
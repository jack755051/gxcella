import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GX_BREADCRUMB_ROOT } from '@sanring/gx-breadcrumb';
import { HouseIcon } from '../icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: GX_BREADCRUMB_ROOT, useValue: { label: 'Home', link: '/home', iconImg: HouseIcon } }
  ]
};

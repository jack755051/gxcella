import {
    APP_INITIALIZER, ApplicationRef, EnvironmentInjector, EnvironmentProviders,
    createComponent, inject, makeEnvironmentProviders
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { GX_TOAST_CONFIG, DEFAULT_TOAST_CONFIG, GxToastConfig, GxToastPosition } from './gx-toast.config';
import { PLATFORM_ID } from '@angular/core';
import {GxToastHost} from "../gx-toast";

export function provideToasts(cfg?: Partial<GxToastConfig>): EnvironmentProviders {
    const merged = { ...DEFAULT_TOAST_CONFIG, ...cfg } satisfies GxToastConfig;

    return makeEnvironmentProviders([
        { provide: GX_TOAST_CONFIG, useValue: merged },

        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: () => {
                const appRef = inject(ApplicationRef);
                const envInjector = inject(EnvironmentInjector);
                const doc = inject(DOCUMENT);
                const platformId = inject(PLATFORM_ID);
                const conf = inject(GX_TOAST_CONFIG);

                return () => {
                    if (!isPlatformBrowser(platformId)) return;       // SSR 安全
                    const hostParent = resolveAttachTarget(doc, conf.attachTo);
                    if (!hostParent) return;

                    // 避免重覆掛載
                    if (doc.getElementById(conf.containerId)) return;

                    // 建立 component
                    const cmpRef = createComponent(GxToastHost, { environmentInjector: envInjector });
                    appRef.attachView(cmpRef.hostView);

                    const hostEl = cmpRef.location.nativeElement as HTMLElement;
                    hostEl.id = conf.containerId;
                    if (conf.containerClass) hostEl.classList.add(conf.containerClass);

                    // 基本定位樣式
                    hostEl.style.position = 'fixed';
                    hostEl.style.zIndex = String(conf.zIndex);
                    applyPosition(hostEl, conf.position);

                    // 讓 CSS 變數也能被覆寫
                    hostEl.style.setProperty('--gx-toast-width', conf.width ?? '320px');

                    hostParent.appendChild(hostEl);
                };
            }
        }
    ]);
}

function resolveAttachTarget(doc: Document, attachTo: GxToastConfig['attachTo']): HTMLElement | null {
    if (attachTo === 'body') return doc.body;
    if (typeof attachTo === 'string') return doc.querySelector(attachTo);
    if (attachTo instanceof HTMLElement) return attachTo;
    return null;
}

function applyPosition(el: HTMLElement, pos: GxToastPosition) {
    el.style.top = el.style.right = el.style.bottom = el.style.left = '';
    el.style.transform = '';
    const pad = '16px';

    switch (pos) {
        case 'top-right':     el.style.top = pad;    el.style.right = pad; break;
        case 'top-left':      el.style.top = pad;    el.style.left  = pad; break;
        case 'bottom-right':  el.style.bottom = pad; el.style.right = pad; break;
        case 'bottom-left':   el.style.bottom = pad; el.style.left  = pad; break;
        case 'top-center':
            el.style.top = pad; el.style.left = '50%'; el.style.transform = 'translateX(-50%)'; break;
        case 'bottom-center':
            el.style.bottom = pad; el.style.left = '50%'; el.style.transform = 'translateX(-50%)'; break;
    }
}
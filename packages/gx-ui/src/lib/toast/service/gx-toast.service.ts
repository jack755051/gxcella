import {inject, Injectable, signal} from '@angular/core';
import {GxToast} from "../model/toast.type";
import {makeNumericId} from "../util/number.util";
import {GX_TOAST_CONFIG} from "../config/gx-toast.config";

@Injectable({providedIn: 'root'})
export class GxToastService {
    private readonly cfg = inject(GX_TOAST_CONFIG);

    private readonly _toasts = signal<GxToast[]>([]);
    readonly toasts = this._toasts.asReadonly();

    private _seq = 0;
    private timers = new Map<number, ReturnType<typeof setTimeout>>();
    private tickers = new Map<number, ReturnType<typeof setInterval>>(); // ★ 倒數 interval


    /** 顯示一個 toast（最新顯示在最上面） */
    show(partial: Omit<GxToast, 'id'>) {
        const id = ++this._seq;
        const duration = partial.duration ?? this.cfg.defaultDuration ?? 0;

        const t: GxToast = {
            id,
            kind: 'info',
            dismissible: true,
            ...partial,
            duration,
        };

        // 初始 remainingSec
        if (t.countdown && duration > 0) {
            t.remainingSec = Math.ceil(duration / 1000);
        }

        this._toasts.update(list => [t, ...list]);

        // 自動關閉
        if (duration > 0) {
            const timeout = setTimeout(() => this.dismiss(id), duration);
            this.timers.set(id, timeout);
        }

        // ★ 啟動倒數
        if (t.countdown && duration > 0) {
            const endAt = Date.now() + duration;
            const ticker = setInterval(() => {
                const leftMs = Math.max(0, endAt - Date.now());
                const leftSec = Math.ceil(leftMs / 1000);

                // 若已清空或關閉就停
                if (!this.timers.has(id) && leftSec === 0) {
                    this.stopTicker(id);
                    return;
                }

                // 更新該筆 toast 的 remainingSec
                this._toasts.update(list =>
                    list.map(x => x.id === id ? { ...x, remainingSec: leftSec } : x)
                );

                // 最後一秒歸零後也停
                if (leftSec <= 0) this.stopTicker(id);
            }, 1000);

            this.tickers.set(id, ticker);
        }

        return id;
    }


    /** 關閉指定 id 的 toast（同時清掉對應計時器） */
    dismiss(id: number) {
        const handle = this.timers.get(id);
        if (handle) { clearTimeout(handle); this.timers.delete(id); }
        this.stopTicker(id); // ★ 停止倒數
        this._toasts.update(list => list.filter(x => x.id !== id));
    }

    /** 全部清掉（含所有計時器） */
    clear() {
        this.timers.forEach(clearTimeout);
        this.tickers.forEach(clearInterval); // ★
        this.timers.clear();
        this.tickers.clear();
        this._toasts.set([]);
    }

    // ★ 內部小工具
    private stopTicker(id: number) {
        const ti = this.tickers.get(id);
        if (ti) { clearInterval(ti); this.tickers.delete(id); }
    }
}
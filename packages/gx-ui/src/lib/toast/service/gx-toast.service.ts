import { Injectable, signal } from '@angular/core';
import {GxToast} from "../model/toast.type";
import {makeNumericId} from "../util/number.util";

@Injectable({providedIn: 'root'})
export class GxToastService {
    private readonly _toasts = signal<GxToast[]>([]);
    readonly toasts = this._toasts.asReadonly();

    private _seq = 0;
    private timers = new Map<number, ReturnType<typeof setTimeout>>();

    /** 顯示一個 toast（最新顯示在最上面） */
    show(partial: Omit<GxToast, 'id'>) {
        const id = makeNumericId(++this._seq);
        const t: GxToast = {
            id,
            dismissible: true,
            kind: 'info',
            ...partial,
        };

        // 新的放最前面
        this._toasts.update(list => [t, ...list]);

        // 若有設定自動關閉時間
        if (t.duration && t.duration > 0) {
            const h = setTimeout(() => this.dismiss(id), t.duration);
            this.timers.set(id, h);
        }

        return id;
    }


    /** 關閉指定 id 的 toast（同時清掉對應計時器） */
    dismiss(id: number) {
        const handle = this.timers.get(id);
        if (handle) {
            clearTimeout(handle);
            this.timers.delete(id);
        }
        this._toasts.update(list => list.filter(x => x.id !== id));
    }

    /** 全部清掉（含所有計時器） */
    clear() {
        this.timers.forEach(clearTimeout);
        this.timers.clear();
        this._toasts.set([]);
    }
}
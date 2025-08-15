import {inject, Injectable} from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from "@angular/router";
import { Observable } from "rxjs";
import { filter,startWith,map } from "rxjs/operators";
import { BreadcrumbData, IGxBreadCrumb } from "../model/gx-breadcrumb.type";
import { GX_BREADCRUMB_ROOT } from "./breadcrumb.token";

@Injectable({ providedIn: 'root' })
export class GxBreadcrumbService{
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    /** load Token default */
    private rootDefault = inject(GX_BREADCRUMB_ROOT);

    /** 讓元件需要時也能拿到「目前路由鏈上最近的覆寫」 */
    getCurrentRootOverride(): IGxBreadCrumb | false | null {
        return this.resolveRootOverride(this.router.routerState.snapshot.root);
    }

    /** 主串流：自動麵包屑（已套用 token + route 覆寫） */
    readonly breadcrumbs$: Observable<IGxBreadCrumb[]> = this.router.events
        .pipe(
            filter(e => e instanceof NavigationEnd),
            startWith(null),
            map(() =>
                {
                    const root = this.router.routerState.snapshot.root;
                    const list = this.build(root);
                    /** 在 service 內套用 Root 規則 */
                    return this.prependRoot(list, root);
                }
            )
        );

    /** 從當前節點往上找最近的 data 覆寫：data.breadcrumbRoot */
    private resolveRootOverride(from: ActivatedRouteSnapshot): IGxBreadCrumb | false | null {
        let n: ActivatedRouteSnapshot | null = from;
        while (n) {
            if (n.data && 'breadcrumbRoot' in n.data) {
                return (n.data as any)['breadcrumbRoot'] as IGxBreadCrumb | false | null;
            }
            n = n.parent ?? null;
        }
        return this.rootDefault; // 沒覆寫就用 token 預設
    }

    /** 真的把 Root 插到最前；僅在有 2 顆以上時插入（避免首頁重複） */
    private prependRoot(list: IGxBreadCrumb[], from: ActivatedRouteSnapshot): IGxBreadCrumb[] {
        const root = this.resolveRootOverride(from); // 可能是物件 / false / null
        if (!root || list.length === 0) return list;

        const first = list[0];
        const firstIsRoot =
            first?.link === root.link ||
            (first?.label ?? '').toLowerCase() === (root.label ?? '').toLowerCase();

        // 首顆就是 root（/home 頁）→ 不加
        if (firstIsRoot) return list;

        // 其他任何頁 → 一律把 root 前置
        return [root, ...list];
    }


    private build(node: ActivatedRouteSnapshot, accUrl = ''): IGxBreadCrumb[]{
        const out: IGxBreadCrumb[] = [];
        const primaryChild = node.children.find(c => c.outlet === 'primary') ?? node.firstChild;

        const segment = node.url.map(s => s.path).join('/');
        const nextUrl = (segment ? `${accUrl}/${segment}` : accUrl) || '/';

        const raw = node.data?.['breadcrumb'] as BreadcrumbData | undefined;
        const isRedirect = !!node.routeConfig?.redirectTo;

        if (!isRedirect && raw !== false) {
            let crumb: IGxBreadCrumb | undefined;
            if (typeof raw === 'function') {
                const v = raw(node);
                crumb = typeof v === 'string' ? { label: v } : v;
            } else if (raw && typeof raw === 'object') {
                crumb = { ...raw };
            } else if (typeof raw === 'string' && raw) {
                crumb = { label: raw };
            } else if (segment) {
                crumb = { label: segment };
            }
            if (crumb) {
                crumb.link ??= nextUrl;
                crumb.active = !primaryChild;
                /** active 先交給元件用 $last 判斷，這裡不硬塞 */
                out.push(crumb);
            }
        }
        if (primaryChild) out.push(...this.build(primaryChild, nextUrl));
        return out;
    }
}

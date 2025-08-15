import {inject, Injectable} from "@angular/core";
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from "@angular/router";
import { Observable } from "rxjs";
import {BreadcrumbData, IGxBreadCrumb} from "../model/gx-breadcrumb.type";
import {filter,startWith,map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class GxBreadcrumbService{
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    readonly breadcrumbs$: Observable<IGxBreadCrumb[]> = this.router.events
        .pipe(
            filter(e => e instanceof NavigationEnd),
            startWith(null),
            map(() => this.build(this.router.routerState.snapshot.root))
        );


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
                out.push(crumb);
            }
        }
        if (primaryChild) out.push(...this.build(primaryChild, nextUrl));
        return out;
    }
}

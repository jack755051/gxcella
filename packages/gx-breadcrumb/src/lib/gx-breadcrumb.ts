import {Component, inject, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import {CommonModule, NgClass} from "@angular/common";
import {Router, ActivatedRoute, NavigationEnd,ActivatedRouteSnapshot, Routes} from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import {GxBreadcrumbSeparator, GxBreadcrumbVariant, IGxBreadCrumb} from "./model/gx-breadcrumb.type";
import {GxBreadcrumbItem} from "./gx-breadcrumb-item/gx-breadcrumb-item";
import {SEP_MAP} from "./model/gx-breadcrumb.constants";
import {filter} from "rxjs/operators";

@Component({
  selector: 'gx-breadcrumb',
  standalone: true,
  imports: [CommonModule, NgClass, LucideAngularModule, GxBreadcrumbItem],
  templateUrl:'gx-breadcrumb.html',
  styleUrls: ['gx-breadcrumb.css'],
})
export class GxBreadcrumb implements OnInit  {
  @Input() variant:GxBreadcrumbVariant = GxBreadcrumbVariant.Modern;
  @Input() separator: GxBreadcrumbSeparator = GxBreadcrumbSeparator.Slash;
  @Input() showIcon: boolean = true;
  @Input() data:IGxBreadCrumb[]=[];
  @Output() itemClick = new EventEmitter<IGxBreadCrumb>();
  trackByIndex = (i: number) => i;


  private router = inject(Router);

  constructor(){}

  ngOnInit() {
    this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          this.data = this.buildCrumbsFromSnapshot(this.router.routerState.snapshot.root);
        });

    this.data = this.buildCrumbsFromSnapshot(this.router.routerState.snapshot.root);
  }

  getSeparator(): string {
    return SEP_MAP[this.separator] ?? '/';
  }

  private buildCrumbsFromSnapshot(
      node: ActivatedRouteSnapshot,
      accUrl: string = ''
  ): IGxBreadCrumb[]{
    const crumbs: IGxBreadCrumb[] = [];
    // 只走 primary outlet 的鏈（避免輔助路由干擾）
    const primaryChild = node.children.find(c => c.outlet === 'primary') ?? node.firstChild;

    // 當前節點的 url 片段
    const segment = node.url.map(s => s.path).join('/');
    const nextUrl = segment ? `${accUrl}/${segment}` : accUrl;

    // 取 label：字串或函式；也允許用 false 隱藏該節點
    const bc = node.data?.['breadcrumb'];
    const label =
        bc === false ? '' :
            typeof bc === 'function' ? bc(node) :
                typeof bc === 'string'   ? bc :
                    segment; // fallback，用 path 當 label

    // 跳過 redirect/空節點；其餘就推一個 crumb
    const isRedirect = !!node.routeConfig?.redirectTo;
    if (!isRedirect && label) {
      crumbs.push({
        label,
        link: nextUrl || '/',             // 首節點時給 '/'
        active: !primaryChild,            // 沒更深的就是當前頁
      });
    }

    // 走到更深層
    if (primaryChild) {
      crumbs.push(...this.buildCrumbsFromSnapshot(primaryChild, nextUrl));
    }

    return crumbs;
  }

}

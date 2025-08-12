import {Component, inject, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import {CommonModule, NgClass} from "@angular/common";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import {GxBreadcrumbSeparator, GxBreadcrumbVariant, IGxBreadCrumb} from "./model/gx-breadcrumb.type";
import {GxBreadcrumbItem} from "./gx-breadcrumb-item/gx-breadcrumb-item";
import {SEP_MAP} from "./model/gx-breadcrumb.constants";


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

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  currentUrl = '';

  constructor(){}

  ngOnInit() {
  }

  getSeparator(): string {
    return SEP_MAP[this.separator] ?? '/';
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {GxBreadcrumbVariant, IGxBreadCrumb} from "../model/gx-breadcrumb.type";
import {LucideAngularModule} from "lucide-angular";

@Component({
    selector: 'gx-breadcrumb-item',
    standalone: true,
    imports: [CommonModule, RouterLink, LucideAngularModule],
    templateUrl: 'gx-breadcrumb-item.html',
    styleUrls: ['gx-breadcrumb-item.css'],
})
export class GxBreadcrumbItem implements OnInit {
    @Input({ required: true }) item!: IGxBreadCrumb;
    @Input() isLast = false;
    @Input() showIcon = true;
    @Input() variant: GxBreadcrumbVariant = GxBreadcrumbVariant.Modern;
    @Output() itemClick = new EventEmitter<IGxBreadCrumb>();

    constructor() {}

    ngOnInit() {
        // Initialization logic can go here if needed
    }

    onClick(e: MouseEvent) {
        if (this.item.disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.itemClick.emit(this.item);
    }

    isExternal(link?: string) {
        return !!link && /^(https?:)?\/\//.test(link);
    }

    get isActive() {
        return this.isLast || !!this.item.active;
    }

}
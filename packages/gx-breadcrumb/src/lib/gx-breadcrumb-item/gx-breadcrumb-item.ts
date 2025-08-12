import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'gx-breadcrumb-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'gx-breadcrumb-item.html',
    styleUrls: ['gx-breadcrumb-item.css'],
})
export class GxBreadcrumbItem implements OnInit {

    constructor() {}

    ngOnInit() {
        // Initialization logic can go here if needed
    }

}
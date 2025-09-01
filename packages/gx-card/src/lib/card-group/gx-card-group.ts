import { Component } from "@angular/core";
import { GxCardGroupContext } from "../core/group-context.service";

@Component({
    selector: 'gx-card-group',
    imports: [],
    standalone: true,
    template: '<ng-content></ng-content>',
    styleUrls: ['./gx-card-group.css'],
    providers: [GxCardGroupContext],
    host: {
        class: 'gx-card-group'
    }
})
export class GxCardGroup { }
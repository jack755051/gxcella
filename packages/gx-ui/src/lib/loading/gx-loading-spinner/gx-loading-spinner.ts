import {Component, input} from "@angular/core";

@Component({
    selector: 'gx-loading-spinner',
    standalone:true,
    imports: [],
    templateUrl: 'gx-loading-spinner.html',
    styleUrls: ['gx-loading-spinner.css']
})
export class GxLoadingSpinner {
    color = input<string|undefined>(undefined);
}
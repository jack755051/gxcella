import { Component } from '@angular/core';
import { GxLoading } from "@sanring/gx-ui";
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-loading-demo',
  standalone: true,
  imports: [
    GxLoading,
    GxLoading,
    NgStyle
  ],
  templateUrl: './loading-demo.html',
  styleUrls: ['./loading-demo.css']
})
export class LoadingDemo {

}

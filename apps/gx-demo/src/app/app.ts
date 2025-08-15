import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GxBreadcrumb } from '@sanring/gx-breadcrumb';
import { HouseIcon, Building2Icon, CctvIcon } from '../icons';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GxBreadcrumb,LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gx-demo');
  readonly HomeIcon = HouseIcon;
  readonly AboutIcon =  Building2Icon;
  readonly ProductIcon = CctvIcon;
}

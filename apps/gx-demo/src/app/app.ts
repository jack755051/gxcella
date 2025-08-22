import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GxBreadcrumb, GxBreadcrumbSeparator } from '@sanring/gx-breadcrumb';
import { HouseIcon, Building2Icon, CctvIcon,PackageIcon } from '../icons';
import { LucideAngularModule} from 'lucide-angular';
// import { GxToastHost } from '@sanring/gx-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GxBreadcrumb,
    LucideAngularModule,
    // GxToastHost
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gx-demo');
  readonly HomeIcon = HouseIcon;
  readonly AboutIcon =  Building2Icon;
  readonly PackageIcon = PackageIcon;
  protected readonly GxBreadcrumbSeparator = GxBreadcrumbSeparator;
}

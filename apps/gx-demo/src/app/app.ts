import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GxBreadcrumb } from '@sanring/gx-breadcrumb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GxBreadcrumb],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gx-demo');
}

import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {GxTag} from '@sanring/gx-ui';
import {GxButtonIntent} from '@sanring/gx-ui';

type DemoTag = { label: string; intent: GxButtonIntent; removable: boolean };

@Component({
  selector: 'app-tag',
  imports: [CommonModule ,GxTag],
  standalone: true,
  templateUrl: './tag.html',
  styleUrl: './tag.css'
})
export class Tag {
  tags = [
    { label: 'Angular', intent: 'success', removable: true },
    { label: 'React', intent: 'success', removable: true },
    { label: 'Vue', intent: 'info', removable: true },
    { label: 'Svelte', intent: 'warning', removable: true },
    { label: 'Ember', intent: 'success', removable: true },
    { label: 'Solid', intent: 'warning', removable: true },
    { label: 'Backbone', intent: 'warning', removable: true },
    { label: 'jQuery', intent: 'warning', removable: true },
  ]satisfies DemoTag[];

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }
}

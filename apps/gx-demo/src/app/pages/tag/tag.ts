import {Component, input, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GxTag} from '@sanring/gx-ui';
import {GxButtonIntent} from '@sanring/gx-ui';
import {SortableDirective} from '@sanring/gx-drag-drop';

type DemoTag = { label: string; intent: GxButtonIntent; removable: boolean };
type SortableTag = { id: string; label: string; intent: GxButtonIntent; removable: boolean };

@Component({
  selector: 'app-tag',
  imports: [CommonModule ,GxTag,SortableDirective],
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

  // 可拖曳的 tags
  sortableTags: SortableTag[] = [
    { id: '1', label: 'TypeScript', intent: 'success', removable: true },
    { id: '2', label: 'JavaScript', intent: 'warning', removable: true },
    { id: '3', label: 'HTML', intent: 'info', removable: true },
    { id: '4', label: 'CSS', intent: 'success', removable: true },
    { id: '5', label: 'SCSS', intent: 'warning', removable: true },
    { id: '6', label: 'Tailwind', intent: 'info', removable: true },
  ];


  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  // 處理拖曳排序
  onSorted(event: { previousIndex: number; currentIndex: number; items: SortableTag[] }) {
    console.log('排序事件:', event);
    // 使用賦值來觸發變更檢測
    this.sortableTags = [...event.items];
  }

  // 為 @for 提供更好的追蹤函數
  trackByTagId(index: number, tag: SortableTag): string {
    return tag.id;
  }

  trackByIndex(index: number, tag: DemoTag): number {
    return index;
  }

  // 移除可拖曳的 tag
  removeSortableTag(id: string) {
    this.sortableTags = this.sortableTags.filter(tag => tag.id !== id);
  }
}

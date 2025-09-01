import {Component, input, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GxTag} from '@sanring/gx-ui';
import {GxButtonIntent} from '@sanring/gx-ui';
import {SortableDirective, SortableCdkDirective, GxSortableItem} from '@sanring/gx-drag-drop';

type DemoTag = { label: string; intent: GxButtonIntent; removable: boolean };
type SortableTag = { id: string; label: string; intent: GxButtonIntent; removable: boolean };
type CdkSortableTag = GxSortableItem & { label: string; intent: GxButtonIntent; removable: boolean };

@Component({
  selector: 'app-tag',
  imports: [CommonModule, GxTag, SortableDirective, SortableCdkDirective],
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

  // 可拖曳的 tags (Native 版本)
  sortableTags: SortableTag[] = [
    { id: '1', label: 'TypeScript', intent: 'success', removable: true },
    { id: '2', label: 'JavaScript', intent: 'warning', removable: true },
    { id: '3', label: 'HTML', intent: 'info', removable: true },
    { id: '4', label: 'CSS', intent: 'success', removable: true },
    { id: '5', label: 'SCSS', intent: 'warning', removable: true },
    { id: '6', label: 'Tailwind', intent: 'info', removable: true },
  ];

  // CDK 版本的可拖曳標籤
  cdkSortableTags: CdkSortableTag[] = [
    { id: 'framework-1', label: 'Angular', intent: 'success', removable: true },
    { id: 'framework-2', label: 'React', intent: 'info', removable: true },
    { id: 'framework-3', label: 'Vue', intent: 'warning', removable: true },
    { id: 'framework-4', label: 'Svelte', intent: 'success', removable: true },
    { id: 'framework-5', label: 'Next.js', intent: 'info', removable: true },
    { id: 'framework-6', label: 'Nuxt.js', intent: 'warning', removable: true },
    { id: 'framework-7', label: 'SvelteKit', intent: 'success', removable: true },
  ];

  // CDK 拖拽配置
  cdkConfig = {
    showHandle: true,
    handleIcon: '⋮⋮',
    disabled: false,
    animationDuration: 200,
    orientation: 'vertical' as const
  };


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

  // CDK 版本的排序處理
  onCdkSorted(event: {
    previousIndex: number;
    currentIndex: number;
    items: GxSortableItem[];
    item: GxSortableItem;
  }) {
    console.log('CDK 排序事件:', event);
    const item = event.item as CdkSortableTag;
    console.log(`項目 "${item.label}" 從索引 ${event.previousIndex} 移動到 ${event.currentIndex}`);
    
    // 更新標籤陣列
    this.cdkSortableTags = [...(event.items as CdkSortableTag[])];
  }

  // CDK 版本的項目進入事件
  onCdkItemEntered(event: {
    item: GxSortableItem;
    container: any;
    currentIndex: number;
  }) {
    const item = event.item as CdkSortableTag;
    console.log('項目進入:', item.label, '在索引:', event.currentIndex);
  }

  // CDK 版本的項目離開事件
  onCdkItemExited(event: {
    item: GxSortableItem;
    container: any;
  }) {
    const item = event.item as CdkSortableTag;
    console.log('項目離開:', item.label);
  }

  // 移除 CDK 標籤
  removeCdkTag(id: string | number) {
    this.cdkSortableTags = this.cdkSortableTags.filter(tag => tag.id !== id);
  }

  // CDK 標籤的追蹤函數
  trackByCdkTagId(_: number, tag: CdkSortableTag): string | number {
    return tag.id;
  }

  // 切換 CDK 拖拽啟用狀態
  toggleCdkDragEnabled() {
    this.cdkConfig = {
      ...this.cdkConfig,
      disabled: !this.cdkConfig.disabled
    };
  }

  // 新增標籤到 CDK 版本
  addNewCdkTag() {
    const newId = `framework-${this.cdkSortableTags.length + 1}`;
    const frameworks = ['Solid', 'Qwik', 'Lit', 'Stencil', 'Alpine.js'];
    const intents: GxButtonIntent[] = ['success', 'info', 'warning'];
    
    const newTag: CdkSortableTag = {
      id: newId,
      label: frameworks[Math.floor(Math.random() * frameworks.length)],
      intent: intents[Math.floor(Math.random() * intents.length)],
      removable: true
    };
    
    this.cdkSortableTags = [...this.cdkSortableTags, newTag];
  }
}

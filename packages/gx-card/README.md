# GX-Card

一個功能強大且高度靈活的 Angular 卡片組件庫,提供多種卡片樣式、佈局選項和豐富的互動功能。採用 Angular Standalone Components 架構實現,內建 Signal 狀態管理,適合用於儀表板、產品列表、內容展示等場景。

## ✅ 已完成的組件

### 核心組件
- ✅ `GxCard` - 卡片容器組件(支援多種變體、形狀、點擊互動)
- ✅ `GxCardHeader` - 卡片標頭(支援頭像、標題、副標題、連結)
- ✅ `GxCardContent` - 卡片內容(支援圖片、標籤、描述文字收合)
- ✅ `GxCardFooter` - 卡片底部(支援動作按鈕、自定義樣式)
- ✅ `GxCardGroup` - 卡片群組容器(統一管理多個卡片樣式)

### 指令
- ✅ `GxClickableDirective` - 可點擊指令(提供統一的點擊互動體驗)

### 服務
- ✅ `GxCardConfigService` - 全局卡片配置服務
- ✅ `HeightMeasurementService` - 文字高度測量服務(用於描述文字收合)

### 類型定義
- ✅ `IGxCard` - 卡片資料介面
- ✅ `IGxCardHeader` - 卡片標頭介面
- ✅ `IGxCardContent` - 卡片內容介面
- ✅ `IGxCardFooter` - 卡片底部介面
- ✅ `GxCardVariant` - 卡片變體類型(elevated, outlined, flat)
- ✅ `GxCardLayout` - 卡片佈局類型(grid, single, masonry)
- ✅ `GxCardShape` - 卡片形狀類型(classic, square, landscape, portrait, custom)
- ✅ `GxAction` - 動作按鈕介面
- ✅ `IGxTag` - 標籤介面
- ✅ `IGxDescriptionCollapse` - 描述文字收合配置

## 📦 安裝

```bash
npm install @sanring/gx-card
```

### 依賴

此套件依賴 `@sanring/gx-ui` 提供按鈕和標籤組件:

```bash
npm install @sanring/gx-ui
```

## 🎯 使用方式

### 基本卡片範例

```typescript
import { Component } from '@angular/core';
import { GxCard, GxCardHeader, GxCardContent, GxCardFooter } from '@sanring/gx-card';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [GxCard, GxCardHeader, GxCardContent, GxCardFooter],
  template: `
    <gx-card>
      <gx-card-header
        [title]="'卡片標題'"
        [subtitle]="'這是副標題'">
      </gx-card-header>

      <gx-card-content
        [description]="'這是卡片的描述內容。可以放置任何文字資訊。'">
      </gx-card-content>

      <gx-card-footer
        [actions]="actions"
        (actionClick)="onAction($event)">
      </gx-card-footer>
    </gx-card>
  `
})
export class ExampleComponent {
  actions = [
    { id: 'view', label: '查看', intent: 'primary' as const },
    { id: 'edit', label: '編輯', intent: 'secondary' as const }
  ];

  onAction(action: any) {
    console.log('動作被點擊:', action);
  }
}
```

### 使用資料模式(向後兼容)

```typescript
import { Component } from '@angular/core';
import { GxCard, IGxCard } from '@sanring/gx-card';

@Component({
  selector: 'app-data-example',
  standalone: true,
  imports: [GxCard],
  template: `
    <gx-card
      [data]="cardData"
      [variant]="'elevated'"
      (actions)="onAction($event)">
    </gx-card>
  `
})
export class DataExampleComponent {
  cardData: IGxCard = {
    id: 'card-1',
    header: {
      title: '產品名稱',
      subtitle: '產品副標題',
      avatar: {
        src: 'avatar.jpg',
        alt: '產品圖片'
      }
    },
    content: {
      title: '內容標題',
      description: '這是產品的詳細描述...',
      tags: [
        { id: 'tag1', label: '新品', intent: 'success' },
        { id: 'tag2', label: '熱銷', intent: 'error' }
      ]
    },
    footer: {
      actions: [
        { id: 'buy', label: '立即購買', intent: 'primary' },
        { id: 'fav', label: '加入收藏', intent: 'secondary' }
      ]
    }
  };

  onAction(action: any) {
    console.log('動作:', action);
  }
}
```

### 卡片變體

```typescript
@Component({
  template: `
    <!-- 陰影卡片(預設) -->
    <gx-card [variant]="'elevated'">
      <gx-card-content [title]="'陰影卡片'"></gx-card-content>
    </gx-card>

    <!-- 邊框卡片 -->
    <gx-card [variant]="'outlined'">
      <gx-card-content [title]="'邊框卡片'"></gx-card-content>
    </gx-card>

    <!-- 扁平卡片 -->
    <gx-card [variant]="'flat'">
      <gx-card-content [title]="'扁平卡片'"></gx-card-content>
    </gx-card>
  `
})
```

### 卡片形狀

```typescript
@Component({
  template: `
    <!-- 經典卡片(垂直佈局,完整功能) -->
    <gx-card [shape]="'classic'">
      <gx-card-header [title]="'經典卡片'"></gx-card-header>
      <gx-card-content [description]="'這是經典樣式的卡片'"></gx-card-content>
      <gx-card-footer [actions]="actions"></gx-card-footer>
    </gx-card>

    <!-- 方形卡片(精簡版) -->
    <gx-card [shape]="'square'">
      <gx-card-content [title]="'方形卡片'"></gx-card-content>
      <gx-card-footer [actions]="[{ id: '1', label: '查看' }]"></gx-card-footer>
    </gx-card>

    <!-- 長條形卡片(水平佈局) -->
    <gx-card [shape]="'landscape'" [layout]="'single'">
      <gx-card-header [title]="'長條形卡片'"></gx-card-header>
      <gx-card-content [description]="'適合單一排列的場景'"></gx-card-content>
      <gx-card-footer [actions]="actions"></gx-card-footer>
    </gx-card>
  `
})
```

### 可點擊卡片

```typescript
import { Component } from '@angular/core';
import { GxCard, GxCardContent } from '@sanring/gx-card';

@Component({
  selector: 'app-clickable-card',
  standalone: true,
  imports: [GxCard, GxCardContent],
  template: `
    <gx-card
      [clickable]="true"
      (cardClick)="onCardClick($event)">
      <gx-card-content
        [title]="'可點擊的卡片'"
        [description]="'點擊卡片任何地方都會觸發事件'">
      </gx-card-content>
    </gx-card>
  `
})
export class ClickableCardComponent {
  onCardClick(event: MouseEvent) {
    console.log('卡片被點擊了!', event);
  }
}
```

### Header 點擊功能

```typescript
@Component({
  template: `
    <gx-card
      [headerClickable]="{ avatar: true, title: true }"
      (headerItemClick)="onHeaderItemClick($event)">
      <gx-card-header
        [avatar]="{ src: 'user.jpg', alt: '使用者頭像' }"
        [title]="'使用者名稱'"
        [subtitle]="'2024-01-01'">
      </gx-card-header>
      <gx-card-content [description]="'內容...'"></gx-card-content>
    </gx-card>
  `
})
export class HeaderClickExample {
  onHeaderItemClick(event: any) {
    console.log(`${event.part} 被點擊:`, event.value);
    // event.part 可以是 'avatar', 'title', 或 'subtitle'
  }
}
```

### 描述文字自動收合

```typescript
@Component({
  template: `
    <gx-card>
      <gx-card-content
        [description]="longDescription"
        [descriptionCollapse]="{
          enabled: true,
          maxLines: 3,
          expandText: '顯示更多',
          collapseText: '顯示較少'
        }">
      </gx-card-content>
    </gx-card>
  `
})
export class CollapsibleTextExample {
  longDescription = '這是一段很長的描述文字...(超過3行會自動收合)';
}
```

### 標籤功能

```typescript
import { Component } from '@angular/core';
import { GxCard, GxCardContent } from '@sanring/gx-card';
import { IGxTag } from '@sanring/gx-card';

@Component({
  selector: 'app-tags-example',
  standalone: true,
  imports: [GxCard, GxCardContent],
  template: `
    <gx-card (tagClick)="onTagClick($event)">
      <gx-card-content
        [title]="'產品標題'"
        [tags]="tags">
      </gx-card-content>
    </gx-card>
  `
})
export class TagsExampleComponent {
  tags: IGxTag[] = [
    { id: '1', label: '新品', intent: 'success' },
    { id: '2', label: '熱賣', intent: 'error' },
    { id: '3', label: '限時', intent: 'warning' }
  ];

  onTagClick(event: { tag: IGxTag, event: MouseEvent }) {
    console.log('標籤被點擊:', event.tag);
  }
}
```

### 卡片群組

```typescript
import { Component } from '@angular/core';
import { GxCardGroup, GxCard, GxCardContent } from '@sanring/gx-card';

@Component({
  selector: 'app-card-group',
  standalone: true,
  imports: [GxCardGroup, GxCard, GxCardContent],
  template: `
    <gx-card-group>
      <gx-card>
        <gx-card-content [title]="'卡片 1'"></gx-card-content>
      </gx-card>

      <gx-card>
        <gx-card-content [title]="'卡片 2'"></gx-card-content>
      </gx-card>

      <gx-card>
        <gx-card-content [title]="'卡片 3'"></gx-card-content>
      </gx-card>
    </gx-card-group>
  `,
  styles: [`
    gx-card-group {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
  `]
})
export class CardGroupExample {}
```

### 自定義顏色

```typescript
import { Component } from '@angular/core';
import { GxCard, GxCardContent, IGxCardColors } from '@sanring/gx-card';

@Component({
  selector: 'app-custom-colors',
  standalone: true,
  imports: [GxCard, GxCardContent],
  template: `
    <gx-card [colors]="customColors">
      <gx-card-content
        [title]="'自定義顏色卡片'"
        [description]="'這張卡片使用自定義的顏色配置'">
      </gx-card-content>
    </gx-card>
  `
})
export class CustomColorsExample {
  customColors: IGxCardColors = {
    background: '#f0f9ff',
    textColor: '#0c4a6e',
    borderColor: '#0ea5e9',
    titleColor: '#075985',
    subtitleColor: '#0369a1',
    hoverBackground: '#e0f2fe'
  };
}
```

### 使用 GxClickable 指令

```typescript
import { Component } from '@angular/core';
import { GxClickableDirective, GxClickableEvent } from '@sanring/gx-card';

@Component({
  selector: 'app-clickable-directive',
  standalone: true,
  imports: [GxClickableDirective],
  template: `
    <div
      gxClickable
      [gxClickableData]="userData"
      [gxClickableType]="'text'"
      (gxClick)="onClick($event)">
      點擊這段文字
    </div>

    <img
      gxClickable
      [gxClickableData]="imageData"
      [gxClickableType]="'avatar'"
      [gxClickableShowCursor]="true"
      (gxClick)="onImageClick($event)"
      src="avatar.jpg"
      alt="頭像">
  `
})
export class ClickableDirectiveExample {
  userData = { id: 1, name: 'John' };
  imageData = { url: 'avatar.jpg' };

  onClick(event: GxClickableEvent) {
    console.log('文字被點擊:', event.data);
  }

  onImageClick(event: GxClickableEvent) {
    console.log('圖片被點擊:', event.data);
  }
}
```

## 📖 API 文檔

### GxCard

#### Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `data` | `IGxCard \| undefined` | `undefined` | 卡片資料(向後兼容模式) |
| `variant` | `GxCardVariant \| undefined` | `'elevated'` | 卡片變體(elevated, outlined, flat) |
| `layout` | `GxCardLayout \| undefined` | `'grid'` | 佈局方式(grid, single, masonry) |
| `shape` | `GxCardShape \| undefined` | `'classic'` | 卡片形狀(classic, square, landscape, portrait, custom) |
| `clickable` | `boolean` | `false` | 是否可點擊 |
| `headerClickable` | `boolean \| {avatar?: boolean; title?: boolean; subtitle?: boolean}` | `false` | Header 點擊配置 |
| `colors` | `IGxCardColors \| undefined` | `undefined` | 自定義顏色配置 |

#### Outputs

| 事件 | 類型 | 說明 |
|------|------|------|
| `actions` | `EventEmitter<GxAction>` | 動作按鈕點擊事件 |
| `cardClick` | `EventEmitter<MouseEvent>` | 卡片點擊事件 |
| `tagClick` | `EventEmitter<{tag: IGxTag, event: MouseEvent}>` | 標籤點擊事件 |
| `headerItemClick` | `EventEmitter<{part: string, value: any, event: MouseEvent}>` | Header 子項點擊事件 |

### GxCardHeader

#### Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `data` | `IGxCardHeader \| undefined` | `undefined` | Header 資料 |
| `avatar` | `GxMedia \| undefined` | `undefined` | 頭像圖片 |
| `title` | `string \| undefined` | `undefined` | 標題 |
| `subtitle` | `string \| undefined` | `undefined` | 副標題 |
| `href` | `string \| undefined` | `undefined` | 連結 URL |
| `target` | `'_self' \| '_blank' \| undefined` | `'_self'` | 連結目標 |
| `headerClickable` | `boolean \| {avatar?: boolean; title?: boolean; subtitle?: boolean}` | `false` | Header 點擊控制 |

#### Outputs

| 事件 | 類型 | 說明 |
|------|------|------|
| `headerItemClick` | `EventEmitter<{part: string, value: any, event: MouseEvent}>` | Header 子項點擊事件 |

**插槽:**
- 支援 ng-content 自定義 Header 內容

### GxCardContent

#### Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `data` | `IGxCardContent \| undefined` | `undefined` | Content 資料 |
| `title` | `string \| undefined` | `undefined` | 標題 |
| `subtitle` | `string \| undefined` | `undefined` | 副標題 |
| `description` | `string \| undefined` | `undefined` | 描述文字 |
| `image` | `GxMedia \| undefined` | `undefined` | 圖片 |
| `tags` | `IGxTag[] \| undefined` | `undefined` | 標籤列表 |
| `descriptionCollapse` | `IGxDescriptionCollapse \| undefined` | `undefined` | 描述文字收合配置 |

#### Outputs

| 事件 | 類型 | 說明 |
|------|------|------|
| `tagClick` | `EventEmitter<{tag: IGxTag, event: MouseEvent}>` | 標籤點擊事件 |

**插槽:**
- 支援 ng-content 自定義 Content 內容

### GxCardFooter

#### Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `data` | `IGxCardFooter \| undefined` | `undefined` | Footer 資料 |
| `actions` | `GxAction[] \| undefined` | `undefined` | 動作按鈕列表 |
| `buttonVariant` | `'filled' \| 'outline' \| 'soft' \| 'ghost' \| undefined` | `'filled'` | 按鈕樣式 |
| `maxActions` | `number \| undefined` | `Infinity` | 最大顯示動作數量 |

#### Outputs

| 事件 | 類型 | 說明 |
|------|------|------|
| `actionClick` | `EventEmitter<GxAction>` | 動作點擊事件 |

**插槽:**
- 支援 ng-content 自定義 Footer 內容

### GxCardGroup

GxCardGroup 是一個容器組件,用於統一管理多個卡片的樣式。

**提供者:**
- 提供 `GxCardGroupContext` 給子卡片

### GxClickableDirective

#### Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `gxClickableData` | `T \| undefined` | `undefined` | 要傳遞的資料 |
| `gxClickableDisabled` | `boolean` | `false` | 是否禁用點擊 |
| `gxClickableShowCursor` | `boolean` | `true` | 是否顯示點擊游標 |
| `gxClickableClass` | `string` | `''` | 自定義樣式類別 |
| `gxClickableType` | `'text' \| 'avatar' \| 'header' \| ''` | `''` | 預設型別樣式 |
| `gxClickableHoverClass` | `string` | `'gx-clickable-hover'` | Hover 樣式類別 |

#### Outputs

| 事件 | 類型 | 說明 |
|------|------|------|
| `gxClick` | `EventEmitter<GxClickableEvent<T>>` | 點擊事件 |

### 介面定義

#### IGxCard

```typescript
interface IGxCard {
  id?: string;
  variant?: GxCardVariant;
  header?: IGxCardHeader;
  content: IGxCardContent;
  footer?: IGxCardFooter;
  shape?: GxCardShape;
  href?: string;
  target?: '_self' | '_blank';
}
```

#### IGxCardHeader

```typescript
interface IGxCardHeader {
  avatar?: GxMedia;
  title?: string;
  subtitle?: string;
  href?: string;
  target?: '_self' | '_blank';
}
```

#### IGxCardContent

```typescript
interface IGxCardContent {
  title?: string;
  subtitle?: string;
  description?: string;
  descriptionCollapse?: IGxDescriptionCollapse;
  tags?: IGxTag[];
  image?: GxMedia;
}
```

#### IGxCardFooter

```typescript
interface IGxCardFooter {
  actions: GxAction[];
}
```

#### GxAction

```typescript
interface GxAction {
  id: string;
  label: string;
  icon?: string;
  intent?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  href?: string;
  target?: '_self' | '_blank';
}
```

#### IGxTag

```typescript
interface IGxTag {
  id: string;
  label: string;
  intent?: 'info' | 'success' | 'warning' | 'error';
  disabled?: boolean;
  removable?: boolean;
}
```

#### IGxDescriptionCollapse

```typescript
interface IGxDescriptionCollapse {
  enabled: boolean;
  maxLines?: number;        // 預設: 3
  fontSize?: number;        // 預設: 14
  lineHeight?: number;      // 預設: 20
  expandText?: string;      // 預設: '展開更多'
  collapseText?: string;    // 預設: '收起內容'
}
```

#### IGxCardColors

```typescript
interface IGxCardColors {
  background?: string;
  textColor?: string;
  borderColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  hoverBackground?: string;
}
```

#### GxMedia

```typescript
type GxMedia = {
  src: string;
  alt?: string;
  ratio?: string;  // 例如: '1:1', '16:9', '3:4', 'auto'
};
```

## 🎨 樣式自定義

### 卡片容器樣式

```css
:root {
  /* 卡片背景 */
  --gx-card-background: #ffffff;
  --gx-card-background-hover: #f9fafb;

  /* 卡片陰影 */
  --gx-card-shadow-elevated: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --gx-card-shadow-hover: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  /* 卡片邊框 */
  --gx-card-border-color: #e5e7eb;
  --gx-card-border-width: 1px;
  --gx-card-border-radius: 0.5rem;

  /* 卡片間距 */
  --gx-card-padding: 1rem;
}
```

### 文字顏色

```css
:root {
  /* 標題顏色 */
  --gx-card-title-color: #111827;
  --gx-card-title-font-size: 1.125rem;
  --gx-card-title-font-weight: 600;

  /* 副標題顏色 */
  --gx-card-subtitle-color: #6b7280;
  --gx-card-subtitle-font-size: 0.875rem;

  /* 內容文字 */
  --gx-card-text-color: #374151;
  --gx-card-description-color: #4b5563;
}
```

### Header 樣式

```css
:root {
  /* Header 背景 */
  --gx-card-header-bg: transparent;
  --gx-card-header-padding: 1rem;

  /* Avatar */
  --gx-card-avatar-size: 2.5rem;
  --gx-card-avatar-border-radius: 50%;
}
```

### Footer 樣式

```css
:root {
  /* Footer 背景 */
  --gx-card-footer-bg: transparent;
  --gx-card-footer-padding: 1rem;
  --gx-card-footer-border-top: 1px solid #e5e7eb;

  /* 按鈕間距 */
  --gx-card-actions-gap: 0.5rem;
}
```

## 🔄 技術實現

本組件庫採用 Angular 18+ 的 Standalone Components 架構,提供現代化的卡片解決方案。

### 組件架構

| 組件名稱 | 功能說明 |
|---------|---------|
| `GxCard` | 卡片容器,管理整體佈局與樣式 |
| `GxCardHeader` | 卡片標頭,顯示頭像、標題、副標題 |
| `GxCardContent` | 卡片內容,支援圖片、標籤、描述文字 |
| `GxCardFooter` | 卡片底部,提供動作按鈕 |
| `GxCardGroup` | 卡片群組,統一管理多個卡片 |
| `GxClickableDirective` | 可點擊指令,提供統一的點擊互動 |
| `GxCardConfigService` | 全局配置服務 |
| `HeightMeasurementService` | 高度測量服務 |

### 核心特點
- **響應式狀態管理**: 完全使用 Angular Signals,提供高效能的資料響應
- **靈活的佈局系統**: 支援 Grid、Single、Masonry 多種佈局
- **多樣的卡片形狀**: Classic、Square、Landscape、Portrait、Custom
- **豐富的互動功能**: 卡片點擊、Header 點擊、標籤點擊、動作按鈕
- **智能文字收合**: 自動測量文字高度,提供展開/收起功能
- **完整的樣式系統**: CSS 變數與自定義類別雙重支援
- **無障礙支援**: 遵循 ARIA 標準,提供良好的可訪問性
- **高度可客製化**: 支援 ng-content 投影與資料模式雙重使用方式

### 使用場景
- 產品列表與卡片展示
- 儀表板與資訊卡片
- 部落格文章列表
- 使用者個人資料卡
- 社群媒體貼文
- 任何需要卡片佈局的場景

## 🛠️ 開發

```bash
# 安裝依賴
cd packages/gx-card
npm install

# 構建
npm run build

# 查看生成的文件
ls -la ../../dist/gx-card
```

## 🤝 貢獻

歡迎提交 Issue 與 Pull Request 來改進組件功能!

## 📄 授權

MIT

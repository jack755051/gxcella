# GX-Breadcrumb

Angular 麵包屑導航組件，支援自動路由生成和手動配置兩種模式。

## ✨ 特性

- ✅ **雙模式支援**：手動配置或自動路由生成
- ✅ **靈活的圖標支援**：Lucide 圖標（可選）或文字/Emoji 圖標
- ✅ **主題系統**：內建 default、glass 等主題
- ✅ **響應式設計**：支援不同螢幕尺寸
- ✅ **完整的樣式自定義**：CSS 變數支援
- ✅ **無障礙支援**：符合 ARIA 標準
- ✅ **TypeScript**：完整的類型定義

## 📦 安裝

```bash
npm install @sanring/gx-breadcrumb
```

### 可選依賴

如果你想使用 Lucide 圖標：

```bash
npm install lucide-angular
```

> **注意**：`lucide-angular` 是**可選的**。你可以使用文字或 Emoji 圖標而無需安裝它。

## 🎯 使用方式

### 模式 1：手動模式（提供 data）

```typescript
import { Component } from '@angular/core';
import { GxBreadcrumb, IGxBreadCrumb } from '@sanring/gx-breadcrumb';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [GxBreadcrumb],
  template: `
    <gx-breadcrumb
      [data]="breadcrumbs"
      [showIcon]="true">
    </gx-breadcrumb>
  `
})
export class ExampleComponent {
  breadcrumbs: IGxBreadCrumb[] = [
    { label: '首頁', link: '/', icon: '🏠' },
    { label: '產品', link: '/products', icon: '📦' },
    { label: '詳情', link: '/products/123', icon: '📄' }
  ];
}
```

### 模式 2：自動模式（基於路由）

**1. 配置路由：**

```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: '首頁' }
  },
  {
    path: 'products',
    data: { breadcrumb: '產品列表' },
    children: [
      {
        path: ':id',
        data: {
          breadcrumb: (route) => {
            // 動態麵包屑
            return `產品 ${route.params['id']}`;
          }
        }
      }
    ]
  }
];
```

**2. 使用組件：**

```typescript
import { Component } from '@angular/core';
import { GxBreadcrumb } from '@sanring/gx-breadcrumb';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [GxBreadcrumb],
  template: `
    <!-- 不提供 data，自動從路由生成 -->
    <gx-breadcrumb [showIcon]="true"></gx-breadcrumb>
  `
})
export class LayoutComponent {}
```

### 圖標使用方式

#### 選項 1：使用 Lucide 圖標（需要安裝 lucide-angular）

```typescript
import { Component } from '@angular/core';
import { GxBreadcrumb, IGxBreadCrumb } from '@sanring/gx-breadcrumb';
import { Home, Package, FileText } from 'lucide-angular';

@Component({
  template: `
    <gx-breadcrumb
      [data]="breadcrumbs"
      [showIcon]="true">
    </gx-breadcrumb>
  `
})
export class MyComponent {
  breadcrumbs: IGxBreadCrumb[] = [
    { label: '首頁', link: '/', iconImg: Home },
    { label: '產品', link: '/products', iconImg: Package },
    { label: '詳情', link: '/products/123', iconImg: FileText }
  ];
}
```

#### 選項 2：使用文字/Emoji 圖標（無需額外安裝）

```typescript
breadcrumbs: IGxBreadCrumb[] = [
  { label: '首頁', link: '/', icon: '🏠' },
  { label: '產品', link: '/products', icon: '📦' },
  { label: '詳情', link: '/products/123', icon: '📄' }
];
```

### 自定義分隔符號

```typescript
import { GxBreadcrumbSeparator } from '@sanring/gx-breadcrumb';

@Component({
  template: `
    <gx-breadcrumb
      [data]="breadcrumbs"
      [separator]="separator">
    </gx-breadcrumb>
  `
})
export class MyComponent {
  separator = GxBreadcrumbSeparator.Arrow; // '›'
  // 其他選項：
  // GxBreadcrumbSeparator.Slash  → '/'
  // GxBreadcrumbSeparator.Dot    → '·'
  // GxBreadcrumbSeparator.Hyphen → '–'
}
```

### 主題和變體

```typescript
@Component({
  template: `
    <gx-breadcrumb
      [data]="breadcrumbs"
      [theme]="'default'"
      [variant]="'glass'">
    </gx-breadcrumb>
  `
})
```

## 📖 API 文檔

### GxBreadcrumb

#### Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `data` | `IGxBreadCrumb[]` | `null` | 手動模式：提供麵包屑數據。不提供則使用自動模式 |
| `theme` | `GxTheme` | `'default'` | 主題樣式 |
| `variant` | `GxVariant` | `'modern'` | 變體樣式（`'modern'` \| `'glass'`） |
| `separator` | `GxBreadcrumbSeparator` | `Slash` | 分隔符號 |
| `showIcon` | `boolean` | `false` | 是否顯示圖標 |
| `rootCrumb` | `IGxBreadCrumb \| false \| undefined` | `undefined` | 自定義根麵包屑 |

#### Outputs

| 事件 | 類型 | 說明 |
|------|------|------|
| `itemClick` | `EventEmitter<IGxBreadCrumb>` | 點擊麵包屑項目時觸發 |

### IGxBreadCrumb 介面

```typescript
interface IGxBreadCrumb {
  label: string;           // 顯示文字
  link?: string;           // 連結路徑
  icon?: string;           // 文字/Emoji 圖標（不需要 lucide-angular）
  iconImg?: any;           // Lucide 圖標（需要 lucide-angular）
  active?: boolean;        // 是否為當前頁
  disabled?: boolean;      // 是否禁用
  [key: string]: any;      // 其他自定義屬性
}
```

### GxBreadcrumbSeparator 枚舉

```typescript
enum GxBreadcrumbSeparator {
  Slash = 'slash',   // '/'
  Arrow = 'arrow',   // '›'
  Dot = 'dot',       // '·'
  Hyphen = 'hyphen'  // '–'
}
```

## 🎨 樣式自定義

使用 CSS 變數進行自定義：

```css
:root {
  /* 麵包屑顏色 */
  --gx-bc-fg: var(--gx-color-gray-900);           /* 文字顏色 */
  --gx-bc-muted: var(--gx-color-gray-500);        /* 非活動項顏色 */
  --gx-bc-hover: var(--gx-color-accent-500);      /* Hover 顏色 */

  /* 字重 */
  --gx-normal-weight: var(--gx-weight-medium);    /* 一般字重 */
  --gx-active-weight: var(--gx-weight-extraBold); /* 活動項字重 */

  /* 間距 */
  --gx-bc-gap: 16px;                              /* 項目間距 */
  --gx-bc-item-gap: 16px;                         /* 圖標與文字間距 */

  /* 效果 */
  --gx-bc-scale: 1.03;                            /* Hover 縮放 */
  --gx-bc-fsz: 16px;                              /* 字體大小 */

  /* 容器 */
  --gx-breadcrumb-bg: var(--gx-color-gray-50);    /* 背景色 */
}
```

### Glass 變體樣式

```css
:root {
  /* Glass 效果會自動套用半透明和毛玻璃效果 */
  --gx-breadcrumb-glass-bg: rgba(255, 255, 255, 0.25);
  --gx-breadcrumb-glass-border: rgba(255, 255, 255, 0.3);
}
```

## 🔧 進階用法

### 自定義根麵包屑

```typescript
@Component({
  template: `
    <gx-breadcrumb
      [rootCrumb]="customRoot">
    </gx-breadcrumb>
  `
})
export class MyComponent {
  customRoot: IGxBreadCrumb = {
    label: '控制台',
    link: '/dashboard',
    icon: '📊'
  };
}
```

### 動態路由麵包屑

```typescript
// app.routes.ts
{
  path: 'users/:id',
  data: {
    breadcrumb: (route: ActivatedRouteSnapshot) => {
      const userId = route.params['id'];
      return `用戶 ${userId}`;
    }
  }
}
```

### 禁用特定麵包屑

```typescript
breadcrumbs: IGxBreadCrumb[] = [
  { label: '首頁', link: '/' },
  { label: '設定', link: '/settings', disabled: true }, // 禁用
  { label: '個人資料', link: '/settings/profile' }
];
```

## 📝 完整範例

```typescript
import { Component } from '@angular/core';
import { GxBreadcrumb, IGxBreadCrumb, GxBreadcrumbSeparator } from '@sanring/gx-breadcrumb';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [GxBreadcrumb],
  template: `
    <gx-breadcrumb
      [data]="breadcrumbs"
      [showIcon]="true"
      [separator]="separator"
      [variant]="'glass'"
      (itemClick)="onBreadcrumbClick($event)">
    </gx-breadcrumb>

    <div class="content">
      <!-- 頁面內容 -->
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 20px;
    }
  `]
})
export class ProductDetailComponent {
  separator = GxBreadcrumbSeparator.Arrow;

  breadcrumbs: IGxBreadCrumb[] = [
    { label: '首頁', link: '/', icon: '🏠' },
    { label: '產品', link: '/products', icon: '📦' },
    { label: '電子產品', link: '/products/electronics', icon: '💻' },
    { label: 'iPhone 15', icon: '📱' }
  ];

  onBreadcrumbClick(crumb: IGxBreadCrumb) {
    console.log('Clicked:', crumb);
  }
}
```

## 🐛 常見問題

### Q: 為什麼分隔符號不顯示？

**A:** 有兩個可能原因：

#### 原因 1：沒有麵包屑數據

確保你提供了麵包屑數據。有兩種方式：

1. **手動模式**：提供 `[data]` input
   ```typescript
   <gx-breadcrumb [data]="breadcrumbs"></gx-breadcrumb>
   ```

2. **自動模式**：配置路由的 `breadcrumb` data
   ```typescript
   {
     path: 'products',
     data: { breadcrumb: '產品' }
   }
   ```

#### 原因 2：CSS 變數未定義（分隔符號顏色透明）

如果分隔符號存在但看不見，可能是 CSS 變數未定義。解決方法：

在你的全局 CSS 中添加：

```css
:root {
  --gx-color-gray-500: #6b7280;  /* 分隔符號顏色 */
}
```

或直接覆蓋：

```css
.gx-breadcrumb-separator {
  color: #6b7280 !important;
}
```

**注意**：從 v3.1.0 開始，組件已內建回退值 `#6b7280`，即使沒有定義 CSS 變數也能正常顯示。

### Q: Lucide 圖標不顯示？

**A:** 確保已安裝並導入 `lucide-angular`：

```bash
npm install lucide-angular
```

如果不想使用 Lucide，可以使用 `icon` 屬性配合 Emoji 或文字：

```typescript
{ label: '首頁', icon: '🏠' }  // ✅ 不需要 lucide-angular
```

### Q: 如何自定義樣式？

**A:** 使用 CSS 變數覆蓋默認樣式：

```css
:root {
  --gx-bc-hover: #3b82f6;
  --gx-bc-fsz: 18px;
}
```

## 📚 參考資料

- [Angular Router](https://angular.dev/guide/routing)
- [Lucide Icons](https://lucide.dev/)
- [ARIA Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

## 🤝 貢獻

歡迎提交 Issue 或 Pull Request！

## 📄 授權

MIT License

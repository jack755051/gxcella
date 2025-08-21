# GX-UI 元件庫操作指南

## 概述

GX-UI 是一個基於 Angular 的元件庫，提供了多種可重複使用的 UI 元件。本指南將詳細介紹如何使用 GX-UI 中的各種元件。

## 安裝與引入

### 安裝

```bash
npm install @sanring/gx-ui
```

### 在元件中引入

```typescript
import { GxLoading, GxSkeleton } from "@sanring/gx-ui";

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    GxLoading,
    GxSkeleton
  ],
  // ...
})
export class ExampleComponent {}
```

## GxLoading 載入元件

### 基本用法

GxLoading 元件提供了多種載入動畫效果，支援兩種主要類型：`bar` (條狀) 和 `spinner` (旋轉)。

#### 條狀載入動畫 (Bar)

```html
<gx-loading
  [type]="'bar'"
  [size]="'lg'"
  [barsAmount]="7"
  [color]="'var(--gx-color-primary-500)'"
></gx-loading>
```

#### 旋轉載入動畫 (Spinner)

```html
<gx-loading
  [type]="'spinner'"
  [size]="'md'"
  [strokeWidth]="4"
  [colors]="['var(--gx-color-primary-500)', 'var(--gx-color-accent-400)']"
  [ngStyle]="{'--spinner-size': '40px'}"
></gx-loading>
```

### 輸入屬性 (Input Properties)

| 屬性名稱 | 類型 | 預設值 | 說明 |
|---------|------|--------|------|
| `type` | `GxLoadingType` | `'bar'` | 載入動畫類型：`'bar'` \| `'spinner'` \| `'dots'` \| `'skeleton'` |
| `size` | `GxLoadingSize` | `'md'` | 尺寸大小：`'sm'` \| `'md'` \| `'lg'` |
| `speed` | `GxLoadingSpeed` | `'normal'` | 動畫速度：`'slow'` \| `'normal'` \| `'fast'` |
| `color` | `string` | `undefined` | 單一顏色設定 |
| `colors` | `string[]` | `undefined` | 多色設定 (僅 spinner 類型適用) |
| `strokeWidth` | `number` | `4` | 線條寬度 (1-8) |
| `barsAmount` | `number` | `5` | 條狀數量 (3-12) |

### 尺寸對應表

| 尺寸 | 像素值 | 間隙 |
|------|--------|------|
| `sm` | 24px | 4px |
| `md` | 40px | 8px |
| `lg` | 56px | 10px |

### 速度對應表

| 速度 | 持續時間 |
|------|----------|
| `slow` | 1.2s |
| `normal` | 0.8s |
| `fast` | 0.5s |

### 使用範例

#### 範例 1：基本條狀載入

```html
<gx-loading></gx-loading>
```

#### 範例 2：大型條狀載入with自定義顏色

```html
<gx-loading
  [type]="'bar'"
  [size]="'lg'"
  [barsAmount]="7"
  [color]="'var(--gx-color-primary-500)'"
></gx-loading>
```

#### 範例 3：多色旋轉載入

```html
<gx-loading
  [type]="'spinner'"
  [colors]="['var(--gx-color-primary-500)', 'var(--gx-color-accent-400)']"
  [ngStyle]="{'--spinner-size': '40px'}"
></gx-loading>
```

#### 範例 4：快速小型載入

```html
<gx-loading
  [type]="'bar'"
  [size]="'sm'"
  [speed]="'fast'"
  [color]="'#007acc'"
></gx-loading>
```

### 自定義樣式

可以透過 CSS 變數來進一步自定義載入元件的外觀：

```html
<gx-loading
  [type]="'spinner'"
  [ngStyle]="{
    '--spinner-size': '60px',
    '--gx-loading-color': '#ff6b6b'
  }"
></gx-loading>
```

### CSS 變數

| CSS 變數名稱 | 說明 |
|-------------|------|
| `--gx-loading-base-height` | 基礎高度 |
| `--gx-loading-bar-gap` | 條狀間隙 |
| `--gx-loading-radius` | 圓角半徑 |
| `--gx-loading-bar-duration` | 動畫持續時間 |
| `--gx-loading-spinner-size` | 旋轉器尺寸 |
| `--gx-loading-bar-color` | 條狀顏色 |

## GxSkeleton 骨架屏元件

### 基本用法

```html
<gx-skeleton></gx-skeleton>
```

骨架屏元件用於在內容載入前顯示佔位動畫，提升用戶體驗。

## 實際應用範例

### 在 Loading Demo 頁面中的使用

根據 `loading-demo.html` 的實際使用範例：

```typescript
// loading-demo.ts
import { Component } from '@angular/core';
import { GxLoading } from "@sanring/gx-ui";
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-loading-demo',
  standalone: true,
  imports: [
    GxLoading,
    NgStyle
  ],
  templateUrl: './loading-demo.html',
  styleUrls: ['./loading-demo.css']
})
export class LoadingDemo {}
```

```html
<!-- loading-demo.html -->
<!-- 大型條狀載入，7個條狀 -->
<gx-loading
  [barsAmount]="7"
  [size]="'lg'"
  [color]="'var(--gx-color-primary-500)'"
></gx-loading>

<!-- 自定義尺寸的旋轉載入，雙色漸變 -->
<gx-loading
  [type]="'spinner'"
  [ngStyle]="{'--spinner-size': '40px'}"
  [colors]="['var(--gx-color-primary-500)','var(--gx-color-accent-400)']"
></gx-loading>
```

## 最佳實踐

1. **顏色一致性**: 使用 CSS 變數來保持整個應用程式的顏色一致性
2. **尺寸選擇**: 根據使用場景選擇合適的尺寸
   - `sm`: 適用於按鈕內或小型元件
   - `md`: 適用於一般內容區域
   - `lg`: 適用於全頁載入或大型區塊
3. **動畫速度**: 根據載入時間長短選擇合適的速度
4. **可訪問性**: 確保載入動畫不會對有動畫敏感的用戶造成不適

## 常見問題

### Q: 如何自定義載入動畫的顏色？
A: 可以使用 `color` 屬性設定單一顏色，或使用 `colors` 屬性設定多色效果（僅 spinner 類型）。

### Q: 條狀載入的條狀數量有限制嗎？
A: 是的，`barsAmount` 的範圍是 3-12，超出範圍會自動修正到邊界值。

### Q: 如何讓載入動畫佔滿整個容器？
A: 可以透過 CSS 或 `ngStyle` 設定容器的寬度和高度。

## 更新日誌

- 支援 Angular 17+ 的 standalone 元件
- 提供完整的 TypeScript 類型定義
- 支援 CSS 變數自定義
- 響應式設計支援

---

*本指南基於 GX-UI 當前版本編寫，如有更新請參考最新的 API 文件。*

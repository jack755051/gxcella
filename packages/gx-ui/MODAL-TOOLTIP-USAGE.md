# Modal & Tooltip 組件使用指南

本文件說明如何使用新增的 Modal (Dialog) 和 Tooltip 組件。

## Modal 組件

Modal 組件提供了一個彈出式對話框,支援標題、內容、按鈕和自訂樣式。

### 基本使用

```typescript
import { Component, signal } from '@angular/core';
import { GxModal, GxModalButton } from '@sanring/gx-ui';

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [GxModal],
    template: `
        <button (click)="showModal.set(true)">開啟 Modal</button>

        <gx-modal
            [visible]="showModal()"
            [title]="'確認操作'"
            [size]="'md'"
            [buttons]="buttons()"
            (closed)="onModalClose()"
            (visibleChange)="showModal.set($event)">
            <p>這是 Modal 的內容區域</p>
            <p>你可以放置任何內容在這裡</p>
        </gx-modal>
    `
})
export class ExampleComponent {
    showModal = signal(false);

    buttons = signal<GxModalButton[]>([
        {
            action: {
                label: '取消',
                handler: () => this.showModal.set(false)
            },
            variant: 'outlined',
            intent: 'secondary'
        },
        {
            action: {
                label: '確認',
                handler: () => this.handleConfirm()
            },
            variant: 'filled',
            intent: 'primary'
        }
    ]);

    handleConfirm() {
        console.log('已確認');
        this.showModal.set(false);
    }

    onModalClose() {
        console.log('Modal 已關閉');
    }
}
```

### Modal 屬性

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `visible` | `boolean` | `false` | 控制 Modal 顯示/隱藏 |
| `title` | `string` | `''` | Modal 標題 |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal 大小預設值 |
| `width` | `string` | `undefined` | 自訂寬度 (覆蓋 size) |
| `height` | `string` | `'auto'` | 自訂高度 |
| `showClose` | `boolean` | `true` | 顯示關閉按鈕 |
| `closeOnBackdrop` | `boolean` | `true` | 點擊背景關閉 |
| `closeOnEsc` | `boolean` | `true` | ESC 鍵關閉 |
| `titlePosition` | `'left' \| 'center' \| 'right'` | `'center'` | 標題對齊方式 |
| `buttonPosition` | `'left' \| 'center' \| 'right'` | `'center'` | 按鈕對齊方式 |
| `buttons` | `GxModalButton[]` | `[]` | 底部按鈕陣列 |
| `titleIcon` | `string` | `undefined` | 標題 icon 名稱 |
| `titleIconSize` | `number` | `20` | 標題 icon 大小 |
| `customClass` | `string` | `''` | 自訂 CSS class |

### Modal 事件

| 事件 | 參數 | 說明 |
|------|------|------|
| `closed` | `void` | Modal 關閉時觸發 |
| `visibleChange` | `boolean` | visible 狀態改變時觸發 |

### 進階範例

#### 使用 Icon

```typescript
<gx-modal
    [visible]="showModal()"
    [title]="'警告'"
    [titleIcon]="'alert-triangle'"
    [titleIconSize]="24">
    <p>這是一個帶有 icon 的警告訊息</p>
</gx-modal>
```

#### 自訂大小

```typescript
<gx-modal
    [visible]="showModal()"
    [title]="'自訂大小'"
    [width]="'800px'"
    [height]="'600px'">
    <p>這是一個自訂大小的 Modal</p>
</gx-modal>
```

#### 自訂 Footer

```typescript
<gx-modal
    [visible]="showModal()"
    [title]="'自訂 Footer'">
    <p>Modal 內容</p>

    <div footer class="custom-footer">
        <button>自訂按鈕 1</button>
        <button>自訂按鈕 2</button>
    </div>
</gx-modal>
```

---

## Tooltip 組件

Tooltip 提供了一個簡單的提示框,可以應用於任何元素上。

### 基本使用

```typescript
import { Component } from '@angular/core';
import { GxTooltip } from '@sanring/gx-ui';

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [GxTooltip],
    template: `
        <button gxTooltip="這是一個提示訊息">
            Hover me
        </button>

        <div
            gxTooltip="更多資訊"
            [tooltipPosition]="'right'"
            [tooltipTheme]="'light'">
            帶有提示的文字
        </div>
    `
})
export class ExampleComponent {}
```

### Tooltip 屬性

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `gxTooltip` | `string` | `''` | Tooltip 內容文字 |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip 位置 |
| `tooltipTheme` | `'dark' \| 'light'` | `'dark'` | Tooltip 主題 |
| `tooltipShowDelay` | `number` | `200` | 顯示延遲 (毫秒) |
| `tooltipHideDelay` | `number` | `0` | 隱藏延遲 (毫秒) |
| `tooltipShowArrow` | `boolean` | `true` | 顯示箭頭 |
| `tooltipOffset` | `number` | `8` | 與元素的距離 (px) |

### 範例

#### 不同位置

```typescript
<button gxTooltip="上方提示" [tooltipPosition]="'top'">Top</button>
<button gxTooltip="下方提示" [tooltipPosition]="'bottom'">Bottom</button>
<button gxTooltip="左側提示" [tooltipPosition]="'left'">Left</button>
<button gxTooltip="右側提示" [tooltipPosition]="'right'">Right</button>
```

#### 亮色主題

```typescript
<button
    gxTooltip="亮色主題提示"
    [tooltipTheme]="'light'">
    Light Theme
</button>
```

#### 自訂延遲

```typescript
<button
    gxTooltip="延遲顯示"
    [tooltipShowDelay]="500"
    [tooltipHideDelay]="200">
    Delayed Tooltip
</button>
```

#### 無箭頭

```typescript
<button
    gxTooltip="無箭頭提示"
    [tooltipShowArrow]="false">
    No Arrow
</button>
```

---

## 樣式自訂

兩個組件都支援 CSS 變數自訂,你可以在全域樣式或組件樣式中覆寫這些變數。

### Modal 樣式變數

```css
:root {
    --gx-modal-bg: white;
    --gx-modal-border-radius: 12px;
    --gx-modal-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    --gx-modal-header-padding: 20px 24px;
    --gx-modal-content-padding: 24px;
    --gx-modal-footer-padding: 16px 24px;
    --gx-modal-border-color: #e5e7eb;
    --gx-modal-title-color: #111827;
    --gx-modal-close-color: #6b7280;
    --gx-modal-close-hover-color: #111827;
}
```

### Tooltip 樣式變數

```css
:root {
    --gx-tooltip-bg-dark: #1f2937;
    --gx-tooltip-bg-light: #ffffff;
    --gx-tooltip-text-dark: #ffffff;
    --gx-tooltip-text-light: #1f2937;
    --gx-tooltip-padding: 6px 12px;
    --gx-tooltip-border-radius: 6px;
    --gx-tooltip-font-size: 14px;
    --gx-tooltip-max-width: 300px;
    --gx-tooltip-arrow-size: 6px;
}
```

---

## 注意事項

1. **Modal**:
   - Modal 使用 `GxOverlay` 組件作為背景遮罩
   - 支援 ESC 鍵和點擊背景關閉
   - 可以透過 `buttons` 屬性或自訂 footer slot 來控制按鈕

2. **Tooltip**:
   - Tooltip 會自動調整位置以保持在視窗範圍內
   - 點擊元素會立即隱藏 Tooltip
   - Tooltip 使用 `position: fixed` 定位,確保在所有情況下都能正確顯示

3. **依賴**:
   - Modal 依賴 `GxOverlay`, `GxButton`, 和 `GxIcon` 組件
   - 確保這些組件已正確匯入

---

## 完整範例

查看 `gx-ui` 套件的測試檔案以獲取更多使用範例。

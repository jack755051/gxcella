# GxSelect

下拉選擇組件，支援 Intent 系統和現代化樣式變體。

## 特色

- ✅ **雙向綁定** - 使用 Angular signals 的 `model()`
- ✅ **Intent 系統** - info/success/warning/error 語義色彩
- ✅ **多種變體** - outline/filled/soft/ghost/glass
- ✅ **尺寸選擇** - sm/md/lg
- ✅ **空選項支援** - 可自訂 placeholder
- ✅ **深色模式** - 自動響應系統主題
- ✅ **完全可自訂** - 所有樣式變數可覆寫

---

## 基本用法

### 1. 導入組件

```typescript
import { GxSelect } from '@sanring/gx-ui';

@Component({
    standalone: true,
    imports: [GxSelect],
    // ...
})
export class MyComponent {}
```

### 2. 使用組件

```typescript
import { signal } from '@angular/core';
import { GxSelectOption } from '@sanring/gx-ui';

export class MyComponent {
    // 定義選項
    options: GxSelectOption[] = [
        { label: '選項 1', value: '1' },
        { label: '選項 2', value: '2' },
        { label: '選項 3', value: '3' }
    ];

    // 綁定值
    selectedValue = signal<string | null>(null);
}
```

```html
<!-- 基本使用 -->
<gx-select
    [options]="options"
    [(value)]="selectedValue"
/>

<!-- 當前選中值：{{ selectedValue() }} -->
```

---

## API 參考

### Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `value` | `model<T \| null>` | `null` | 當前選中值（雙向綁定） |
| `options` | `GxSelectOption<T>[]` | `required` | 選項列表 |
| `showNullOption` | `boolean` | `false` | 是否顯示空選項（placeholder） |
| `nullOption` | `GxSelectNullOption` | `{ label: '請選擇', disabled: true }` | 空選項配置 |
| `intent` | `GxSelectIntent` | `'info'` | Intent 語義色彩 |
| `variant` | `GxSelectVariant` | `'outline'` | 樣式變體 |
| `size` | `GxSelectSize` | `'md'` | 尺寸 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `id` | `string` | `undefined` | 欄位 ID |
| `name` | `string` | `undefined` | 欄位名稱 |

### Outputs

| 事件 | 類型 | 說明 |
|------|------|------|
| `valueChange` | `EventEmitter<T \| null>` | 值變更事件 |

### 類型定義

```typescript
// 選項類型
export interface GxSelectOption<T = any> {
    label: string;       // 顯示文字
    value: T;           // 選項值
    disabled?: boolean; // 是否禁用
}

// 空選項配置
export interface GxSelectNullOption {
    label?: string;     // 預設：「請選擇」
    disabled?: boolean; // 預設：true
    hidden?: boolean;   // 預設：false
}

// Intent 類型
export type GxSelectIntent = 'info' | 'success' | 'warning' | 'error';

// Variant 類型
export type GxSelectVariant = 'filled' | 'outline' | 'soft' | 'ghost' | 'glass';

// Size 類型
export type GxSelectSize = 'sm' | 'md' | 'lg';
```

---

## 使用範例

### 基本範例

```html
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    intent="info"
    variant="outline"
    size="md"
/>
```

### 帶 Placeholder

```html
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    [showNullOption]="true"
    [nullOption]="{ label: '請選擇一個選項', disabled: true }"
/>
```

### 不同尺寸

```html
<!-- 小尺寸 -->
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    size="sm"
/>

<!-- 中尺寸（預設） -->
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    size="md"
/>

<!-- 大尺寸 -->
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    size="lg"
/>
```

### 不同 Intent

```html
<!-- Info（預設） -->
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    intent="info"
/>

<!-- Success -->
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    intent="success"
/>

<!-- Warning -->
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    intent="warning"
/>

<!-- Error -->
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    intent="error"
/>
```

### 不同變體

```html
<!-- Outline（預設） -->
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    variant="outline"
/>

<!-- Filled -->
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    variant="filled"
/>

<!-- Soft -->
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    variant="soft"
/>

<!-- Ghost -->
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    variant="ghost"
/>

<!-- Glass（玻璃態） -->
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    variant="glass"
/>
```

### 禁用狀態

```html
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    [disabled]="true"
/>
```

### 監聽變更事件

```typescript
export class MyComponent {
    onValueChange(value: string | null) {
        console.log('新選中值：', value);
    }
}
```

```html
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    (valueChange)="onValueChange($event)"
/>
```

### 搭配表單使用

```html
<form>
    <label>選擇國家：</label>
    <gx-select
        [options]="countries"
        [(value)]="selectedCountry"
        [showNullOption]="true"
        id="country"
        name="country"
    />
</form>
```

### 搭配 gx-pagination 使用

```typescript
export class TableComponent {
    pageSizes: GxSelectOption<number>[] = [
        { label: '10 / 頁', value: 10 },
        { label: '20 / 頁', value: 20 },
        { label: '50 / 頁', value: 50 },
        { label: '100 / 頁', value: 100 }
    ];

    pageSize = signal<number>(20);
}
```

```html
<gx-pagination>
    <!-- 每頁筆數選擇 -->
    <gx-select
        [options]="pageSizes"
        [(value)]="pageSize"
        size="sm"
        variant="ghost"
    />
</gx-pagination>
```

---

## 自訂樣式

### 覆寫 CSS 變數

```css
/* 全局覆寫 */
gx-select {
    --gx-select-radius: 12px;
    --gx-select-px: 16px;
    --gx-select-height: 44px;
}

/* 針對特定變體 */
gx-select[variant="glass"] {
    --gx-glass-backdrop: blur(20px);
}
```

### Inline Style

```html
<gx-select
    [options]="options"
    [(value)]="selectedValue"
    style="--gx-select-radius: 20px; --gx-select-px: 20px;"
/>
```

### 可覆寫的變數

| 變數名 | 預設值 | 說明 |
|--------|--------|------|
| `--gx-select-bg` | 依變體 | 背景色 |
| `--gx-select-fg` | 依變體 | 文字色 |
| `--gx-select-border` | 依變體 | 邊框 |
| `--gx-select-radius` | `8px` | 圓角 |
| `--gx-select-px` | `12px` | 水平 padding |
| `--gx-select-py` | `8px` | 垂直 padding |
| `--gx-select-height` | 依尺寸 | 高度 |
| `--gx-select-arrow-icon` | SVG | 下拉箭頭圖標 |

---

## 無障礙設計

- ✅ 支援鍵盤導航
- ✅ 適當的 ARIA 屬性
- ✅ 明確的 focus 狀態
- ✅ 支援螢幕閱讀器

---

## 瀏覽器支援

- ✅ Chrome/Edge (最新)
- ✅ Firefox (最新)
- ✅ Safari (最新)
- ✅ 支援深色模式

---

## 相關組件

- [GxButton](../button/README.md) - 按鈕組件
- [GxTag](../tag/README.md) - 標籤組件
- GxPagination（規劃中） - 分頁組件

---

## 完整範例

```typescript
import { Component, signal } from '@angular/core';
import { GxSelect, GxSelectOption } from '@sanring/gx-ui';

@Component({
    standalone: true,
    imports: [GxSelect],
    template: `
        <div class="container">
            <h3>選擇你的偏好</h3>

            <div class="form-group">
                <label>顏色主題：</label>
                <gx-select
                    [options]="themeOptions"
                    [(value)]="selectedTheme"
                    [showNullOption]="true"
                    intent="info"
                    variant="outline"
                    size="md"
                    (valueChange)="onThemeChange($event)"
                />
            </div>

            <div class="form-group">
                <label>語言：</label>
                <gx-select
                    [options]="languageOptions"
                    [(value)]="selectedLanguage"
                    [showNullOption]="true"
                    intent="success"
                    variant="soft"
                    size="md"
                />
            </div>

            <p>當前主題：{{ selectedTheme() }}</p>
            <p>當前語言：{{ selectedLanguage() }}</p>
        </div>
    `
})
export class DemoComponent {
    themeOptions: GxSelectOption[] = [
        { label: '亮色模式', value: 'light' },
        { label: '深色模式', value: 'dark' },
        { label: '自動', value: 'auto' }
    ];

    languageOptions: GxSelectOption[] = [
        { label: '繁體中文', value: 'zh-TW' },
        { label: '简体中文', value: 'zh-CN' },
        { label: 'English', value: 'en' },
        { label: '日本語', value: 'ja' }
    ];

    selectedTheme = signal<string | null>(null);
    selectedLanguage = signal<string | null>(null);

    onThemeChange(theme: string | null) {
        console.log('主題已變更：', theme);
        // 應用主題邏輯...
    }
}
```

---

**更多範例請參考 [GxCella 文檔](../../../../../../README.md)**

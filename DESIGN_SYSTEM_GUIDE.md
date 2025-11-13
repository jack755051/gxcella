# GxCella 設計系統架構指南

**🤖 這是一份專為 AI 助手準備的參考文檔**

當用戶請求為 GxCella 新增組件或功能時，請參考本指南以確保：
1. ✅ 遵循現有架構和命名規範
2. ✅ 保持使用者的自訂能力
3. ✅ 確保向後兼容性
4. ✅ 提供漂亮的預設主題

---

## 📖 關鍵概念

### 核心原則

GxCella 使用 **CSS Variables（自訂屬性）** 為基礎的設計系統，具備以下特點：

1. **三層變數架構** - 確保使用者可以在任何層級覆寫
2. **只新增，不刪除** - 新功能只新增變數，不覆寫現有變數
3. **語義化命名** - 使用清晰的命名約定
4. **深色模式支援** - 自動響應系統主題
5. **完全可自訂** - 使用者可覆寫任何變數

---

## 🏗️ 三層變數架構

這是 GxCella 最重要的設計模式：

```css
/* ========== 第一層：全局色票（gx-styles/_variables.css）========== */
:root {
    --gx-color-primary-500: #FE7743;  /* 基礎色票定義 */
}

/* ========== 第二層：語義映射（gx-styles/_semantic.css）========== */
:root {
    --gx-intent-info-bg: var(--gx-color-info-500);  /* 語義色彩映射 */
}

/* ========== 第三層：組件變數（gx-button.css）========== */
:host {
    --intent-bg: var(--gx-intent-info-bg);  /* 組件內映射 */
}

:host([intent="success"]) {
    --intent-bg: var(--gx-intent-success-bg);  /* 屬性映射 */
}

.gx-btn {
    background: var(--gx-btn-bg, #fff);  /* 實現層，有 fallback */
}

.gx-btn.gx-variant-filled {
    --gx-btn-bg: var(--intent-bg);  /* 變體使用語義變數 */
}
```

### 為什麼使用三層？

| 層級 | 作用 | 使用者覆寫難度 | 影響範圍 |
|------|------|-------------|---------|
| **全局色票** | 定義基礎色彩 | 容易 | 全局 |
| **語義映射** | Intent 系統 | 中等 | 多組件 |
| **組件變數** | 組件專屬 | 容易 | 單組件 |

---

## 📝 命名規範

### CSS Variables 命名

```css
/* ========== 格式 ========== */
--{prefix}-{category}-{name}-{variant}-{modifier}

/* ========== 範例 ========== */
--gx-color-primary-500           /* 色彩 */
--gx-shadow-lg                   /* 效果 */
--gx-intent-success-bg           /* 語義 */
--gx-btn-bg                      /* 組件專屬 */
--gx-transition-normal           /* 動畫 */
--gx-glass-backdrop              /* 現代化效果 */
```

### 前綴規則

| 前綴 | 用途 | 範例 |
|------|------|------|
| `gx-color-` | 基礎色票 | `--gx-color-primary-500` |
| `gx-intent-` | 語義色彩 | `--gx-intent-info-bg` |
| `gx-shadow-` | 陰影 | `--gx-shadow-lg` |
| `gx-glass-` | 玻璃效果 | `--gx-glass-bg` |
| `gx-glow-` | 發光效果 | `--gx-glow-primary` |
| `gx-gradient-` | 漸變 | `--gx-gradient-primary` |
| `gx-transition-` | 過渡時間 | `--gx-transition-normal` |
| `gx-ease-` | 緩動函數 | `--gx-ease-in-out` |
| `gx-radius-` | 圓角 | `--gx-radius-md` |
| `gx-{component}-` | 組件專屬 | `--gx-btn-bg`, `--gx-card-bg` |

### 尺寸命名

```css
/* 使用 t-shirt sizing */
xs  →  extra small
sm  →  small
md  →  medium (預設)
lg  →  large
xl  →  extra large
2xl →  2x large
```

---

## 🎨 新增組件的標準流程

### 步驟 1：設計組件變數

在組件 CSS 文件中定義變數：

```css
/* packages/gx-ui/src/lib/my-component/gx-my-component.css */

:host {
    /* ========== 使用 :host 定義組件專屬變數 ========== */

    /* 預設背景（映射到全局變數） */
    --gx-my-component-bg: var(--gx-color-gray-50);

    /* 文字顏色 */
    --gx-my-component-fg: var(--gx-color-gray-900);

    /* 邊框 */
    --gx-my-component-border: var(--gx-border-subtle);

    /* 圓角（使用全局圓角系統） */
    --gx-my-component-radius: var(--gx-radius-md);

    /* Padding */
    --gx-my-component-px: 16px;
    --gx-my-component-py: 12px;
}

.gx-my-component {
    /* ========== 實現層：使用變數 + fallback ========== */
    background: var(--gx-my-component-bg, #f5f5f5);
    color: var(--gx-my-component-fg, #171717);
    border: var(--gx-my-component-border, 1px solid #e5e5e5);
    border-radius: var(--gx-my-component-radius, 8px);
    padding: var(--gx-my-component-py) var(--gx-my-component-px);

    /* 使用全局動畫系統 */
    transition: all var(--gx-transition-normal, 250ms) var(--gx-ease-in-out);
}
```

### 步驟 2：支援 Intent 系統（如果適用）

```css
/* 映射 Intent 變數 */
:host {
    /* 預設 Intent */
    --intent-bg: var(--gx-intent-info-bg);
    --intent-fg: var(--gx-intent-info-foreground);
}

:host([intent="success"]) {
    --intent-bg: var(--gx-intent-success-bg);
    --intent-fg: var(--gx-intent-success-foreground);
}

:host([intent="warning"]) {
    --intent-bg: var(--gx-intent-warning-bg);
    --intent-fg: var(--gx-intent-warning-foreground);
}

:host([intent="error"]) {
    --intent-bg: var(--gx-intent-error-bg);
    --intent-fg: var(--gx-intent-error-foreground);
}

/* 變體使用 Intent */
.gx-my-component.variant-filled {
    --gx-my-component-bg: var(--intent-bg);
    --gx-my-component-fg: var(--intent-fg);
}
```

### 步驟 3：支援現代化效果

```css
/* 玻璃態變體 */
.gx-my-component.variant-glass {
    --gx-my-component-bg: var(--gx-glass-bg);
    --gx-my-component-border: var(--gx-glass-border);
    backdrop-filter: var(--gx-glass-backdrop);
    -webkit-backdrop-filter: var(--gx-glass-backdrop);  /* Safari */
    box-shadow: var(--gx-shadow-md);
}

.gx-my-component.variant-glass:hover {
    box-shadow: var(--gx-shadow-lg);
}

/* 霓虹變體 */
.gx-my-component.variant-neon {
    --gx-my-component-bg: transparent;
    --gx-my-component-fg: var(--intent-bg);
    border: 2px solid var(--intent-bg);
    box-shadow: var(--gx-glow-primary);
    text-shadow: 0 0 8px var(--intent-bg);
}
```

### 步驟 4：深色模式支援

```css
/* 使用媒體查詢 */
@media (prefers-color-scheme: dark) {
    :host {
        --gx-my-component-bg: var(--gx-dark-bg-tertiary);
        --gx-my-component-fg: var(--gx-color-gray-100);
    }
}

/* 或使用 data-theme */
html[data-theme="dark"] :host {
    --gx-my-component-bg: var(--gx-dark-bg-tertiary);
    --gx-my-component-fg: var(--gx-color-gray-100);
}
```

### 步驟 5：TypeScript 類型定義

```typescript
// packages/gx-ui/src/lib/my-component/model/my-component.types.ts

import { GxIntent } from '../../shared/model/design-tokens';

export type GxMyComponentIntent = GxIntent;

export type GxMyComponentVariant = 'filled' | 'outline' | 'soft' | 'ghost' | 'glass' | 'neon';

export interface GxMyComponentStyle {
    px?: number;
    py?: number;
    radius?: number;
}
```

---

## ✅ 檢查清單

在新增或修改組件時，確保：

### 變數設計
- [ ] 使用三層變數架構
- [ ] 所有硬編碼值都改為變數
- [ ] 提供合理的 fallback 值
- [ ] 遵循命名規範（`--gx-{category}-{name}`）
- [ ] 映射到全局變數系統

### 自訂能力
- [ ] 使用者可以覆寫所有視覺變數
- [ ] 支援 inline style 覆寫
- [ ] 支援組件級別覆寫
- [ ] 支援全局級別覆寫

### 主題支援
- [ ] 支援 Intent 系統（如果適用）
- [ ] 支援深色模式
- [ ] 支援現代化變體（glass、neon 等）
- [ ] 使用全局陰影/圓角/動畫系統

### 代碼質量
- [ ] 有明確的註釋說明
- [ ] TypeScript 類型定義完整
- [ ] 無硬編碼值（除了 fallback）
- [ ] 遵循無障礙設計

### 文檔
- [ ] 更新組件 README
- [ ] 列出所有可覆寫變數
- [ ] 提供自訂範例
- [ ] 新增測試範例

---

## 🚫 常見錯誤

### ❌ 錯誤：硬編碼值

```css
/* 錯誤 */
.gx-card {
    background: #ffffff;  /* 使用者無法覆寫 */
    padding: 16px;
    border-radius: 8px;
}
```

### ✅ 正確：使用變數

```css
/* 正確 */
:host {
    --gx-card-bg: var(--gx-light-bg-primary);
    --gx-card-px: 16px;
    --gx-card-py: 16px;
    --gx-card-radius: var(--gx-radius-md);
}

.gx-card {
    background: var(--gx-card-bg, #ffffff);  /* 有 fallback */
    padding: var(--gx-card-py) var(--gx-card-px);
    border-radius: var(--gx-card-radius, 8px);
}
```

---

### ❌ 錯誤：覆寫現有變數

```css
/* 錯誤：在新主題中覆寫基礎色票 */
/* packages/gx-styles/src/lib/_theme-modern.css */
:root {
    --gx-color-primary-500: #3B82F6;  /* ❌ 改變了預設主色！ */
}
```

### ✅ 正確：只新增新變數

```css
/* 正確：新增新的現代化變數 */
:root {
    --gx-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);  /* ✅ 新增 */
    --gx-glass-bg: rgba(255, 255, 255, 0.1);       /* ✅ 新增 */
    /* 不修改 --gx-color-primary-500 */
}
```

---

### ❌ 錯誤：缺少 fallback

```css
/* 錯誤 */
.gx-btn {
    background: var(--gx-btn-bg);  /* 如果未定義會是 transparent */
}
```

### ✅ 正確：提供 fallback

```css
/* 正確 */
.gx-btn {
    background: var(--gx-btn-bg, #fff);  /* 有合理的預設值 */
}
```

---

### ❌ 錯誤：不支援覆寫

```css
/* 錯誤：使用 !important */
.gx-card {
    background: var(--gx-card-bg) !important;  /* 使用者無法覆寫 */
}
```

### ✅ 正確：允許覆寫

```css
/* 正確：不使用 !important */
.gx-card {
    background: var(--gx-card-bg, #fff);
}
```

---

## 📁 文件結構

新增組件時的標準文件結構：

```
packages/gx-ui/src/lib/my-component/
├── gx-my-component.ts          # Angular 組件
├── gx-my-component.html        # 模板
├── gx-my-component.css         # 樣式（包含變數定義）
├── model/
│   └── my-component.types.ts  # TypeScript 類型
└── README.md                   # 組件文檔
```

---

## 📚 範例模板

### 新組件 CSS 模板

```css
/* ==================== GxMyComponent ====================
 *
 * 簡短描述此組件的用途
 *
 * 可覆寫變數：
 * --gx-my-component-bg          背景色
 * --gx-my-component-fg          文字色
 * --gx-my-component-border      邊框
 * --gx-my-component-radius      圓角
 *
 * ====================================================== */

/* ========== 變數定義 ========== */
:host {
    /* 預設樣式 */
    --gx-my-component-bg: var(--gx-color-gray-50);
    --gx-my-component-fg: var(--gx-color-gray-900);
    --gx-my-component-border: var(--gx-border-subtle);
    --gx-my-component-radius: var(--gx-radius-md);
    --gx-my-component-px: 16px;
    --gx-my-component-py: 12px;

    /* Intent 映射（如果適用） */
    --intent-bg: var(--gx-intent-info-bg);
    --intent-fg: var(--gx-intent-info-foreground);
}

/* Intent 屬性映射 */
:host([intent="success"]) {
    --intent-bg: var(--gx-intent-success-bg);
    --intent-fg: var(--gx-intent-success-foreground);
}

/* ========== 基礎樣式 ========== */
.gx-my-component {
    /* 重置 */
    box-sizing: border-box;

    /* 佈局 */
    display: block;
    padding: var(--gx-my-component-py) var(--gx-my-component-px);

    /* 視覺 */
    background: var(--gx-my-component-bg, #f5f5f5);
    color: var(--gx-my-component-fg, #171717);
    border: var(--gx-my-component-border, 1px solid #e5e5e5);
    border-radius: var(--gx-my-component-radius, 8px);

    /* 動畫 */
    transition: all var(--gx-transition-normal) var(--gx-ease-in-out);
}

/* ========== 變體 ========== */
.gx-my-component.variant-filled {
    --gx-my-component-bg: var(--intent-bg);
    --gx-my-component-fg: var(--intent-fg);
}

.gx-my-component.variant-glass {
    --gx-my-component-bg: var(--gx-glass-bg);
    --gx-my-component-border: var(--gx-glass-border);
    backdrop-filter: var(--gx-glass-backdrop);
    -webkit-backdrop-filter: var(--gx-glass-backdrop);
    box-shadow: var(--gx-shadow-md);
}

/* ========== 狀態 ========== */
.gx-my-component:hover {
    box-shadow: var(--gx-shadow-lg);
}

.gx-my-component:disabled {
    --gx-my-component-bg: var(--gx-color-gray-100);
    --gx-my-component-fg: var(--gx-color-gray-400);
    opacity: 0.6;
    cursor: not-allowed;
}

/* ========== 深色模式 ========== */
@media (prefers-color-scheme: dark) {
    :host {
        --gx-my-component-bg: var(--gx-dark-bg-tertiary);
        --gx-my-component-fg: var(--gx-color-gray-100);
    }
}
```

### TypeScript 模板

```typescript
// packages/gx-ui/src/lib/my-component/gx-my-component.ts

import { Component, input } from '@angular/core';
import { GxMyComponentIntent, GxMyComponentVariant } from './model/my-component.types';

@Component({
    selector: 'gx-my-component',
    standalone: true,
    templateUrl: 'gx-my-component.html',
    styleUrls: [
        '../shared/styles/intent-colors.css',  // 如果使用 Intent
        'gx-my-component.css'
    ]
})
export class GxMyComponent {
    // 語義屬性
    intent = input<GxMyComponentIntent>('info');
    variant = input<GxMyComponentVariant>('filled');
    disabled = input<boolean>(false);

    // 其他屬性...
}
```

---

## 🎯 使用者自訂範例

確保使用者可以用以下方式自訂：

### 1. 全局覆寫

```css
/* styles.css */
@import '@sanring/gx-styles/gx.css';

:root {
    /* 改變所有組件的主色 */
    --gx-color-primary-500: #3B82F6;

    /* 改變所有陰影 */
    --gx-shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

### 2. 組件級覆寫

```css
/* 只改特定組件 */
gx-my-component {
    --gx-my-component-radius: 20px;
    --gx-my-component-px: 24px;
}
```

### 3. Inline 覆寫

```html
<gx-my-component
    style="--gx-my-component-bg: red; --gx-my-component-radius: 16px">
</gx-my-component>
```

---

## 🤖 AI 助手快速指令

當用戶請求新增組件時，請執行以下步驟：

1. **讀取本文檔** - 確保理解架構
2. **檢查現有組件** - 參考 `gx-button` 或 `gx-card` 的實現
3. **創建變數定義** - 使用三層架構
4. **實現樣式** - 使用變數 + fallback
5. **支援 Intent** - 如果適用
6. **支援現代化變體** - glass、neon 等
7. **深色模式** - 使用 `prefers-color-scheme`
8. **TypeScript 類型** - 完整的類型定義
9. **測試覆寫** - 確保使用者可以自訂
10. **撰寫文檔** - README + 變數列表

---

## 📖 相關資源

- [gx-styles/README.md](packages/gx-styles/README.md) - 樣式系統文檔
- [gx-styles/VARIABLES.md](packages/gx-styles/VARIABLES.md) - 完整變數列表
- [test-modern-theme.html](test-modern-theme.html) - 測試範例
- [gx-button](packages/gx-ui/src/lib/button/) - 最佳實踐範例

---

## 🔑 關鍵字

**當用戶提供這個文檔的路徑時，你應該：**

1. 詳細閱讀本指南
2. 理解三層變數架構
3. 遵循命名規範
4. 確保使用者可自訂
5. 支援現代化效果
6. 提供完整文檔

**示例用戶指令：**

> "請參考 `/Users/charlie010583/Desktop/01_private/gxcella/DESIGN_SYSTEM_GUIDE.md` 為 gxcella 新增一個 Modal 組件"

**你應該回應：**

> "我已經閱讀了設計系統指南。我將為 GxCella 新增 Modal 組件，並遵循以下原則：
> 1. 使用三層變數架構
> 2. 支援 Intent 系統
> 3. 支援 glass 和 neon 變體
> 4. 確保使用者可以完全自訂
> 5. 提供深色模式支援
>
> 現在開始實施..."

---

**本文檔版本**: 1.0.0
**最後更新**: 2025-01-13
**維護者**: GxCella Team

---

## 結語

遵循這些指南，可以確保 GxCella 保持：
- ✅ **一致性** - 所有組件風格統一
- ✅ **可維護性** - 清晰的架構易於維護
- ✅ **可擴展性** - 輕鬆新增新功能
- ✅ **使用者友好** - 完全可自訂

**記住：只新增，不刪除；只增強，不破壞！** 🎯

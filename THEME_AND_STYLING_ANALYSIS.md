# gxcella 項目主題與樣式配置分析報告

## 1. 現有主題系統架構

### 1.1 核心組件
項目使用的是**CSS Variables (CSS Custom Properties)** 為基礎的設計系統，主要由以下結構組成：

```
packages/gx-styles/
├── src/lib/
│   ├── _variables.css        # 基礎色彩和字體變數
│   ├── _semantic.css         # 語意色彩（Intent）系統
│   └── gx-styles.css         # 主入口文件
```

#### _variables.css 提供的變數
- **Primary (橘紅)**: --gx-color-primary-50 to --gx-color-primary-900
- **Dark (深藍灰)**: --gx-color-dark-50 to --gx-color-dark-900
- **Accent (藍綠)**: --gx-color-accent-50 to --gx-color-accent-900
- **Gray (中性灰)**: --gx-color-gray-50 to --gx-color-gray-900
- **Font Weight**: --gx-weight-thin (100) to --gx-weight-black (900)

#### _semantic.css 提供的語意色彩
- **Intent Colors**: info、success、warning、error
- **每個 Intent 包含**:
  - `--gx-color-{intent}-50 to -900`: 色彩級別
  - `--gx-intent-{intent}-bg`: 背景色
  - `--gx-intent-{intent}-hover`: 懸停狀態
  - `--gx-intent-{intent}-active`: 激活狀態
  - `--gx-intent-{intent}-soft-bg`: 軟背景（淡化版本）
  - `--gx-intent-{intent}-border`: 邊框色
  - `--gx-intent-{intent}-foreground`: 前景色（文字色）

### 1.2 主題類別
```css
.gx-theme-default { /* 預設亮色主題 */ }
.gx-theme-dark {    /* 深色主題示例 */
    使用 color-mix() 函數調整顏色混合
}
```

---

## 2. 各 Package 的樣式組織方式

### 2.1 Package 結構概覽

| Package | 樣式文件數 | 組織方式 | 使用的變數 |
|---------|----------|--------|---------|
| **gx-styles** | 3 | 中央化（_variables.css, _semantic.css） | N/A (定義者) |
| **gx-ui** | 12+ | 組件級別 CSS 檔 | --gx-intent-*, --gx-color-* |
| **gx-card** | 6+ | 組件級別 CSS 檔 | --gx-color-*, --gx-card-* |
| **gx-table** | 5+ | 組件級別 CSS 檔 | --gx-table-* |
| **gx-breadcrumb** | 2 | 組件級別 CSS 檔 | --gx-breadcrumb-* |
| **gx-pagination** | 1 | 組件級別 CSS 檔 | --gx-color-* |
| **gx-wizard** | 4 | 組件級別 CSS 檔 | 無文檔化變數 |

### 2.2 詳細組件分析

#### GX-UI (gx-ui) Package
**使用最完整的設計系統的包**

文件結構：
```
gx-ui/src/lib/
├── button/
│   ├── gx-button.css         # 完整的 intent 映射
│   ├── gx-button.ts          # Angular 組件
│   └── model/button.types.ts # 類型定義
├── tag/
│   └── gx-tag.css            # Intent 變數映射
├── tooltip/
│   └── gx-tooltip.component.css  # Dark/Light 主題
├── shared/
│   ├── styles/intent-colors.css  # 共享意圖色彩
│   └── model/design-tokens.ts    # 設計 Token TypeScript 定義
└── [其他組件...]
```

**Button 組件示例（最佳實踐）**:
```css
:host {
    /* Intent 映射層 */
    --intent-bg: var(--gx-intent-info-bg);
    --intent-fg: var(--gx-intent-info-foreground);
    --intent-hover: var(--gx-intent-info-hover);
    --intent-active: var(--gx-intent-info-active);
    --intent-border: var(--gx-intent-info-border);
    --intent-soft-bg: var(--gx-intent-info-soft-bg);
}

/* 根據 [intent] 屬性覆寫 */
:host([intent="success"]) {
    --intent-bg: var(--gx-intent-success-bg);
    /* ... */
}

/* 實現層 */
.gx-btn {
    background: var(--gx-btn-bg, #fff);
    color: var(--gx-btn-fg, #111);
}

.gx-btn.gx-variant-filled {
    --gx-btn-bg: var(--intent-bg);
    --gx-btn-fg: var(--intent-fg);
}
```

#### GX-Card Package
文件結構：
```
gx-card/src/lib/
├── card/gx-card.css              # 卡片核心樣式
├── card-header/gx-card-header.css
├── card-content/gx-card-content.css
├── card-footer/gx-card-footer.css
└── directives/gx-clickable.css
```

**自訂變數方式**:
```css
:host {
    --gx-card-background: var(--gx-color-accent-50, #f0f8ff);
    --gx-card-text-color: var(--gx-color-gray-900, #1a1a1a);
    --gx-card-border-color: var(--gx-color-accent-200, #b3d9ed);
    --gx-card-title-color: var(--gx-color-gray-800, #333);
    --gx-card-subtitle-color: var(--gx-color-gray-600, #666);
    --gx-card-hover-background: var(--gx-color-accent-100, #d4e5ed);
}
```

#### GX-Table Package
文件結構：
```
gx-table/src/lib/
├── table-shell/gx-table-shell.css
├── table-header/gx-table-header.css
├── table-header-cell/gx-table-header-cell.css
├── table-body/gx-table-body.css
├── table-row/gx-table-row.css
├── table-cell/gx-table-cell.css
└── table-empty-state/gx-table-empty-state.css
```

**使用的變數**:
```css
.gx-checkbox {
    border-color: var(--gx-table-checkbox-border, #d1d5db);
    color: var(--gx-table-checkbox-color, #3b82f6);
}
```

#### GX-Tooltip Component (特殊實現)
唯一使用**主題屬性**的組件：
```css
.gx-tooltip--dark {
    background: var(--gx-tooltip-bg-dark);
    color: var(--gx-tooltip-text-dark);
}

.gx-tooltip--light {
    background: var(--gx-tooltip-bg-light);
    color: var(--gx-tooltip-text-light);
}
```

TypeScript 中：
```typescript
theme = input<GxTooltipTheme>('dark');
// 支持 'dark' | 'light'
```

---

## 3. 中央化樣式管理方式

### 3.1 如何使用 gx-styles

**應用級別** (`apps/gx-demo/src/styles.css`):
```css
@import "tailwindcss";
@import '@sanring/gx-styles/gx.css';
```

**Package 級別** (`packages/gx-ui/src/lib/button/gx-button.ts`):
```typescript
@Component({
    selector: 'gx-button',
    standalone: true,
    styleUrls: [
        '../shared/styles/intent-colors.css',
        'gx-button.css'
    ]
})
```

### 3.2 現有層級結構

```
Layer 1: 全局變數定義
├── _variables.css      (色彩, 字體)
└── _semantic.css       (Intent 映射)

Layer 2: 共享組件樣式
└── packages/gx-ui/src/lib/shared/styles/intent-colors.css

Layer 3: 組件專屬樣式
├── gx-button.css
├── gx-tag.css
├── gx-card.css
└── [其他組件...]

Layer 4: 應用級別
└── apps/gx-demo/src/styles.css (引入 gx-styles + tailwindcss)
```

### 3.3 設計 Token TypeScript 模型

```typescript
// shared/model/design-tokens.ts
export type GxIntent = 'info' | 'success' | 'warning' | 'error';
export type GxSize = 'sm' | 'md' | 'lg' | 'xl';

export interface GxStyleTokens {
    px?: number;      // 水平 padding
    py?: number;      // 垂直 padding
    radius?: number;  // 圓角
    background?: string;
    foreground?: string;
}

export function mapSizeToPixels(size: GxSize | number): number { ... }
```

---

## 4. 目前系統的分析

### 4.1 優勢
1. **CSS Variables 完整支援** - 95% 瀏覽器支援，無需編譯
2. **Intent 語意系統** - 語義化的色彩應用 (info/success/warning/error)
3. **分層架構** - 從全局到組件的清晰結構
4. **TypeScript 設計 Token** - 類型安全的設計系統
5. **View Encapsulation** - Angular Shadow DOM 隔離樣式
6. **Tailwind CSS 集成** - 補充實用類別

### 4.2 缺陷
1. **深色主題支援不完整**
   - 只有 `_semantic.css` 中有 `.gx-theme-dark` 示例
   - 其他組件未實現深色模式
   - 無 `prefers-color-scheme` 媒體查詢

2. **科技感視覺元素缺失**
   - 無漸變色
   - 無毛玻璃效果 (glass morphism)
   - 無陰影深度系統
   - 無動畫/過渡系統文檔
   - 無顏色飽和度和對比度配置

3. **變數命名不一致**
   - 有些組件用 `--gx-card-*`
   - 有些用 `--gx-color-*`
   - 有些用 `--gx-intent-*`

4. **文檔化不足**
   - gx-styles 無 README 說明
   - 各組件的樣式變數未中央記錄

5. **無主題切換機制**
   - 不支持運行時主題切換
   - 無專門的主題提供者 (Service)

---

## 5. 建議：實現現代化科技感主題的方案

### 5.1 完整的設計系統現代化方案

#### Phase 1: 增強色彩系統 (優先級: HIGH)

新增文件: `packages/gx-styles/src/lib/_modern-colors.css`

```css
:root {
    /* ==================== 現代科技感色彩 ==================== */
    
    /* 深色主題基礎 */
    --gx-dark-bg-primary:     #0a0e27;   /* 深藍黑 */
    --gx-dark-bg-secondary:   #1a1f3a;   /* 稍淺藍 */
    --gx-dark-bg-tertiary:    #242d4a;   /* 卡片背景 */
    
    /* 亮色主題基礎 */
    --gx-light-bg-primary:    #ffffff;
    --gx-light-bg-secondary:  #f8f9fa;
    --gx-light-bg-tertiary:   #f0f2f5;
    
    /* 品牌漸變 */
    --gx-gradient-primary: linear-gradient(135deg, #FE7743 0%, #FF9F75 100%);
    --gx-gradient-accent:  linear-gradient(135deg, #447D9B 0%, #5895B2 100%);
    --gx-gradient-dark:    linear-gradient(135deg, #1a1f3a 0%, #242d4a 100%);
    
    /* 毛玻璃效果 */
    --gx-glass-bg: rgba(255, 255, 255, 0.1);
    --gx-glass-backdrop: blur(10px);
    --gx-glass-border: 1px solid rgba(255, 255, 255, 0.2);
    
    /* 陰影深度系統 */
    --gx-shadow-xs:     0 1px 2px rgba(0, 0, 0, 0.05);
    --gx-shadow-sm:     0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
    --gx-shadow-md:     0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
    --gx-shadow-lg:     0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
    --gx-shadow-xl:     0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
    --gx-shadow-2xl:    0 25px 50px rgba(0, 0, 0, 0.25);
    
    /* 發光效果 (Glow) */
    --gx-glow-primary: 0 0 20px rgba(254, 119, 67, 0.3);
    --gx-glow-accent:  0 0 20px rgba(68, 125, 155, 0.3);
    --gx-glow-success: 0 0 20px rgba(48, 152, 152, 0.3);
    
    /* 邊框 */
    --gx-border-subtle:  1px solid var(--gx-color-gray-200);
    --gx-border-normal:  1px solid var(--gx-color-gray-300);
    --gx-border-strong:  2px solid var(--gx-color-gray-400);
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
    :root {
        --gx-glass-bg: rgba(26, 31, 58, 0.8);
        --gx-glass-border: 1px solid rgba(255, 255, 255, 0.1);
        
        /* 深色陰影更深 */
        --gx-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
        --gx-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.4);
    }
}
```

#### Phase 2: 動畫與過渡系統 (優先級: HIGH)

新增文件: `packages/gx-styles/src/lib/_animations.css`

```css
:root {
    /* ==================== 過渡時間 ==================== */
    --gx-transition-fast:    150ms;
    --gx-transition-normal:  250ms;
    --gx-transition-slow:    350ms;
    --gx-transition-slower:  500ms;
    
    /* ==================== 緩動函數 ==================== */
    --gx-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --gx-ease-out:    cubic-bezier(0, 0, 0.2, 1);
    --gx-ease-in:     cubic-bezier(0.4, 0, 1, 1);
    --gx-ease-elastic: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 動畫定義 */
@keyframes gx-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes gx-scale-in {
    from { 
        opacity: 0; 
        transform: scale(0.95); 
    }
    to { 
        opacity: 1; 
        transform: scale(1); 
    }
}

@keyframes gx-slide-in-up {
    from { 
        opacity: 0; 
        transform: translateY(10px); 
    }
    to { 
        opacity: 1; 
        transform: translateY(0); 
    }
}

@keyframes gx-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

@keyframes gx-shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
}

/* 通用過渡類別 */
.gx-transition-all {
    transition: all var(--gx-transition-normal) var(--gx-ease-in-out);
}

.gx-transition-colors {
    transition: background-color var(--gx-transition-normal) var(--gx-ease-in-out),
                color var(--gx-transition-normal) var(--gx-ease-in-out),
                border-color var(--gx-transition-normal) var(--gx-ease-in-out);
}
```

#### Phase 3: 升級 Intent 色彩系統 (優先級: MEDIUM)

修改 `packages/gx-styles/src/lib/_semantic.css`:

```css
:root {
    /* ==================== 增強的 Intent 色彩 ==================== */
    
    /* Info Intent - 帶漸變和發光 */
    --gx-intent-info-bg-gradient: linear-gradient(135deg, var(--gx-color-info-500), var(--gx-color-info-600));
    --gx-intent-info-glow: var(--gx-glow-accent);
    --gx-intent-info-shadow: 0 4px 15px rgba(68, 125, 155, 0.3);
    
    /* Success Intent */
    --gx-intent-success-bg-gradient: linear-gradient(135deg, var(--gx-color-success-500), var(--gx-color-success-600));
    --gx-intent-success-glow: var(--gx-glow-success);
    
    /* Warning Intent */
    --gx-intent-warning-bg-gradient: linear-gradient(135deg, var(--gx-color-warning-500), var(--gx-color-warning-600));
    
    /* Error Intent */
    --gx-intent-error-bg-gradient: linear-gradient(135deg, var(--gx-color-error-500), var(--gx-color-error-600));
}
```

#### Phase 4: 組件升級系統 (優先級: MEDIUM)

新增文件: `packages/gx-ui/src/lib/shared/styles/modern-components.css`

```css
/* 毛玻璃卡片樣式 */
.gx-component-glass {
    background: var(--gx-glass-bg);
    backdrop-filter: var(--gx-glass-backdrop);
    border: var(--gx-glass-border);
    border-radius: 12px;
}

/* 科技感按鈕 - 帶邊框發光 */
.gx-btn-tech {
    position: relative;
    overflow: hidden;
    background: linear-gradient(var(--gx-intent-bg), var(--gx-intent-bg));
    box-shadow: 0 0 15px var(--gx-glow-primary);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.gx-btn-tech::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
}

.gx-btn-tech:hover::before {
    left: 100%;
}

/* 載入動畫 */
.gx-skeleton {
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.1)
    );
    background-size: 200% 100%;
    animation: gx-shimmer 2s infinite;
}
```

#### Phase 5: 主題切換系統 (優先級: MEDIUM)

新增文件: `packages/gx-ui/src/lib/theme/theme.service.ts`

```typescript
import { Injectable, signal } from '@angular/core';

export type GxTheme = 'light' | 'dark' | 'auto';

@Injectable({ providedIn: 'root' })
export class GxThemeService {
    private readonly theme = signal<GxTheme>('auto');
    
    readonly currentTheme = this.theme.asReadonly();
    
    setTheme(theme: GxTheme) {
        this.theme.set(theme);
        this.applyTheme(theme);
    }
    
    private applyTheme(theme: GxTheme) {
        const root = document.documentElement;
        
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.style.colorScheme = prefersDark ? 'dark' : 'light';
        } else {
            root.style.colorScheme = theme;
        }
        
        root.setAttribute('data-theme', theme);
    }
}
```

### 5.2 HTML/CSS 主題選擇器示例

```html
<!-- 在 root 元素上設置主題 -->
<html data-theme="dark" style="color-scheme: dark;">

<!-- 或使用 CSS 類別 -->
<html class="dark">

<!-- CSS 對應 -->
<style>
    html[data-theme="dark"],
    html.dark {
        color-scheme: dark;
    }
    
    @media (prefers-color-scheme: dark) {
        html:not([data-theme="light"]) {
            color-scheme: dark;
        }
    }
</style>
```

### 5.3 優化後的組件實現

升級 Button 組件使用現代化樣式：

```typescript
@Component({
    selector: 'gx-button',
    standalone: true,
    styleUrls: [
        '../shared/styles/intent-colors.css',
        '../shared/styles/modern-components.css',
        '../shared/styles/_animations.css',
        'gx-button.css'
    ]
})
export class GxButton {
    // 新增: 科技感變體
    variant = input<'filled' | 'outline' | 'soft' | 'ghost' | 'glass' | 'neon'>('filled');
    
    // 新增: 陰影深度
    shadow = input<'none' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    
    // 新增: 動畫效果
    animation = input<'fade' | 'scale' | 'slide'>('scale');
}
```

```css
/* 玻璃態變體 */
.gx-btn.gx-variant-glass {
    background: var(--gx-glass-bg);
    backdrop-filter: var(--gx-glass-backdrop);
    border: var(--gx-glass-border);
    box-shadow: var(--gx-shadow-md);
}

/* 霓虹變體 */
.gx-btn.gx-variant-neon {
    background: transparent;
    border: 2px solid var(--intent-bg);
    color: var(--intent-bg);
    box-shadow: var(--gx-glow-primary), inset 0 0 10px var(--intent-bg);
    text-shadow: 0 0 10px var(--intent-bg);
}

/* 陰影應用 */
.gx-btn.gx-shadow-lg {
    box-shadow: var(--gx-shadow-lg);
}

/* 動畫應用 */
.gx-btn.gx-animation-scale {
    animation: gx-scale-in var(--gx-transition-normal) var(--gx-ease-in-out);
}
```

### 5.4 建議的文件結構更新

```
packages/gx-styles/src/lib/
├── _variables.css            (現有 - 色彩基礎)
├── _semantic.css             (現有 - Intent 系統)
├── _modern-colors.css        (NEW - 科技感色彩)
├── _animations.css           (NEW - 動畫系統)
├── _typography.css           (NEW - 字體系統)
├── _shadows.css              (NEW - 陰影系統)
└── gx-styles.css             (修改 - 導入全部)

packages/gx-ui/src/lib/shared/
├── styles/
│   ├── intent-colors.css                (現有)
│   ├── modern-components.css            (NEW - 玻璃/霓虹組件)
│   └── theme-overrides.css              (NEW - 主題覆寫)
├── model/
│   ├── design-tokens.ts                 (現有)
│   ├── theme-tokens.ts                  (NEW - 主題 Token)
│   └── animation-tokens.ts              (NEW - 動畫 Token)
└── theme/
    ├── theme.service.ts                 (NEW - 主題服務)
    ├── theme.provider.ts                (NEW - 主題提供者)
    └── use-theme.ts                     (NEW - 組合式 API)
```

---

## 6. 實施優先級建議

| 優先級 | 項目 | 工作量 | 影響度 |
|------|------|------|------|
| P0 | 增強色彩系統 (漸變+陰影) | 中 | 高 |
| P0 | 動畫與過渡系統 | 中 | 高 |
| P1 | 深色模式完整支援 | 中 | 高 |
| P1 | 主題切換服務 | 小 | 中 |
| P2 | 玻璃態/霓虹變體 | 小 | 中 |
| P3 | 完整文檔化 | 小 | 中 |

---

## 7. 快速開始實施

### 7.1 立即可做的改進

1. **複製上述 CSS 檔案到 `packages/gx-styles/src/lib/`**
2. **在 `gx-styles.css` 中導入新檔案**
3. **運行 `npm run build` 測試**

### 7.2 測試主題系統

```html
<!-- 測試深色模式 -->
<html style="color-scheme: dark;">
  <body>
    <gx-button intent="info" variant="glass">玻璃按鈕</gx-button>
    <gx-button intent="success" variant="neon">霓虹按鈕</gx-button>
  </body>
</html>
```

---

## 總結

gxcella 已有一個堅實的 **CSS Variables + Intent 系統基礎**，但缺乏現代化的視覺效果。

通過以上建議，你可以：
1. 保持現有設計系統的穩定性
2. 漸進式添加現代化元素
3. 提供多種視覺變體 (玻璃、霓虹、漸變等)
4. 完整支援深色模式和主題切換
5. 建立可重用的設計 Token 系統

這將使 gxcella 成為一個**完整、可擴展、支援現代化科技感設計**的 UI 框架。


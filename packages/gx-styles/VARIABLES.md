# GxCella CSS Variables 完整參考

本文檔列出所有可覆寫的 CSS 變數，方便使用者自訂主題。

## 📖 目錄

- [色彩系統](#色彩系統)
- [現代化增強](#現代化增強)
- [動畫系統](#動畫系統)
- [使用範例](#使用範例)

---

## 色彩系統

### Primary 色票（橘紅）

| 變數名 | 預設值 | 說明 |
|--------|--------|------|
| `--gx-color-primary-50` | `#FFF3EC` | 最淺 |
| `--gx-color-primary-100` | `#FFE0D1` | |
| `--gx-color-primary-200` | `#FFBFA3` | |
| `--gx-color-primary-300` | `#FF9F75` | |
| `--gx-color-primary-400` | `#FE7F47` | |
| `--gx-color-primary-500` | `#FE7743` | **基準色** |
| `--gx-color-primary-600` | `#E85E2B` | |
| `--gx-color-primary-700` | `#C44A20` | |
| `--gx-color-primary-800` | `#9E3716` | |
| `--gx-color-primary-900` | `#76250D` | 最深 |

### Dark 色票（深藍灰）

| 變數名 | 預設值 |
|--------|--------|
| `--gx-color-dark-50` | `#F2F6F8` |
| `--gx-color-dark-500` | `#273F4F` |
| `--gx-color-dark-900` | `#050B0F` |

### Accent 色票（藍綠）

| 變數名 | 預設值 |
|--------|--------|
| `--gx-color-accent-50` | `#F1F7FA` |
| `--gx-color-accent-500` | `#447D9B` |
| `--gx-color-accent-900` | `#0C1A21` |

### Gray 色票（中性灰）

| 變數名 | 預設值 |
|--------|--------|
| `--gx-color-gray-50` | `#FAFAFA` |
| `--gx-color-gray-500` | `#737373` |
| `--gx-color-gray-900` | `#171717` |

### Intent 語義色彩

每個 Intent 都有以下變數：

**Info (預設為藍色)**
- `--gx-intent-info-bg` - 背景色
- `--gx-intent-info-foreground` - 前景色（文字）
- `--gx-intent-info-hover` - 懸停狀態
- `--gx-intent-info-active` - 激活狀態
- `--gx-intent-info-border` - 邊框色
- `--gx-intent-info-soft-bg` - 軟背景（淡化版）

**Success（綠色）、Warning（黃色）、Error（紅色）** 同上結構。

---

## 現代化增強

### 陰影深度系統

| 變數名 | 預設值 | 使用場景 |
|--------|--------|---------|
| `--gx-shadow-xs` | `0 1px 2px rgba(0, 0, 0, 0.05)` | 細微陰影 |
| `--gx-shadow-sm` | `0 1px 3px rgba(0, 0, 0, 0.1)` | 小陰影 |
| `--gx-shadow-md` | `0 4px 6px rgba(0, 0, 0, 0.1)` | 中陰影（卡片） |
| `--gx-shadow-lg` | `0 10px 15px rgba(0, 0, 0, 0.1)` | 大陰影（浮動元素） |
| `--gx-shadow-xl` | `0 20px 25px rgba(0, 0, 0, 0.1)` | 超大陰影（模態框） |
| `--gx-shadow-2xl` | `0 25px 50px rgba(0, 0, 0, 0.25)` | 最大陰影 |

### 發光效果

| 變數名 | 預設值 | 說明 |
|--------|--------|------|
| `--gx-glow-primary` | `0 0 20px rgba(254, 119, 67, 0.3)` | 主色發光 |
| `--gx-glow-accent` | `0 0 20px rgba(68, 125, 155, 0.3)` | 強調色發光 |
| `--gx-glow-success` | `0 0 20px rgba(48, 152, 152, 0.3)` | 成功發光 |
| `--gx-glow-warning` | `0 0 20px rgba(255, 183, 77, 0.3)` | 警告發光 |
| `--gx-glow-error` | `0 0 20px rgba(239, 83, 80, 0.3)` | 錯誤發光 |

### 玻璃態效果

| 變數名 | 預設值 | 說明 |
|--------|--------|------|
| `--gx-glass-bg` | `rgba(255, 255, 255, 0.1)` | 玻璃背景 |
| `--gx-glass-bg-strong` | `rgba(255, 255, 255, 0.15)` | 更不透明的玻璃 |
| `--gx-glass-backdrop` | `blur(10px)` | 模糊程度 |
| `--gx-glass-border` | `1px solid rgba(255, 255, 255, 0.2)` | 玻璃邊框 |
| `--gx-glass-border-strong` | `1px solid rgba(255, 255, 255, 0.3)` | 更明顯的邊框 |

### 漸變效果

| 變數名 | 預設值 |
|--------|--------|
| `--gx-gradient-primary` | `linear-gradient(135deg, primary-500, primary-400)` |
| `--gx-gradient-accent` | `linear-gradient(135deg, accent-600, accent-500)` |
| `--gx-gradient-dark` | `linear-gradient(135deg, dark-700, dark-600)` |

### 圓角系統

| 變數名 | 預設值 | 使用場景 |
|--------|--------|---------|
| `--gx-radius-xs` | `2px` | 極小圓角 |
| `--gx-radius-sm` | `4px` | 小圓角 |
| `--gx-radius-md` | `8px` | 中圓角（預設） |
| `--gx-radius-lg` | `12px` | 大圓角 |
| `--gx-radius-xl` | `16px` | 超大圓角 |
| `--gx-radius-2xl` | `24px` | 極大圓角 |
| `--gx-radius-full` | `9999px` | 完全圓形 |

### 深色/亮色背景

| 變數名 | 預設值 | 說明 |
|--------|--------|------|
| `--gx-dark-bg-primary` | `#0a0e27` | 深色模式最深背景 |
| `--gx-dark-bg-secondary` | `#1a1f3a` | 次級背景 |
| `--gx-dark-bg-tertiary` | `#242d4a` | 卡片/組件背景 |
| `--gx-light-bg-primary` | `#ffffff` | 亮色模式主背景 |
| `--gx-light-bg-secondary` | `#f8f9fa` | 次級背景 |
| `--gx-light-bg-tertiary` | `#f0f2f5` | 卡片/組件背景 |

### 邊框系統

| 變數名 | 預設值 |
|--------|--------|
| `--gx-border-subtle` | `1px solid var(--gx-color-gray-200)` |
| `--gx-border-normal` | `1px solid var(--gx-color-gray-300)` |
| `--gx-border-strong` | `2px solid var(--gx-color-gray-400)` |

---

## 動畫系統

### 過渡時間

| 變數名 | 預設值 | 使用場景 |
|--------|--------|---------|
| `--gx-transition-fast` | `150ms` | 快速過渡 |
| `--gx-transition-normal` | `250ms` | 標準過渡 |
| `--gx-transition-slow` | `350ms` | 慢速過渡 |
| `--gx-transition-slower` | `500ms` | 超慢過渡 |

### 緩動函數

| 變數名 | 預設值 |
|--------|--------|
| `--gx-ease-linear` | `linear` |
| `--gx-ease-in` | `cubic-bezier(0.4, 0, 1, 1)` |
| `--gx-ease-out` | `cubic-bezier(0, 0, 0.2, 1)` |
| `--gx-ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--gx-ease-elastic` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

### 動畫名稱

可直接使用的 `@keyframes` 動畫：

- `gx-fade-in` / `gx-fade-out`
- `gx-scale-in` / `gx-scale-out`
- `gx-slide-in-up` / `gx-slide-in-down` / `gx-slide-in-left` / `gx-slide-in-right`
- `gx-pulse` / `gx-pulse-scale`
- `gx-spin` / `gx-spin-reverse`
- `gx-shimmer`
- `gx-bounce` / `gx-bounce-in`
- `gx-shake`

---

## 使用範例

### 1. 覆寫全局變數

```css
/* 在你的 styles.css 中 */
@import '@sanring/gx-styles/gx.css';

:root {
    /* 更改主色為藍色 */
    --gx-color-primary-500: #3B82F6;
    --gx-color-primary-600: #2563EB;

    /* 增強陰影 */
    --gx-shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.3);

    /* 關閉發光效果 */
    --gx-glow-primary: none;

    /* 更透明的玻璃效果 */
    --gx-glass-bg: rgba(255, 255, 255, 0.05);
}
```

### 2. 覆寫特定組件

```css
/* 只改 button 的樣式 */
gx-button {
    --gx-btn-radius: 20px;
    --gx-btn-px: 16px;
    --gx-btn-py: 10px;
}

/* 讓所有 glass 按鈕更模糊 */
gx-button[variant="glass"] {
    --gx-glass-backdrop: blur(20px);
}
```

### 3. 使用 inline style

```html
<!-- 最高優先級 -->
<gx-button
    variant="glass"
    style="--gx-glass-bg: rgba(0, 0, 0, 0.5); --gx-btn-radius: 16px">
    自訂按鈕
</gx-button>
```

### 4. 深色模式自訂

```css
/* 手動深色模式 */
html[data-theme="dark"] {
    --gx-color-primary-500: #FF6B35;  /* 深色模式下的主色 */
    --gx-shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.6);  /* 更深的陰影 */
}

/* 或使用媒體查詢 */
@media (prefers-color-scheme: dark) {
    :root {
        --gx-color-primary-500: #FF6B35;
    }
}
```

### 5. 自訂動畫

```css
/* 改變動畫速度 */
:root {
    --gx-transition-normal: 500ms;  /* 變慢 */
}

/* 使用動畫 */
.my-card {
    animation: gx-scale-in var(--gx-transition-normal) var(--gx-ease-out);
}
```

---

## 組件專屬變數

### Button 組件

在 `gx-button` 元素上可用：

| 變數名 | 預設值 | 說明 |
|--------|--------|------|
| `--gx-btn-bg` | 依 variant | 背景色 |
| `--gx-btn-fg` | 依 variant | 文字色 |
| `--gx-btn-border` | 依 variant | 邊框色 |
| `--gx-btn-px` | `12px` | 水平 padding |
| `--gx-btn-py` | `8px` | 垂直 padding |
| `--gx-btn-radius` | `8px` | 圓角 |

### Card 組件

| 變數名 | 預設值 |
|--------|--------|
| `--gx-card-background` | `var(--gx-color-accent-50)` |
| `--gx-card-text-color` | `var(--gx-color-gray-900)` |
| `--gx-card-border-color` | `var(--gx-color-accent-200)` |

---

## 優先級說明

CSS Variables 的覆寫優先級（從高到低）：

1. **Inline Style** - `style="--var: value"`
2. **組件級別** - `gx-button { --var: value }`
3. **Class 級別** - `.my-class { --var: value }`
4. **Root 級別** - `:root { --var: value }`
5. **預設值** - 套件提供的預設

---

## 無障礙設計

所有動畫都遵循 `prefers-reduced-motion`：

```css
/* 系統設定為「減少動畫」時，動畫會自動禁用 */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

## 相關文檔

- [README.md](./README.md) - 快速開始指南
- [DESIGN_SYSTEM_GUIDE.md](../../DESIGN_SYSTEM_GUIDE.md) - 設計系統架構（AI 參考）
- [gx-button 範例](../gx-ui/src/lib/button/README.md)

---

**有問題？** 請查看完整文檔或提交 Issue。

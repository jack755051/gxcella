# @sanring/gx-styles

GxCella 的設計系統和樣式基礎，提供色彩、動畫、主題等核心樣式。

## ✨ 特色

- 🎨 **完整色彩系統** - 4 組色票 × 10 級別 + Intent 語義系統
- 🌓 **深色模式支援** - 自動響應系統主題或手動控制
- ✨ **現代化效果** - 玻璃態、陰影、發光、漸變
- 🎬 **動畫系統** - 20+ 預設動畫 + 實用類別
- 🔧 **完全可自訂** - 所有變數均可覆寫
- 📦 **零依賴** - 純 CSS Variables，95%+ 瀏覽器支援

---

## 📦 安裝

```bash
npm install @sanring/gx-styles
```

---

## 🚀 快速開始

### 1. 導入樣式

在你的全局樣式文件中：

```css
/* styles.css */
@import '@sanring/gx-styles/gx.css';
```

或在 Angular 中：

```typescript
// angular.json
{
  "styles": [
    "node_modules/@sanring/gx-styles/gx.css",
    "src/styles.css"
  ]
}
```

### 2. 開始使用

現在你可以使用所有的 CSS 變數：

```html
<div style="
    background: var(--gx-gradient-primary);
    padding: 20px;
    border-radius: var(--gx-radius-lg);
    box-shadow: var(--gx-shadow-lg);">
    Hello GxCella! 🚀
</div>
```

---

## 🎨 自訂主題

### 覆寫全局變數

```css
/* 在你的 styles.css 中，導入後覆寫 */
@import '@sanring/gx-styles/gx.css';

:root {
    /* 更改主色 */
    --gx-color-primary-500: #3B82F6;

    /* 調整陰影 */
    --gx-shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.3);

    /* 更透明的玻璃效果 */
    --gx-glass-bg: rgba(255, 255, 255, 0.05);

    /* 關閉發光效果 */
    --gx-glow-primary: none;
}
```

### 覆寫特定組件

```css
/* 只改 button 的樣式 */
gx-button {
    --gx-btn-radius: 20px;
    --gx-btn-px: 16px;
}

/* 讓所有玻璃按鈕更模糊 */
gx-button[variant="glass"] {
    --gx-glass-backdrop: blur(20px);
}
```

### Inline Style（最高優先級）

```html
<gx-button
    variant="glass"
    style="--gx-glass-bg: rgba(0, 0, 0, 0.5)">
    自訂按鈕
</gx-button>
```

---

## 🌓 深色模式

### 自動響應系統主題

預設情況下，會自動響應使用者的系統設定：

```css
/* 已內建 prefers-color-scheme 支援 */
@media (prefers-color-scheme: dark) {
    :root {
        --gx-glass-bg: rgba(26, 31, 58, 0.8);
        --gx-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.4);
        /* ... 更多深色變數 */
    }
}
```

### 手動控制

在 HTML 根元素上設置 `data-theme` 屬性：

```html
<!-- 深色模式 -->
<html data-theme="dark">

<!-- 亮色模式 -->
<html data-theme="light">
```

或使用 class：

```html
<html class="dark">
```

### 自訂深色主題

```css
html[data-theme="dark"] {
    --gx-color-primary-500: #FF6B35;  /* 深色下的主色 */
    --gx-shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.7);
}
```

---

## 📚 可用變數

### 核心色彩

```css
/* Primary (橘紅) */
--gx-color-primary-500: #FE7743;

/* Accent (藍綠) */
--gx-color-accent-500: #447D9B;

/* Gray (中性) */
--gx-color-gray-500: #737373;
```

### 現代化效果

```css
/* 陰影 */
--gx-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
--gx-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--gx-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

/* 玻璃效果 */
--gx-glass-bg: rgba(255, 255, 255, 0.1);
--gx-glass-backdrop: blur(10px);

/* 發光 */
--gx-glow-primary: 0 0 20px rgba(254, 119, 67, 0.3);

/* 漸變 */
--gx-gradient-primary: linear-gradient(135deg, ...);
```

### 動畫

```css
/* 時間 */
--gx-transition-fast: 150ms;
--gx-transition-normal: 250ms;

/* 緩動 */
--gx-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

**查看完整變數列表**: [VARIABLES.md](./VARIABLES.md)

---

## 🎬 使用動畫

### 直接使用動畫名稱

```css
.my-element {
    animation: gx-fade-in var(--gx-transition-normal) var(--gx-ease-out);
}
```

### 使用實用類別

```html
<div class="gx-animate-scale-in">進場動畫</div>
<div class="gx-animate-pulse">持續脈動</div>
<div class="gx-skeleton">載入中...</div>
```

### 可用動畫

- `gx-fade-in` / `gx-fade-out` - 淡入/淡出
- `gx-scale-in` / `gx-scale-out` - 縮放
- `gx-slide-in-up` / `gx-slide-in-down` - 滑動
- `gx-pulse` - 脈動
- `gx-spin` - 旋轉
- `gx-shimmer` - 閃爍（骨架屏）
- `gx-bounce` - 彈跳
- `gx-shake` - 搖晃

---

## 🎯 實用類別

### 過渡效果

```html
<button class="gx-transition-all gx-hover-lift">
    懸停時上浮
</button>

<div class="gx-transition-colors">
    平滑顏色過渡
</div>
```

### 懸停效果

```html
<div class="gx-hover-scale">懸停放大</div>
<div class="gx-hover-glow">懸停發光</div>
```

### Skeleton 載入

```html
<div class="gx-skeleton" style="width: 200px; height: 20px;"></div>
```

---

## 📖 架構說明

### 文件結構

```
gx-styles/src/lib/
├── _variables.css        - 基礎色票和字體
├── _semantic.css         - Intent 語義系統
├── _theme-modern.css     - 現代化增強（陰影、玻璃、發光）
├── _animations.css       - 動畫系統
└── gx-styles.css         - 主入口（導入全部）
```

### 三層變數架構

GxCella 使用三層變數架構，確保使用者可以在任何層級自訂：

```css
/* 第一層：色票（gx-styles） */
:root {
    --gx-color-primary-500: #FE7743;
}

/* 第二層：語義（gx-styles） */
:root {
    --gx-intent-info-bg: var(--gx-color-info-500);
}

/* 第三層：組件（gx-button.css） */
:host {
    --intent-bg: var(--gx-intent-info-bg);
}

.gx-btn {
    background: var(--gx-btn-bg, #fff);  /* fallback */
}
```

**優點**：
- ✅ 使用者可以在任何層級覆寫
- ✅ 有明確的 fallback 值
- ✅ 組件不依賴硬編碼

---

## 🔧 進階使用

### 選擇性導入

如果不想要現代化主題，可以手動導入：

```css
/* 只導入基礎 */
@import '@sanring/gx-styles/_variables.css';
@import '@sanring/gx-styles/_semantic.css';

/* 覆寫為「無」 */
:root {
    --gx-shadow-md: none;
    --gx-glow-primary: none;
}
```

### 創建自訂主題

```css
/* my-theme.css */
@import '@sanring/gx-styles/gx.css';

:root {
    /* 科技藍主題 */
    --gx-color-primary-500: #0EA5E9;
    --gx-color-primary-600: #0284C7;
    --gx-gradient-primary: linear-gradient(135deg, #0EA5E9, #0284C7);
    --gx-glow-primary: 0 0 20px rgba(14, 165, 233, 0.5);
}

html[data-theme="dark"] {
    --gx-dark-bg-primary: #0c1222;
    --gx-dark-bg-secondary: #162033;
}
```

---

## ♿ 無障礙設計

所有動畫都遵循 `prefers-reduced-motion`：

```css
/* 使用者設定「減少動畫」時，動畫會自動禁用 */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

## 📝 範例

### 玻璃態卡片

```html
<div style="
    background: var(--gx-glass-bg);
    backdrop-filter: var(--gx-glass-backdrop);
    border: var(--gx-glass-border);
    border-radius: var(--gx-radius-lg);
    box-shadow: var(--gx-shadow-lg);
    padding: 24px;">
    玻璃態內容
</div>
```

### 霓虹按鈕

```html
<button style="
    background: transparent;
    color: var(--gx-color-primary-500);
    border: 2px solid var(--gx-color-primary-500);
    box-shadow: var(--gx-glow-primary);
    padding: 12px 24px;
    border-radius: var(--gx-radius-md);">
    霓虹按鈕
</button>
```

### 漸變背景

```html
<div style="
    background: var(--gx-gradient-primary);
    padding: 40px;
    border-radius: var(--gx-radius-xl);">
    漸變內容
</div>
```

---

## 📚 相關文檔

- [VARIABLES.md](./VARIABLES.md) - 完整變數列表
- [CHANGELOG.md](./CHANGELOG.md) - 更新日誌
- [gxcella/DESIGN_SYSTEM_GUIDE.md](../../DESIGN_SYSTEM_GUIDE.md) - 設計系統架構（新增組件參考）

---

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

---

## 📄 授權

MIT License

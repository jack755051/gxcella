# 分隔符號不顯示問題診斷

## 問題分析

分隔符號 `<span class="gx-breadcrumb-separator">{{ getSeparator() }}</span>` 不顯示的可能原因：

### 1. CSS 變數未定義

分隔符號顏色依賴：
```css
.gx-breadcrumb-separator {
    color: var(--gx-bc-muted);
}
```

而 `--gx-bc-muted` 定義為：
```css
--gx-bc-muted: var(--gx-color-gray-500);
```

**如果 `--gx-color-gray-500` 未定義，分隔符號會是透明的！**

### 2. 字體不支援特殊字符

某些字體可能不支援：
- `›` (右單引號)
- `·` (中點)
- `–` (連接號)

## 解決方案

### 方案 A：確保 CSS 變數有預設值（推薦）✅

修改 `gx-breadcrumb-item.css`，為 `--gx-bc-muted` 添加回退值：

```css
.gx-breadcrumb-separator {
    display: inline-block;
    line-height: 1;
    padding: 0 6px;
    user-select: none;
    color: var(--gx-bc-muted, #6b7280); /* 添加回退值 */
}
```

### 方案 B：使用更安全的字符

如果是字體問題，可以改用更通用的字符：

```typescript
export const SEP_MAP: Record<GxBreadcrumbSeparator, string> = {
    [GxBreadcrumbSeparator.Slash]:  '/',
    [GxBreadcrumbSeparator.Arrow]:  '>',     // 改用標準 >
    [GxBreadcrumbSeparator.Dot]:    '•',     // 改用標準圓點
    [GxBreadcrumbSeparator.Hyphen]: '-',     // 改用標準連字號
};
```

### 方案 C：使用 SVG 圖標（最穩定）

```typescript
// 在組件中
getSeparatorIcon(): string {
  switch(this.separator) {
    case GxBreadcrumbSeparator.Arrow:
      return `<svg>...</svg>`;
    default:
      return '/';
  }
}
```

## 測試步驟

1. **檢查瀏覽器開發者工具**
   - 打開 Elements 面板
   - 找到 `.gx-breadcrumb-separator` 元素
   - 查看 Computed 標籤中的 `color` 值

2. **檢查 CSS 變數**
   ```javascript
   // 在瀏覽器 console 執行
   const sep = document.querySelector('.gx-breadcrumb-separator');
   console.log(getComputedStyle(sep).color);
   console.log(getComputedStyle(sep).getPropertyValue('--gx-bc-muted'));
   ```

3. **強制設定顏色測試**
   ```css
   .gx-breadcrumb-separator {
       color: red !important; /* 測試用 */
   }
   ```

## 快速修復

**立即可用的修復（不需要重新構建）：**

在你的應用 CSS 中添加：

```css
/* 在 global styles 中 */
:root {
  --gx-color-gray-500: #6b7280;
}

/* 或直接覆蓋 */
.gx-breadcrumb-separator {
  color: #6b7280 !important;
}
```

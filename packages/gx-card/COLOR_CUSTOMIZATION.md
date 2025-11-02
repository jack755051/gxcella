# GX-Card 顏色自定義指南

gx-card 現在支援完整的顏色自定義，您可以通過兩種方式來調整卡片的顏色。

## 方式一：使用 `[colors]` Input 屬性（推薦）

這是最簡單直接的方式，適合程式化控制顏色。

### 基本用法

```typescript
import { IGxCardColors } from '@sanring/gx-card';

// 在組件中定義顏色配置
cardColors: IGxCardColors = {
  background: '#ffffff',
  textColor: '#333333',
  borderColor: '#e0e0e0',
  titleColor: '#1a1a1a',
  subtitleColor: '#666666',
  hoverBackground: '#f5f5f5'
};
```

```html
<!-- 使用顏色配置 -->
<gx-card [colors]="cardColors">
  <gx-card-header [title]="'自定義顏色卡片'"></gx-card-header>
  <gx-card-content>
    <p>這個卡片使用自定義顏色</p>
  </gx-card-content>
</gx-card>
```

### 顏色屬性說明

```typescript
interface IGxCardColors {
  /** 背景色 */
  background?: string;

  /** 文字顏色 */
  textColor?: string;

  /** 邊框顏色 */
  borderColor?: string;

  /** 標題顏色 */
  titleColor?: string;

  /** 副標題顏色 */
  subtitleColor?: string;

  /** 懸停背景色 */
  hoverBackground?: string;
}
```

### 實用範例

#### 1. 深色主題卡片

```typescript
darkCardColors: IGxCardColors = {
  background: '#1e1e1e',
  textColor: '#ffffff',
  borderColor: '#404040',
  titleColor: '#f0f0f0',
  subtitleColor: '#b0b0b0',
  hoverBackground: '#2a2a2a'
};
```

```html
<gx-card [colors]="darkCardColors">
  <gx-card-header
    [title]="'深色主題'"
    [subtitle]="'Dark Theme'">
  </gx-card-header>
  <gx-card-content>
    <p>適合深色模式的卡片設計</p>
  </gx-card-content>
</gx-card>
```

#### 2. 成功狀態卡片（綠色）

```typescript
successCardColors: IGxCardColors = {
  background: '#f0fdf4',
  textColor: '#166534',
  borderColor: '#86efac',
  titleColor: '#14532d',
  subtitleColor: '#15803d',
  hoverBackground: '#dcfce7'
};
```

#### 3. 警告狀態卡片（橙色）

```typescript
warningCardColors: IGxCardColors = {
  background: '#fffbeb',
  textColor: '#92400e',
  borderColor: '#fcd34d',
  titleColor: '#78350f',
  subtitleColor: '#b45309',
  hoverBackground: '#fef3c7'
};
```

#### 4. 錯誤狀態卡片（紅色）

```typescript
errorCardColors: IGxCardColors = {
  background: '#fef2f2',
  textColor: '#991b1b',
  borderColor: '#fca5a5',
  titleColor: '#7f1d1d',
  subtitleColor: '#b91c1c',
  hoverBackground: '#fee2e2'
};
```

#### 5. 資訊狀態卡片（藍色）

```typescript
infoCardColors: IGxCardColors = {
  background: '#eff6ff',
  textColor: '#1e3a8a',
  borderColor: '#93c5fd',
  titleColor: '#1e40af',
  subtitleColor: '#3b82f6',
  hoverBackground: '#dbeafe'
};
```

## 方式二：使用 CSS 變數

適合全域主題設定或更精細的控制。

### 全域設定

在您的全域 CSS 檔案中：

```css
/* styles.css */
:root {
  --gx-card-background: #ffffff;
  --gx-card-text-color: #333333;
  --gx-card-border-color: #e0e0e0;
  --gx-card-title-color: #1a1a1a;
  --gx-card-subtitle-color: #666666;
  --gx-card-hover-background: #f5f5f5;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --gx-card-background: #1e1e1e;
    --gx-card-text-color: #ffffff;
    --gx-card-border-color: #404040;
    --gx-card-title-color: #f0f0f0;
    --gx-card-subtitle-color: #b0b0b0;
    --gx-card-hover-background: #2a2a2a;
  }
}
```

### 針對特定卡片設定

```css
/* 使用 CSS 類別 */
.premium-card {
  --gx-card-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gx-card-text-color: #ffffff;
  --gx-card-border-color: #764ba2;
  --gx-card-title-color: #ffffff;
  --gx-card-subtitle-color: #e0e0e0;
}
```

```html
<gx-card class="premium-card">
  <gx-card-header [title]="'Premium'"></gx-card-header>
  <gx-card-content>
    <p>特殊樣式的卡片</p>
  </gx-card-content>
</gx-card>
```

### 支援漸變背景

```css
.gradient-card {
  --gx-card-background: linear-gradient(to right, #ff7e5f, #feb47b);
  --gx-card-text-color: #ffffff;
  --gx-card-border-color: transparent;
  --gx-card-title-color: #ffffff;
}
```

## 方式三：混合使用

您可以結合兩種方式，獲得最大的靈活性：

```typescript
// 定義部分顏色
partialColors: IGxCardColors = {
  background: '#f9fafb',
  borderColor: '#d1d5db'
};
```

```html
<!-- Input 提供基礎顏色 -->
<gx-card [colors]="partialColors" class="custom-card">
  <gx-card-header [title]="'混合樣式'"></gx-card-header>
  <gx-card-content>
    <p>結合 Input 和 CSS 的自定義</p>
  </gx-card-content>
</gx-card>
```

```css
/* CSS 提供其他顏色 */
.custom-card {
  --gx-card-title-color: #059669;
  --gx-card-hover-background: #ecfdf5;
}
```

## 完整的 CSS 變數列表

```css
--gx-card-background         /* 卡片背景色 */
--gx-card-text-color         /* 卡片文字顏色 */
--gx-card-border-color       /* 卡片邊框顏色 */
--gx-card-title-color        /* 標題顏色 */
--gx-card-subtitle-color     /* 副標題顏色 */
--gx-card-hover-background   /* 懸停時的背景色 */
```

## 最佳實踐

1. **語義化使用**：為不同狀態創建命名的顏色配置（如 `successColors`, `errorColors`）
2. **無障礙考量**：確保文字和背景有足夠的對比度（建議 WCAG AA 標準 4.5:1）
3. **一致性**：在同一應用中保持顏色使用的一致性
4. **主題切換**：使用 CSS 變數配合 `prefers-color-scheme` 實現自動深色模式

## 動態主題切換範例

```typescript
import { Component } from '@angular/core';
import { IGxCardColors } from '@sanring/gx-card';

@Component({
  selector: 'app-themed-card',
  template: `
    <button (click)="toggleTheme()">切換主題</button>
    <gx-card [colors]="currentTheme">
      <gx-card-header [title]="'動態主題'"></gx-card-header>
      <gx-card-content>
        <p>點擊按鈕切換明暗主題</p>
      </gx-card-content>
    </gx-card>
  `
})
export class ThemedCardComponent {
  isDark = false;

  lightTheme: IGxCardColors = {
    background: '#ffffff',
    textColor: '#1a1a1a',
    borderColor: '#e0e0e0',
    titleColor: '#333333',
    subtitleColor: '#666666',
    hoverBackground: '#f5f5f5'
  };

  darkTheme: IGxCardColors = {
    background: '#1e1e1e',
    textColor: '#ffffff',
    borderColor: '#404040',
    titleColor: '#f0f0f0',
    subtitleColor: '#b0b0b0',
    hoverBackground: '#2a2a2a'
  };

  get currentTheme(): IGxCardColors {
    return this.isDark ? this.darkTheme : this.lightTheme;
  }

  toggleTheme() {
    this.isDark = !this.isDark;
  }
}
```

## 與 Angular Material 主題整合

```typescript
import { inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export class CardColorsService {
  getThemeColors(palette: ThemePalette): IGxCardColors {
    switch (palette) {
      case 'primary':
        return {
          background: '#3f51b5',
          textColor: '#ffffff',
          borderColor: '#303f9f',
          titleColor: '#ffffff',
          subtitleColor: '#e8eaf6',
          hoverBackground: '#5c6bc0'
        };
      case 'accent':
        return {
          background: '#ff4081',
          textColor: '#ffffff',
          borderColor: '#f50057',
          titleColor: '#ffffff',
          subtitleColor: '#fce4ec',
          hoverBackground: '#ff6090'
        };
      case 'warn':
        return {
          background: '#f44336',
          textColor: '#ffffff',
          borderColor: '#d32f2f',
          titleColor: '#ffffff',
          subtitleColor: '#ffebee',
          hoverBackground: '#ef5350'
        };
      default:
        return {};
    }
  }
}
```

---

如有任何問題或需要更多範例，請查閱完整文檔或提交 issue。

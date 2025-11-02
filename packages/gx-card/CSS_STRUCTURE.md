# GX-Card CSS 結構說明

本文檔說明 `gx-card.css` 的組織結構，方便後續維護和擴展。

## 📁 整體結構

CSS 檔案已按照功能模塊化組織，共分為 11 個主要區塊：

```
gx-card.css
├── 1. CSS 變數定義
├── 2. 基礎佈局
├── 3. Classic Shape 樣式
├── 4. Square Shape 樣式
├── 5. Landscape Shape 樣式
├── 6. Header 可點擊樣式
├── 7. Card Group 佈局
├── 8. Tags 樣式
├── 9. Media 樣式（圖片）
├── 10. Description 樣式（文字展開/收起）
└── 11. 展開按鈕樣式
```

## 🎨 1. CSS 變數定義

所有可自定義的變數都集中在 `:host` 區塊中，分為以下類別：

### 顏色變數（可被外部覆蓋）
```css
--gx-card-background          /* 卡片背景色 */
--gx-card-text-color          /* 文字顏色 */
--gx-card-border-color        /* 邊框顏色 */
--gx-card-title-color         /* 標題顏色 */
--gx-card-subtitle-color      /* 副標題顏色 */
--gx-card-hover-background    /* 懸停背景色 */
```

### 間距與尺寸
```css
--border-width                /* 邊框寬度 */
--horizontal-gap              /* 水平間距 */
--vertical-gap                /* 垂直間距 */
--grid-gap                    /* 網格間距 */
```

### Shape 特定變數
- **Square**: `--square-padding`, `--square-border-radius`
- **Landscape**: `--landscape-padding`, `--landscape-border-radius`
- **Classic**: `--classic-max-width`, `--classic-border-radius`, `--classic-padding-x/y`, `--classic-avatar-size`, `--classic-shadow-hover`

### 組件特定變數
- **Header**: 標題和副標題的字體大小、粗細
- **Footer**: 動作按鈕間距
- **Tags**: 間距和內距
- **Description**: 內距
- **Expand Button**: 字體大小、顏色、懸停顏色等

## 📐 2. 基礎佈局

定義所有使用 `display: flex` 的基礎元素，確保一致的佈局行為。

## 🎴 3-5. Shape 樣式

每個 Shape 類型都有獨立的區塊：

### Classic Shape
- 垂直佈局卡片
- 包含完整的 header、content、footer
- 支援懸停效果和點擊狀態

### Square Shape
- 方形卡片（1:1 長寬比）
- 簡潔設計

### Landscape Shape
- 橫向布局卡片
- Header 佔 30%，Content 佔 70%

## 🖱️ 6. Header 可點擊樣式

Header 的互動樣式，包括點擊態和懸停態。

## 📊 7. Card Group 佈局

卡片群組的三種佈局方式：
- `gx-layout-horizontal`: 水平排列
- `gx-layout-vertical`: 垂直排列
- `gx-layout-grid`: 網格排列

## 🏷️ 8. Tags 樣式

標籤的排列和間距樣式。

## 🖼️ 9. Media 樣式（圖片）

圖片相關樣式，支援多種長寬比：
- 1:1（正方形）
- 4:3（標準）
- 16:9（寬屏）
- 21:9（超寬屏）
- 3:4（豎向）
- 9:16（手機豎屏）
- auto（自適應）

## 📝 10. Description 樣式

文字描述區域的展開/收起功能樣式：
- 基礎樣式
- 收合狀態（使用 `-webkit-line-clamp`）
- 展開狀態

## 🔘 11. 展開按鈕樣式

控制文字展開/收起的按鈕樣式，包括基礎樣式、懸停態、焦點態。

---

## 🛠️ 維護指南

### 添加新的 Shape

1. 在 **CSS 變數定義** 區塊添加新的變數：
```css
/* === NewShape 卡片樣式 === */
--newshape-padding: 10px;
--newshape-border-radius: 8px;
```

2. 在 CSS 末尾添加新的區塊：
```css
/* --------------------------------------------
   12. NewShape 樣式
   -------------------------------------------- */
.gx-shape-newshape {
  /* 樣式定義 */
}
```

### 修改現有樣式

1. 找到對應的區塊（查看區塊註釋）
2. 修改相關樣式
3. 確保使用 CSS 變數而非硬編碼值

### 添加新的可自定義顏色

1. 在 `:host` 的顏色區塊添加新變數：
```css
--gx-card-new-color: var(--gx-color-xxx, #default);
```

2. 在需要的地方使用該變數：
```css
.some-element {
  color: var(--gx-card-new-color);
}
```

3. 更新 `IGxCardColors` 介面（在 `card.type.ts`）

---

## ✨ 最佳實踐

1. **使用 CSS 變數**：所有可能需要自定義的值都應該使用 CSS 變數
2. **命名規範**：
   - 通用變數：`--gx-card-xxx`
   - Shape 特定：`--shapename-xxx`
   - 組件特定：`--componentname-xxx`
3. **區塊組織**：新增樣式應該歸類到對應區塊，保持結構清晰
4. **註釋清楚**：每個區塊都有清楚的標題註釋
5. **避免重複**：相同的樣式應該提取為共用的 CSS 變數或類別

---

## 📊 變數依賴關係

```
顏色系統:
  --gx-card-background
    └── --gx-card-hover-background

  --gx-card-text-color
    ├── --gx-card-title-color
    └── --gx-card-subtitle-color

  --gx-card-border-color

間距系統:
  --border-width (全域)

  Shape 特定:
    ├── Classic: padding-x, padding-y
    ├── Square: padding
    └── Landscape: padding

  佈局間距:
    ├── --horizontal-gap
    ├── --vertical-gap
    └── --grid-gap
```

---

## 🔄 版本歷史

### v2.0.7
- 重構 CSS 結構為 11 個模塊化區塊
- 添加完整的顏色自定義系統
- 移除重複的樣式定義
- 改進註釋和文檔

---

如有任何問題或建議，請提交 issue 或 PR。

# gxcella 現代化主題實施清單

## 階段 1: 基礎設置 (1-2 小時)

### A. 新增 CSS 文件 

- [ ] 創建 `packages/gx-styles/src/lib/_modern-colors.css`
  - [ ] 深色主題背景色
  - [ ] 品牌漸變定義
  - [ ] 毛玻璃效果變數
  - [ ] 陰影深度系統 (xs-2xl)
  - [ ] 發光效果定義
  - [ ] 邊框樣式

- [ ] 創建 `packages/gx-styles/src/lib/_animations.css`
  - [ ] 過渡時間變數 (fast/normal/slow)
  - [ ] 緩動函數定義
  - [ ] @keyframes gx-fade-in
  - [ ] @keyframes gx-scale-in
  - [ ] @keyframes gx-slide-in-up
  - [ ] @keyframes gx-pulse
  - [ ] @keyframes gx-shimmer

- [ ] 創建 `packages/gx-ui/src/lib/shared/styles/modern-components.css`
  - [ ] .gx-component-glass 樣式
  - [ ] .gx-btn-tech 樣式
  - [ ] .gx-skeleton 加載動畫

### B. 更新主入口文件

- [ ] 修改 `packages/gx-styles/src/lib/gx-styles.css`
  - [ ] 添加 @import "./_modern-colors.css";
  - [ ] 添加 @import "./_animations.css";

- [ ] 修改 `packages/gx-ui/src/lib/shared/model/design-tokens.ts` (可選)
  - [ ] 添加 Animation Token 類型
  - [ ] 添加 Shadow Token 類型
  - [ ] 添加 Gradient Token 類型

### C. 驗證基礎設置

- [ ] 運行 `npm run build` 確保無編譯錯誤
- [ ] 檢查 dist/gx-styles 文件大小是否合理
- [ ] 在瀏覽器開發者工具檢查 CSS 變數是否載入

---

## 階段 2: 組件升級 (2-3 小時)

### A. Button 組件

- [ ] 修改 `packages/gx-ui/src/lib/button/gx-button.ts`
  - [ ] 在 styleUrls 添加 modern-components.css
  - [ ] 添加 variant input: 'glass' | 'neon'
  - [ ] 添加 shadow input: 'none' | 'sm' | 'md' | 'lg' | 'xl'

- [ ] 修改 `packages/gx-ui/src/lib/button/gx-button.css`
  - [ ] 添加 .gx-btn.gx-variant-glass 規則
  - [ ] 添加 .gx-btn.gx-variant-neon 規則
  - [ ] 添加 .gx-btn.gx-shadow-* 規則類別
  - [ ] 更新懸停/激活狀態以使用新變數

- [ ] 修改 `packages/gx-ui/src/lib/button/gx-button.html`
  - [ ] 綁定 variant 屬性
  - [ ] 綁定 shadow 屬性

### B. Card 組件

- [ ] 修改 `packages/gx-card/src/lib/card/gx-card.ts`
  - [ ] 在 styleUrls 添加 modern-components.css

- [ ] 修改 `packages/gx-card/src/lib/card/gx-card.css`
  - [ ] 更新卡片背景使用漸變
  - [ ] 添加陰影深度變數
  - [ ] 更新懸停效果為使用新動畫

### C. 其他組件

- [ ] 更新 gx-tag 組件
  - [ ] 添加過渡動畫
  - [ ] 添加陰影支援

- [ ] 更新 gx-table 組件
  - [ ] 添加行懸停效果
  - [ ] 更新表頭樣式

- [ ] 更新 gx-tooltip 組件
  - [ ] 完整支援深色模式
  - [ ] 添加毛玻璃效果選項

### D. 驗證組件升級

- [ ] 運行 `npm run build:lib` 構建所有 packages
- [ ] 運行單元測試確保無破損
- [ ] 在 demo 應用視覺檢查各組件

---

## 階段 3: 深色模式與主題切換 (1-2 小時)

### A. 主題服務

- [ ] 創建 `packages/gx-ui/src/lib/theme/theme.service.ts`
  - [ ] 實現 GxTheme 類型
  - [ ] 實現 setTheme 方法
  - [ ] 實現 currentTheme signal
  - [ ] 處理 prefers-color-scheme 媒體查詢

- [ ] 創建 `packages/gx-ui/src/lib/theme/theme.provider.ts` (可選)
  - [ ] 創建提供者以簡化注入

### B. 深色模式完整支援

- [ ] 修改 `packages/gx-styles/src/lib/_semantic.css`
  - [ ] 針對深色模式調整所有 Intent 色彩
  - [ ] 更新 .gx-theme-dark 類別

- [ ] 修改 `packages/gx-ui/src/lib/shared/styles/modern-components.css`
  - [ ] 添加 @media (prefers-color-scheme: dark) 查詢
  - [ ] 調整玻璃態效果顏色

- [ ] 修改所有組件 CSS
  - [ ] 檢查暗色背景下的對比度
  - [ ] 添加必要的深色模式覆寫

### C. Demo 應用集成

- [ ] 修改 `apps/gx-demo/src/main.ts` 或根組件
  - [ ] 注入 GxThemeService
  - [ ] 初始化主題為 'auto'

- [ ] 添加主題切換 UI (在 demo navbar)
  - [ ] 按鈕切換 light/dark/auto
  - [ ] 顯示當前主題狀態

### D. 驗證深色模式

- [ ] 測試系統深色模式偏好 (OS 級別)
- [ ] 測試手動主題切換
- [ ] 驗證所有色彩對比度 (WCAG AA 標準)
- [ ] 檢查所有變體在深色模式下的顯示

---

## 階段 4: 高級特性 (可選，後期)

### A. 動畫增強

- [ ] 添加頁面過渡動畫
- [ ] 添加組件進入/退出動畫
- [ ] 添加列表項動畫
- [ ] 優化加載狀態動畫

### B. 響應式調整

- [ ] 針對移動設備的陰影調整
- [ ] 簡化深色模式對移動設備的效果
- [ ] 添加觸摸設備特定樣式

### C. 性能優化

- [ ] 檢查 CSS 變數解析性能
- [ ] 優化動畫使用 GPU 加速
- [ ] 檢查組件樣式大小

---

## 階段 5: 文檔與測試 (1 小時)

### A. 文檔

- [ ] 更新 `packages/gx-styles/README.md`
  - [ ] 說明 CSS 變數層級結構
  - [ ] 列出所有導出變數
  - [ ] 提供使用示例

- [ ] 創建 `packages/gx-ui/THEMING.md`
  - [ ] 主題系統指南
  - [ ] 自訂主題示例
  - [ ] 深色模式實現

- [ ] 更新主項目 README
  - [ ] 添加設計系統章節
  - [ ] 列舉新視覺特性

### B. 視覺測試

- [ ] 建立視覺回歸測試
  - [ ] 各種主題的組件截圖
  - [ ] 響應式設計測試
  - [ ] 暗光模式對比

### C. 可訪問性測試

- [ ] 檢查色彩對比度 (WCAG AA/AAA)
- [ ] 驗證動畫不違反減動畫偏好
- [ ] 測試鍵盤導航在新樣式下

### D. 跨瀏覽器測試

- [ ] Chrome/Edge (Chromium) 最新版
- [ ] Firefox 最新版
- [ ] Safari 最新版
- [ ] 移動瀏覽器 (iOS Safari, Chrome Mobile)

---

## 階段 6: 發布與通知 (30 分鐘)

### A. 打包與發布

- [ ] 增加版本號 (minor bump: v1.1.0)
- [ ] 更新 CHANGELOG
  - [ ] 新功能: 現代化主題系統
  - [ ] 改進: 深色模式支援
  - [ ] 新組件變體: glass, neon

- [ ] 提交 commit
  ```bash
  git commit -m "feat: add modern theme system with glass morphism and neon effects"
  ```

- [ ] 發布到 npm
  ```bash
  npm publish
  ```

### B. 通知使用者

- [ ] 發佈 release notes
- [ ] 更新官方示例
- [ ] 發送升級指南

---

## 驗收準則

### 視覺效果 ✓
- [ ] 所有組件顯示新的視覺效果 (漸變、陰影、動畫)
- [ ] 玻璃態和霓虹變體在深色背景下清晰可見
- [ ] 發光效果適度，不過度耀眼

### 功能性 ✓
- [ ] 主題切換無延遲 (< 50ms)
- [ ] 深色模式遵守系統偏好
- [ ] 所有組件在深色模式下可用性 >= 90%

### 性能 ✓
- [ ] 樣式加載時間無顯著增加
- [ ] CSS 變數解析無性能問題
- [ ] 動畫幀率 >= 60fps

### 兼容性 ✓
- [ ] 支援 95%+ 主流瀏覽器
- [ ] 無 CSS 編譯錯誤
- [ ] 向後兼容現有 API

### 文檔 ✓
- [ ] 完整的 API 文檔
- [ ] 至少 5 個使用示例
- [ ] 主題自訂指南

---

## 時間估算

| 階段 | 項目 | 估計時間 | 實際時間 |
|------|------|---------|---------|
| 1 | 基礎設置 | 1.5h | _ |
| 2 | 組件升級 | 2.5h | _ |
| 3 | 主題系統 | 1.5h | _ |
| 4 | 高級特性 | 2-3h | _ (可選) |
| 5 | 文檔測試 | 1h | _ |
| 6 | 發布通知 | 0.5h | _ |
| **總計** | | **~9h** | _ |

---

## 完成簽核

- [ ] 項目經理審核
- [ ] 設計師視覺確認
- [ ] QA 完整測試
- [ ] 發布到生產

---

## 相關資源

- 完整分析: `/THEME_AND_STYLING_ANALYSIS.md`
- 快速指南: `/QUICK_START_MODERN_THEME.md`
- 示例代碼: 本文檔中的代碼片段
- CSS 變數參考: `packages/gx-styles/src/lib/`


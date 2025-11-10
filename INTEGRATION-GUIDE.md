# GX-Table 整合指南

## 總結回答

**✅ 應該整合到 gxcella/gx-table 組件內**

所有修正已經同步到 `gxcella/packages/gx-table` 並準備發布為 `v0.2.0`。

## 為什麼應該整合到組件內？

### ✅ 優點

1. **單一事實來源** - 所有專案使用同一個套件版本
2. **統一維護** - 只需要在一個地方修正 bug
3. **自動更新** - 專案只需要 `npm install` 就能獲得修正
4. **版本控制** - 清楚知道哪個版本有哪些功能/修正
5. **避免重複程式碼** - 不需要在每個專案都複製修正

### ❌ 在主專案實現的缺點

1. **重複修正** - 每個使用 gx-table 的專案都要修正一次
2. **版本不一致** - 不同專案可能有不同的修正版本
3. **難以維護** - 組件 bug 要在多個地方修
4. **違反 DRY 原則** - Don't Repeat Yourself

## 已完成的工作

### 1. 同步所有修正到 gxcella/gx-table ✅

#### 修正的檔案：

**Header Cell:**
- `table-header-cell/gx-table-header-cell.ts` - 改為 `th[gx-table-header-cell]` selector + host bindings
- `table-header-cell/gx-table-header-cell.html` - 移除 `<th>` 標籤
- `table-header-cell/gx-table-header-cell.css` - 改用 `:host` + 加入 `background-color`

**Body Cell:**
- `table-cell/gx-table-cell.ts` - 改為 `td[gx-table-cell]` selector + host bindings
- `table-cell/gx-table-cell.html` - 移除 `<td>` 標籤
- `table-cell/gx-table-cell.css` - 改用 `:host`

**Header & Row:**
- `table-header/gx-table-header.html` - 改用 `<th gx-table-header-cell>`
- `table-row/gx-table-row.html` - 改用 `<td gx-table-cell>`

**Shell:**
- `table-shell/gx-table-shell.ts` - 已有 `stickyHeader` 和 `tableLayout` 輸入
- `table-shell/gx-table-shell.html` - 已有正確的 class bindings
- `table-shell/gx-table-shell.css` - 已有完整的 sticky header 樣式

### 2. 建立新版本 ✅

- **版本號:** `0.2.0` (Minor version bump，因為有 API 變更)
- **CHANGELOG:** 已更新，包含完整的變更說明和遷移指南
- **Build:** 成功編譯 (`npm run build`)

## 下一步行動

### 步驟 1: 發布到 npm

```bash
cd /Users/charlie010583/Desktop/01_private/gxcella/packages/gx-table

# 檢查登入狀態
npm whoami

# 如果沒登入，先登入
npm login

# 發布新版本
npm publish
```

### 步驟 2: 在 guangxun 專案更新版本

```bash
cd /Users/charlie010583/Desktop/01_private/guangxun/guangxun-frontend

# 更新到最新版本
npm install @sanring/gx-table@0.2.0

# 或使用 latest
npm install @sanring/gx-table@latest
```

### 步驟 3: 清理 guangxun 中的臨時修正

以下檔案可以**還原**到使用 npm 套件的版本：

**需要還原的檔案：**
```
guangxun-frontend/projects/shared/src/gx-table/
├── table-header-cell/
│   ├── gx-table-header-cell.ts
│   ├── gx-table-header-cell.html
│   └── gx-table-header-cell.css
├── table-cell/
│   ├── gx-table-cell.ts
│   ├── gx-table-cell.html
│   └── gx-table-cell.css
├── table-header/
│   └── gx-table-header.html
├── table-row/
│   └── gx-table-row.html
├── table-shell/
│   ├── gx-table-shell.ts
│   ├── gx-table-shell.html
│   └── gx-table-shell.css
```

**清理方式：**

選項 A：**直接刪除本地 copy，使用 npm 套件**（推薦）
```bash
# 刪除本地的 gx-table
rm -rf guangxun-frontend/projects/shared/src/gx-table

# 從 @sanring/gx-table 引入
```

選項 B：**保留但從 npm 套件同步**
```bash
# 手動同步每個檔案（不推薦，容易出錯）
```

### 步驟 4: 更新 import 路徑（如果之前是從本地引入）

**Before:**
```typescript
import { GxTableShell } from '@shared/gx-table/...';
```

**After:**
```typescript
import { GxTableShell } from '@sanring/gx-table';
```

## 驗證清單

發布並更新後，請驗證：

- [ ] `npm list @sanring/gx-table` 顯示 `0.2.0`
- [ ] Header 背景色正常顯示 (#e6f8f9)
- [ ] Sticky header 滾動時固定在頂部
- [ ] 欄位寬度正確分配（百分比總和 100%）
- [ ] 表格填滿容器寬度
- [ ] 排序功能正常
- [ ] Checkbox 選擇功能正常

## Breaking Changes

**對於直接使用低階元件的專案：**

需要更新 HTML 模板：

```html
<!-- Before (v0.1.x) -->
<gx-table-header-cell [column]="column"></gx-table-header-cell>
<gx-table-cell [column]="column" [row]="row"></gx-table-cell>

<!-- After (v0.2.0) -->
<th gx-table-header-cell [column]="column"></th>
<td gx-table-cell [column]="column" [row]="row"></td>
```

**對於使用 `gx-table-wrapper` 或 `gx-table-header`/`gx-table-body` 的專案：**

✅ **無需任何修改** - 這些高階元件已經內部使用正確的語法

## 專案架構建議

```
gxcella/                          # 組件庫（source of truth）
└── packages/
    └── gx-table/                 # 核心表格組件
        └── v0.2.0                # ← 修正在這裡

guangxun/                         # 專案 A
└── node_modules/
    └── @sanring/gx-table/        # ← 從 npm 安裝

future-project/                   # 專案 B（未來的專案）
└── node_modules/
    └── @sanring/gx-table/        # ← 從 npm 安裝
```

## 總結

✅ **已完成：**
1. 所有修正同步到 gxcella/gx-table
2. 版本升至 0.2.0
3. CHANGELOG 已更新
4. Build 成功

🔄 **待執行：**
1. 發布 `@sanring/gx-table@0.2.0` 到 npm
2. 在 guangxun 專案執行 `npm install @sanring/gx-table@0.2.0`
3. 清理 guangxun 中的臨時修正（刪除本地 copy）
4. 測試驗證所有功能

💡 **關鍵優勢：**
- 一次修正，所有專案受益
- 清楚的版本控制
- 統一的維護流程
- 避免程式碼重複

# @sanring/gx-table

## 0.2.1

### Patch Changes

- 830371c: upgrade gx-table

## 0.2.0

### Minor Changes

- **🐛 Critical Bug Fix: Component Selector Correction**

  Fixed fundamental issue with component selectors that caused multiple layout problems.

  **What Changed:**

  - Changed `gx-table-header-cell` from element selector to attribute selector (`th[gx-table-header-cell]`)
  - Changed `gx-table-cell` from element selector to attribute selector (`td[gx-table-cell]`)
  - Updated templates to use `<th gx-table-header-cell>` instead of `<gx-table-header-cell>`
  - Updated templates to use `<td gx-table-cell>` instead of `<gx-table-cell>`
  - Changed CSS from `th` selector to `:host` selector
  - Added `background-color` to header cell styles

  **Fixes:**

  - ✅ Header background color now displays correctly (#e6f8f9)
  - ✅ Sticky header now works properly when scrolling
  - ✅ Column widths now respect percentage values with `table-layout: fixed`
  - ✅ Table now fills 100% width when configured
  - ✅ Proper HTML table structure (no wrapper elements)

  **Migration Required (only if using low-level components directly):**

  Most users won't need to change anything if using `gx-table-wrapper` or `gx-table-header`/`gx-table-body`.

  If you're manually using components:

  ```html
  <!-- Before -->
  <gx-table-header-cell [column]="column"></gx-table-header-cell>

  <!-- After -->
  <th gx-table-header-cell [column]="column"></th>
  ```

## 0.1.13

### Patch Changes

- 98deac6: upgrade to 0.1.13

## 0.1.12

### Patch Changes

- a12ad08: upgrade to 0.1.12

## 0.1.11

### Patch Changes

- f3511e1: upgrade to "0.1.10"

## 0.1.10

### Patch Changes

- 4bc7ffe: upgrade to 0.1.10

## 0.1.9

### Patch Changes

- ae2247b: upgrade to 0.1.9

## 0.1.8

### Patch Changes

- d23b6a0: upgrade to 0.1.6

## 0.1.5

### Patch Changes

- d868236: upgrade to 0.1.5

## 0.1.4

### Patch Changes

- 631681c: upgrade gx-table

## 0.1.3

### Patch Changes

- 52c462c: upgrade gx-table

## 0.1.2

### Patch Changes

- a878c23: include all dist files in npm package

## 0.1.1

### Patch Changes

- 3435b22: fix README

## 0.1.0

### Minor Changes

- 修正發布配置，確保發布編譯後的 dist 檔案而非原始碼

  - 新增 publishConfig.directory 設定為 "dist"
  - 新增 prepublishOnly script 來建置和同步版本號
  - 新增 exports 和 types 欄位指向正確的編譯檔案路徑
  - 新增 repository 資訊
  - 修正 ng-package.json 的 dest 路徑為 "./dist"

  **重要：** 0.0.3 和 0.0.4 版本包含錯誤的原始碼，請使用 0.1.0 以上版本

## 0.0.4

### Patch Changes

- 8c7f30f: 修正發布配置，確保發布編譯後的 dist 檔案而非原始碼

  - 新增 publishConfig.directory 設定為 "dist"
  - 新增 prepublishOnly script 來建置和同步版本號
  - 新增 exports 和 types 欄位指向正確的編譯檔案路徑
  - 新增 repository 資訊

- d0ccc21: fix no dist

## 0.0.3

### Patch Changes

- 110b3ac: fix readme

## 0.0.2

### Patch Changes

- 96975a5: build : build wizard and table

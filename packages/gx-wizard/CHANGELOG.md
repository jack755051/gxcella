# @sanring/gx-wizard

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

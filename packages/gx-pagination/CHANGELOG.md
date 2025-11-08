# @sanring/gx-pagination

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

## 0.0.1

### Patch Changes

- Initial release of gx-pagination component

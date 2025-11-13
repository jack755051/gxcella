# @sanring/gx-breadcrumb

## 5.0.1

### Patch Changes

- e5291af: upgrade package

## 5.0.0

### Minor Changes

- 5260557: minor all package

## 4.0.1

### Patch Changes

- 84b5fce: upgrade angular 19 to 20

## 4.0.0

### Major Changes

- a878c23: # 🎉 重大重構：組合式設計（Breaking Changes）

  參考 `@sanring/gx-table` 的成功架構，完全重構 gx-breadcrumb 為組合式設計。

  ## 💥 Breaking Changes

  - 原有的 `<gx-breadcrumb>` 組件重命名為 `<gx-breadcrumb-legacy>`
  - 新的 `<gx-breadcrumb>` 組件採用不同的 API（支援 `mode` 屬性）

  ## ✨ 新功能

  ### 🆕 組合式組件（推薦使用）

  - **GxBreadcrumbContainer** - 容器組件，提供主題和變體樣式
  - **GxBreadcrumbList** - 列表組件，負責渲染麵包屑項目容器
  - **GxBreadcrumbItemV2** - 項目組件，完全獨立可用

  ### 🆕 包裝組件（便捷使用）

  - **GxBreadcrumb** - 支援三種模式：
    - `mode="auto"` - 從路由自動生成（預設）
    - `mode="manual"` - 手動提供資料
    - `mode="custom"` - 完全自定義投影內容

  ### 🆕 Signal API

  - **BreadcrumbStateService** - 基於 Signal 的狀態管理服務
  - 完整的 Angular Signal 支援，使用 `toSignal` 和 `computed`

  ### 🆕 主題擴展

  - 新增 `minimal` 和 `colorful` 變體
  - 新增 `dark` 和 `brand` 主題
  - 更完善的 CSS 變數系統

  ## 📦 升級指南

  ### 方式 1：使用舊版 API（向後兼容）

  ```typescript
  // 將 imports 改為 GxBreadcrumbLegacy
  import { GxBreadcrumbLegacy } from '@sanring/gx-breadcrumb';

  @Component({
    imports: [GxBreadcrumbLegacy],
    template: `<gx-breadcrumb-legacy [data]="breadcrumbs" />`
  })
  ```

  ### 方式 2：升級到新的包裝組件

  ```typescript
  import { GxBreadcrumb } from '@sanring/gx-breadcrumb';

  @Component({
    imports: [GxBreadcrumb],
    template: `
      <!-- 自動模式 -->
      <gx-breadcrumb mode="auto" />

      <!-- 或手動模式 -->
      <gx-breadcrumb mode="manual" [data]="breadcrumbs" />
    `
  })
  ```

  ### 方式 3：使用新的組合式 API（推薦）

  ```typescript
  import {
    GxBreadcrumbContainer,
    GxBreadcrumbList,
    GxBreadcrumbItemV2
  } from '@sanring/gx-breadcrumb';

  @Component({
    imports: [GxBreadcrumbContainer, GxBreadcrumbList, GxBreadcrumbItemV2],
    template: `
      <gx-breadcrumb-container theme="default" variant="modern">
        <gx-breadcrumb-list>
          <gx-breadcrumb-item-v2
            label="首頁"
            link="/"
            [showIcon]="true"
            icon="🏠"
          />
          <gx-breadcrumb-item-v2
            label="產品"
            [active]="true"
            [showSeparator]="false"
          />
        </gx-breadcrumb-list>
      </gx-breadcrumb-container>
    `
  })
  ```

  ## 🎯 優勢

  1. ✅ **完全控制** - 每個組件都可以獨立使用
  2. ✅ **高度可組合** - 可以在 Item 之間插入自定義內容
  3. ✅ **更好的抽象** - 清晰的組件職責分離
  4. ✅ **Signal 原生支援** - 現代化的響應式狀態管理
  5. ✅ **類似 gx-table** - 一致的設計語言，學習曲線低

  ## 📚 詳細文檔

  請參閱更新後的 README.md 獲取完整使用指南。

### Patch Changes

- a878c23: include all dist files in npm package

## 3.0.1

### Patch Changes

- 3435b22: fix README

## 3.0.0

### Minor Changes

- 2d9e3e0: refactor gx-card

## 2.0.7

### Patch Changes

- 3bd14a0: chore: upgrade gx-ui

## 2.0.6

### Patch Changes

- e9ab549: upgrade gx-ui

## 2.0.5

### Patch Changes

- chore: sync all packages to 2.0.5 and fix gx-card npm publish

## 2.0.4

### Patch Changes

- 5b252bf: chore: bump all packages to 2.0.4 for consistency
- 6f553d5: feat(gx-card): add image ratio support for card contentchore: bump all packages to 2.0.4 for consistency

## 2.0.3

### Patch Changes

- f607f37: fix npm package missing dist files

## 2.0.2

### Patch Changes

- 7d7d820: fix: include all dist files in npm package

## 2.0.1

### Patch Changes

- 0a92101: fix missing dist files in npm package

## 2.0.0

### Minor Changes

- 1712402: chore: bump to 1.1.0

## 1.0.9

### Patch Changes

- b80e07d: bump to 1.0.9

## 1.0.8

### Patch Changes

- d558dbc: chore: bump gx-breadcrumb to 1.0.8

## 1.0.7

## 1.0.6

### Patch Changes

- ed9602a: republish breadcrumb with synced dist version

## 1.0.5

### Patch Changes

- [`d2d2c6a`](https://github.com/jack755051/gxcella/commit/d2d2c6a09eb709c4fe9cd1c9916651c7ef4a294b) Thanks [@charlie-tai](https://github.com/charlie-tai)! - republish with synced dist version

## 1.0.4

### Patch Changes

- [`b0f8f3c`](https://github.com/jack755051/gxcella/commit/b0f8f3cb0962a17b5e9035dfc9602f73688268e1) Thanks [@charlie-tai](https://github.com/charlie-tai)! - sync dist package.json version & republish

## 1.0.3

### Patch Changes

- [`749dd86`](https://github.com/jack755051/gxcella/commit/749dd869d3d3a9550d7d4740a0b2a12488bd5f03) Thanks [@charlie-tai](https://github.com/charlie-tai)! - bump dependencies and update internal references

- Updated dependencies [[`749dd86`](https://github.com/jack755051/gxcella/commit/749dd869d3d3a9550d7d4740a0b2a12488bd5f03)]:
  - @sanring/gx-styles@1.0.2

## 1.0.2

### Patch Changes

- [`d4958dc`](https://github.com/jack755051/gxcella/commit/d4958dc6741d299eaef81eaba0186501400fd603) Thanks [@charlie-tai](https://github.com/charlie-tai)! - bump dependencies and update internal references

- [`323f0d1`](https://github.com/jack755051/gxcella/commit/323f0d18ca03d68acbce615f09892532b841d359) Thanks [@charlie-tai](https://github.com/charlie-tai)! - upload card

- [`21c7b36`](https://github.com/jack755051/gxcella/commit/21c7b36191da80dd41af32085df4c5e301b1bd2a) Thanks [@charlie-tai](https://github.com/charlie-tai)! - upload breadcrumb && card

- Updated dependencies [[`d4958dc`](https://github.com/jack755051/gxcella/commit/d4958dc6741d299eaef81eaba0186501400fd603), [`323f0d1`](https://github.com/jack755051/gxcella/commit/323f0d18ca03d68acbce615f09892532b841d359)]:
  - @sanring/gx-styles@1.0.1

## 1.0.1

### Patch Changes

- [`24676c0`](https://github.com/jack755051/gxcella/commit/24676c08363d84dba0374d0339e3d1ff1a225d72) Thanks [@charlie-tai](https://github.com/charlie-tai)! - republish breadcrumb

## 1.0.0

### Minor Changes

- [`de71bcd`](https://github.com/jack755051/gxcella/commit/de71bcd959f97001265774d085ca94db621f75ec) Thanks [@charlie-tai](https://github.com/charlie-tai)! - 初始化第一次發佈版本

### Patch Changes

- Updated dependencies [[`de71bcd`](https://github.com/jack755051/gxcella/commit/de71bcd959f97001265774d085ca94db621f75ec)]:
  - @sanring/gx-styles@0.1.0

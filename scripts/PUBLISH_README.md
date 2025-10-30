# 套件發布自動化腳本

## 快速開始

```bash
./scripts/publish.sh
```

## 功能特色

✨ **互動式引導流程** - 腳本會逐步引導你完成所有操作
🔒 **安全檢查** - 自動檢查 git 狀態,避免意外提交
🎯 **靈活選擇** - 可選擇單一或多個套件同時更新
📦 **自動建構** - 自動執行所有套件的建構
🚀 **一鍵發布** - 自動發布到 npm 並推送到 GitHub

## 使用流程

腳本會引導你完成以下步驟:

### 1️⃣ 選擇要更新的套件
```
請選擇要更新的套件 (可多選，用空格分隔):
  1) @sanring/gx-breadcrumb
  2) @sanring/gx-card
  3) @sanring/gx-ui
  4) 全部套件

請輸入選項 (例: 1 2 或 4):
```

### 2️⃣ 選擇版本升級類型
```
請選擇版本升級類型:
  1) patch  - 修復錯誤 (2.0.5 -> 2.0.6)
  2) minor  - 新增功能 (2.0.5 -> 2.1.0)
  3) major  - 重大變更 (2.0.5 -> 3.0.0)

請輸入選項 (1-3):
```

### 3️⃣ 輸入變更摘要
```
請輸入此次變更的摘要 (例: fix: 修復卡片圖片比例問題):
摘要:
```

### 4️⃣ 確認並建構
腳本會顯示新版本號,詢問是否繼續建構和發布。

### 5️⃣ 輸入 OTP (一次性密碼)
```
請從你的驗證器應用程式取得 OTP (一次性密碼)
請輸入 6 位數 OTP:
```

### 6️⃣ 輸入 Commit Message (可選)
```
請輸入 commit message (留空則使用: 'chore: release packages'):
Commit message:
```

### 7️⃣ 完成!
腳本會自動:
- 發布到 npm
- 創建 git tags
- 推送到 GitHub

## 範例使用情境

### 情境 1: 修復 gx-card 的 bug

```bash
$ ./scripts/publish.sh

# 選擇套件
請輸入選項: 2

# 選擇版本類型
請輸入選項: 1

# 輸入摘要
摘要: fix: 修復卡片圖片比例計算錯誤

# 確認繼續
是否繼續建構和發布? y

# 輸入 OTP
請輸入 6 位數 OTP: 123456

# 輸入 commit message (或按 Enter 使用預設)
Commit message:

# 完成! ✅
```

### 情境 2: 統一更新所有套件版本

```bash
$ ./scripts/publish.sh

# 選擇全部套件
請輸入選項: 4

# 選擇 patch 升級
請輸入選項: 1

# 輸入摘要
摘要: chore: bump all packages for consistency

# 其餘步驟同上...
```

### 情境 3: gx-breadcrumb 和 gx-card 新增功能

```bash
$ ./scripts/publish.sh

# 選擇多個套件
請輸入選項: 1 2

# 選擇 minor 升級
請輸入選項: 2

# 輸入摘要
摘要: feat: add new navigation features

# 其餘步驟同上...
```

## 腳本執行內容

腳本會自動執行以下操作:

1. ✅ 檢查 git 工作目錄狀態
2. ✅ 創建 changeset 檔案
3. ✅ 執行 `yarn changeset version` 更新版本號
4. ✅ 執行 `yarn build` 建構所有套件
5. ✅ 執行 `yarn changeset publish --access public --otp=<你的OTP>` 發布到 npm
6. ✅ 執行 `git push --follow-tags` 推送變更和標籤到 GitHub

## 注意事項

⚠️ **執行前確認:**
- 確保你在專案根目錄
- 確保已登入 npm (`npm login`)
- 確保 npm 帳號已啟用 2FA
- 確保有 GitHub 推送權限

⚠️ **錯誤處理:**
- 如果發布失敗,腳本會立即停止
- 檢查錯誤訊息並手動修復
- 必要時可以手動執行個別步驟

⚠️ **OTP 時效:**
- OTP 通常只有 30 秒有效期
- 請在提示時才開啟驗證器 app
- 如果 OTP 過期,重新執行腳本即可

## 手動執行步驟 (備用方案)

如果需要手動執行,可以參考以下步驟:

```bash
# 1. 創建 changeset
yarn changeset
# 選擇套件、版本類型、輸入摘要

# 2. 更新版本
yarn changeset version

# 3. 建構套件
yarn build

# 4. 發布到 npm
yarn changeset publish --access public --otp=<你的OTP>

# 5. 推送到 GitHub
git push --follow-tags
```

## 疑難排解

### 問題: "請在專案根目錄執行此腳本"
**解決方案:** 確保在 `gxcella` 專案根目錄執行腳本

### 問題: "OTP 錯誤"
**解決方案:**
- 確認 OTP 是 6 位數字
- 確認 OTP 未過期
- 重新執行腳本並輸入新的 OTP

### 問題: "npm 權限錯誤"
**解決方案:**
```bash
npm login
# 輸入帳號密碼,完成登入
```

### 問題: "Git 推送失敗"
**解決方案:**
```bash
# 檢查 remote 設定
git remote -v

# 確保有推送權限
git push --dry-run
```

## 維護與修改

腳本位置: `scripts/publish.sh`

如需修改流程,可以直接編輯此檔案。主要可修改的部分:
- 套件列表 (新增或移除套件)
- 預設 commit message
- 建構指令
- 發布參數

## 支援

如有問題或建議,請聯繫專案維護者。

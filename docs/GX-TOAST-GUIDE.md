# GX Toast 組件使用指南

## 概述

GX Toast 是一個靈活且功能豐富的通知組件，支援多種類型的訊息顯示、自定義樣式、互動功能，以及**倒數計時顯示**。

## 快速開始

### 1. 安裝配置

在您的 `app.config.ts` 中添加 Toast provider：

```typescript
import { provideToasts } from '@sanring/gx-ui';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... 其他 providers
    provideToasts({
      position: 'top-right',
      max: 5,
      width: '320px',
      defaultDuration: 3000
    })
  ]
};
```

### 2. 自定義配置範例

您可以根據需求自定義各種配置選項：

```typescript
// 基本配置
provideToasts({
  position: 'top-right',
  max: 5,
  width: '320px',
  defaultDuration: 3000
})

// 自定義配置範例（包含您的設定）
provideToasts({
  defaultDuration: 5000, // 全域覆寫自動關閉時間為 5 秒
  width: '700px',        // 自定義寬度為 700px
  max: 4,                // 最大同時顯示 4 個通知
  position: 'top-center', // 置中顯示
  zIndex: 10000,         // 自定義層級
  containerClass: 'my-toast-container' // 自定義容器樣式
})

// 行動裝置優化配置
provideToasts({
  position: 'bottom-center',
  width: '90%',
  max: 3,
  defaultDuration: 4000
})
```

### 3. 基本使用

在組件中注入 `GxToastService` 並使用：

```typescript
import { Component, inject } from '@angular/core';
import { GxToastService } from '@sanring/gx-ui';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="showToast()">顯示通知</button>
    <button (click)="showCountdownToast()">顯示倒數通知</button>
  `
})
export class ExampleComponent {
  private toast = inject(GxToastService);

  showToast() {
    this.toast.show({
      kind: 'success',
      title: '操作成功',
      message: '您的操作已成功完成！',
      duration: 3000
    });
  }

  // 新功能：帶倒數計時的通知
  showCountdownToast() {
    this.toast.show({
      kind: 'info',
      title: '處理中',
      message: '系統正在處理您的請求',
      duration: 10000,
      countdown: true  // 啟用倒數計時顯示
    });
  }
}
```

## API 文檔

### GxToastService 方法

#### `show(toast: Omit<GxToast, 'id'>): number`
顯示一個新的 toast 通知。

**參數：**
- `toast`: Toast 配置對象（不包含 id，id 會自動生成）

**返回值：**
- `number`: Toast 的唯一 ID

#### `dismiss(id: number): void`
關閉指定 ID 的 toast。

#### `clear(): void`
清除所有 toast 通知。

### GxToast 介面

```typescript
interface GxToast {
  id: number;                    // 自動生成的唯一 ID
  kind: GxToastCategory;         // 通知類型
  message: string;               // 主要訊息
  title?: string;                // 可選標題
  icon?: string;                 // 自定義圖示
  duration?: number;             // 自動關閉時間（毫秒）
  dismissible?: boolean;         // 是否可手動關閉（預設 true）
  countdown?: boolean;           // 🆕 是否顯示倒數計時（預設 false）
  remainingSec?: number;         // 🆕 剩餘秒數（由服務內部維護，無需手動設定）
  action?: {                     // 自定義動作按鈕
    label: string;
    handler: () => void;
  };
}
```

### 通知類型 (GxToastCategory)

- `'info'`: 一般資訊（藍色）
- `'success'`: 成功訊息（綠色）
- `'warning'`: 警告訊息（橘色）
- `'error'`: 錯誤訊息（紅色）

## 配置選項

### GxToastConfig 介面

```typescript
interface GxToastConfig {
  position: GxToastPosition;     // 顯示位置
  max: number;                   // 最大同時顯示數量
  zIndex: number;                // CSS z-index
  containerId: string;           // 容器 ID
  containerClass?: string;       // 容器 CSS 類別
  width?: string;                // Toast 寬度
  attachTo?: 'body' | string | HTMLElement; // 掛載目標
  defaultDuration?: number;      // 預設自動關閉時間
}
```

### 預設配置值

```typescript
const DEFAULT_TOAST_CONFIG: GxToastConfig = {
  position: 'top-right',
  max: 5,
  zIndex: 9999,
  containerId: 'gx-toast-container-root',
  width: '320px',
  attachTo: 'body',
  defaultDuration: 3000,
};
```

### 位置選項 (GxToastPosition)

- `'top-right'`: 右上角（預設）
- `'top-left'`: 左上角
- `'top-center'`: 上方中央
- `'bottom-right'`: 右下角
- `'bottom-left'`: 左下角
- `'bottom-center'`: 下方中央

## 使用範例

### 基本通知類型

```typescript
export class ToastExamplesComponent {
  private toast = inject(GxToastService);

  // 成功通知
  showSuccess() {
    this.toast.show({
      kind: 'success',
      title: '操作成功',
      message: '您的設定已儲存',
      duration: 3000
    });
  }

  // 錯誤通知
  showError() {
    this.toast.show({
      kind: 'error',
      title: '操作失敗',
      message: '請檢查網路連線並重試',
      duration: 5000
    });
  }

  // 警告通知
  showWarning() {
    this.toast.show({
      kind: 'warning',
      title: '注意',
      message: '此操作無法復原',
      duration: 4000
    });
  }

  // 資訊通知
  showInfo() {
    this.toast.show({
      kind: 'info',
      title: '提示',
      message: '新功能已上線，歡迎體驗！'
    });
  }
}
```

### 🆕 倒數計時功能

倒數計時功能讓用戶清楚知道通知還有多久會自動關閉，提升用戶體驗：

```typescript
export class CountdownToastExamples {
  private toast = inject(GxToastService);

  // 基本倒數通知
  showCountdownInfo() {
    this.toast.show({
      kind: 'info',
      title: '系統維護通知',
      message: '系統將在倒數時間結束後進行維護',
      duration: 10000,
      countdown: true  // 啟用倒數計時
    });
  }

  // 處理進度通知
  showProcessingWithCountdown() {
    this.toast.show({
      kind: 'warning',
      title: '正在處理',
      message: '請勿關閉瀏覽器',
      duration: 15000,
      countdown: true,
      dismissible: false  // 不允許手動關閉
    });
  }

  // 重要提醒倒數
  showImportantCountdown() {
    this.toast.show({
      kind: 'error',
      title: '重要提醒',
      message: '您的會話即將過期，請儲存您的工作',
      duration: 30000,
      countdown: true,
      action: {
        label: '延長會話',
        handler: () => this.extendSession()
      }
    });
  }

  // 臨時訊息倒數
  showTempMessage() {
    this.toast.show({
      kind: 'success',
      title: '複製成功',
      message: '連結已複製到剪貼簿',
      duration: 3000,
      countdown: true
    });
  }

  private extendSession() {
    // 延長會話邏輯
    console.log('會話已延長');
  }
}
```

### 倒數計時的顯示效果

當啟用 `countdown: true` 時，Toast 會在訊息後方顯示剩餘秒數：

```
✅ 操作成功
您的檔案已成功上傳 (5s)
```

倒數會每秒更新，直到歸零自動關閉。

### 帶有動作按鈕的通知

```typescript
showWithAction() {
  this.toast.show({
    kind: 'success',
    title: '檔案已刪除',
    message: '檔案已移至垃圾桶',
    duration: 8000,
    countdown: true,  // 顯示倒數，讓用戶知道復原時間
    action: {
      label: '復原',
      handler: () => {
        console.log('復原操作');
        this.restoreFile();
      }
    }
  });
}
```

## 最佳實踐

### 1. 適當的持續時間建議
```typescript
const DURATION_GUIDELINES = {
  success: 3000,      // 成功訊息：3 秒
  info: 4000,         // 一般資訊：4 秒  
  warning: 5000,      // 警告訊息：5 秒
  error: 6000,        // 錯誤訊息：6 秒（或不自動關閉）
  critical: 0,        // 重要訊息：不自動關閉
  processing: 15000,  // 🆕 處理中：15 秒（建議啟用倒數）
  session: 30000      // 🆕 會話提醒：30 秒（建議啟用倒數）
};
```

### 2. 倒數計時使用建議

**適合使用倒數的場景：**
- 重要操作的確認時間（如會話過期提醒）
- 處理進度通知（讓用戶知道還要等多久）
- 臨時性訊息（如複製成功提示）
- 系統維護通知

**不建議使用倒數的場景：**
- 簡短的成功訊息（3 秒以下）
- 純資訊性的通知
- 錯誤訊息（用戶可能需要仔細閱讀）

```typescript
// ✅ 適合使用倒數
this.toast.show({
  kind: 'warning',
  title: '會話即將過期',
  message: '請儲存您的工作',
  duration: 30000,
  countdown: true  // 讓用戶知道還有多少時間
});

// ❌ 不建議使用倒數
this.toast.show({
  kind: 'success',
  message: '已儲存',
  duration: 2000,
  countdown: true  // 太短的訊息不需要倒數
});
```

### 3. 避免濫用
- 不要為每個小操作都顯示通知
- 避免同時顯示過多通知
- 重要性高的訊息優先顯示
- 謹慎使用倒數功能，避免視覺干擾

### 4. 訊息內容指南
- 保持簡潔明瞭
- 使用用戶友好的語言
- 提供具體的操作結果
- 在必要時提供下一步操作指引

## 樣式自定義

### CSS 變數

Toast 組件提供以下 CSS 變數供自定義：

```css
:root {
  --gx-toast-width: 320px;
  --gx-toast-info: #447D9B;
  --gx-toast-success: #309898;
  --gx-toast-warning: #FF9F00;
  --gx-toast-error: #CB0404;
}
```

### 倒數計時樣式自定義

您可以透過 CSS 自定義倒數計時的顯示樣式：

```css
.gx-toast-countdown {
  opacity: 0.7;
  font-weight: normal;
  font-size: 0.9em;
}

/* 快到期時的視覺提示 */
.gx-toast-item[data-countdown-urgent="true"] .gx-toast-countdown {
  color: #ff4444;
  font-weight: bold;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
```

## 故障排除

### 常見問題

1. **Toast 不顯示**
   - 確認已在 app.config.ts 中添加 `provideToasts()`
   - 檢查是否有 CSS 樣式覆蓋問題

2. **倒數計時不顯示**
   - 確認 `countdown: true` 已設定
   - 確認 `duration` 大於 0
   - 檢查 template 是否有更新

3. **位置不正確**
   - 檢查 `attachTo` 配置
   - 確認父容器的 CSS position 設定

4. **樣式不生效**
   - 確認 CSS 變數的作用域
   - 檢查 z-index 設定

### 調試技巧

```typescript
// 開啟調試模式
this.toast.show({
  kind: 'info',
  title: 'Debug',
  message: `當前 toast 數量: ${this.toast.toasts().length}`,
  duration: 5000,
  countdown: true
});
```

## 版本更新記錄

- **v1.0.0**: 初始版本，基本功能實現
- **v1.1.0**: 新增動作按鈕支援
- **v1.2.0**: 新增自定義圖示功能
- **v1.3.0**: 改善無障礙支援
- **v1.4.0**: 🆕 新增倒數計時功能

---

如有任何問題或建議，請聯繫開發團隊。

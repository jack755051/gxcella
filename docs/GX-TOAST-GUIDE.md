# GX Toast 組件使用指南

## 概述

GX Toast 是一個靈活且功能豐富的通知組件，支援多種類型的訊息顯示、自定義樣式和互動功能。

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

// 自定義配置範例
provideToasts({
  defaultDuration: 5000, // 全域覆寫自動關閉時間
  width: '700px',        // 自定義寬度
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

### 帶有動作按鈕的通知

```typescript
showWithAction() {
  this.toast.show({
    kind: 'success',
    title: '檔案已刪除',
    message: '檔案已移至垃圾桶',
    action: {
      label: '復原',
      handler: () => {
        console.log('復原操作');
        // 執行復原邏輯
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
  critical: 0         // 重要訊息：不自動關閉
};
```

### 2. 避免濫用
- 不要為每個小操作都顯示通知
- 避免同時顯示過多通知
- 重要性高的訊息優先顯示

### 3. 訊息內容指南
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

## 故障排除

### 常見問題

1. **Toast 不顯示**
   - 確認已在 app.config.ts 中添加 `provideToasts()`
   - 檢查是否有 CSS 樣式覆蓋問題

2. **位置不正確**
   - 檢查 `attachTo` 配置
   - 確認父容器的 CSS position 設定

3. **樣式不生效**
   - 確認 CSS 變數的作用域
   - 檢查 z-index 設定

---

如有任何問題或建議，請聯繫開發團隊。

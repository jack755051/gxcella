# GX-UI

一個功能完整的 Angular UI 組件庫,提供按鈕、Toast 通知、標籤、載入動畫、圖標等常用組件。採用 Angular Standalone Components 架構實現,內建 Signal 狀態管理,適合用於各種現代化 Angular 應用程式。

## ✅ 已完成的組件

### 核心組件
- ✅ `GxButton` - 按鈕組件(支援多種樣式、變體、動作模式)
- ✅ `GxToast` - Toast 通知組件(支援自動關閉、倒數計時、動作按鈕)
- ✅ `GxToastService` - Toast 服務(統一管理通知狀態)
- ✅ `GxTag` - 標籤組件(支援可移除標籤、不同樣式)
- ✅ `GxOverlay` - 遮罩層組件(支援鍵盤事件、背景點擊)
- ✅ `GxLoading` - 載入組件(整合 Spinner 和 Bar 兩種樣式)
- ✅ `GxLoadingSpinner` - 旋轉載入動畫
- ✅ `GxLoadingBar` - 條狀載入動畫
- ✅ `GxIcon` - 圖標組件(支援 Lucide Icons 和內建圖標)

### 類型定義
- ✅ `GxButtonIntent` - 按鈕意圖類型(info, success, warning, error)
- ✅ `GxButtonVariant` - 按鈕變體類型(filled, outline, soft, ghost, tag)
- ✅ `GxButtonStyle` - 按鈕樣式配置
- ✅ `GxAction` - 按鈕動作介面
- ✅ `GxToast` - Toast 通知介面
- ✅ `GxToastCategory` - Toast 分類類型
- ✅ `GxLoadingType` - 載入類型(bar, spinner)
- ✅ `GxLoadingSize` - 載入大小(xs, sm, md, lg, xl)
- ✅ `GxLoadingSpeed` - 載入速度(slow, normal, fast)

## 📦 安裝

```bash
npm install @sanring/gx-ui
```

### 可選依賴

如果你想使用 Lucide 圖標:

```bash
npm install lucide-angular
```

> **注意**: `lucide-angular` 是**可選的**。你可以使用內建圖標而無需安裝它。

## 🎯 使用方式

### GxButton - 按鈕組件

#### 基本範例

```typescript
import { Component } from '@angular/core';
import { GxButton } from '@sanring/gx-ui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [GxButton],
  template: `
    <gx-button
      [intent]="'info'"
      [variant]="'filled'"
      (pressed)="onButtonClick($event)">
      點擊我
    </gx-button>
  `
})
export class ExampleComponent {
  onButtonClick(event: MouseEvent) {
    console.log('按鈕被點擊了!', event);
  }
}
```

#### 使用 Action 模式

```typescript
import { Component } from '@angular/core';
import { GxButton, GxAction } from '@sanring/gx-ui';

@Component({
  selector: 'app-action-example',
  standalone: true,
  imports: [GxButton],
  template: `
    <gx-button [action]="saveAction">
      {{ saveAction.label }}
    </gx-button>
  `
})
export class ActionExampleComponent {
  saveAction: GxAction = {
    label: '儲存',
    handler: () => this.save(),
    disabled: false
  };

  save() {
    console.log('儲存資料...');
  }
}
```

#### 不同樣式和變體

```typescript
@Component({
  template: `
    <!-- 不同意圖 -->
    <gx-button [intent]="'info'">資訊</gx-button>
    <gx-button [intent]="'success'">成功</gx-button>
    <gx-button [intent]="'warning'">警告</gx-button>
    <gx-button [intent]="'error'">錯誤</gx-button>

    <!-- 不同變體 -->
    <gx-button [variant]="'filled'">填滿</gx-button>
    <gx-button [variant]="'outline'">外框</gx-button>
    <gx-button [variant]="'soft'">柔和</gx-button>
    <gx-button [variant]="'ghost'">幽靈</gx-button>

    <!-- 自定義樣式 -->
    <gx-button
      [styleTokens]="{ px: 16, py: 10, radius: 12 }"
      [tooltip]="'這是提示文字'">
      自定義樣式
    </gx-button>

    <!-- 禁用狀態 -->
    <gx-button [disabled]="true">禁用按鈕</gx-button>
  `
})
```

### GxToast - Toast 通知組件

#### 設置 Toast 提供者

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideToasts } from '@sanring/gx-ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideToasts({
      max: 5,                    // 最多顯示 5 個 toast
      defaultDuration: 3000,     // 預設 3 秒自動關閉
      width: '360px'             // Toast 寬度
    })
  ]
};
```

#### 在 App 中添加 Toast Host

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { GxToastHost } from '@sanring/gx-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GxToastHost],
  template: `
    <router-outlet></router-outlet>
    <gx-toast-host></gx-toast-host>  <!-- Toast 容器 -->
  `
})
export class AppComponent {}
```

#### 使用 Toast Service

```typescript
import { Component, inject } from '@angular/core';
import { GxToastService } from '@sanring/gx-ui';
import { GxButton } from '@sanring/gx-ui';

@Component({
  selector: 'app-toast-example',
  standalone: true,
  imports: [GxButton],
  template: `
    <gx-button (pressed)="showSuccess()">顯示成功訊息</gx-button>
    <gx-button (pressed)="showError()">顯示錯誤訊息</gx-button>
    <gx-button (pressed)="showWithAction()">顯示帶動作的 Toast</gx-button>
    <gx-button (pressed)="showWithCountdown()">顯示倒數計時 Toast</gx-button>
  `
})
export class ToastExampleComponent {
  private toastService = inject(GxToastService);

  showSuccess() {
    this.toastService.show({
      kind: 'success',
      title: '成功',
      message: '操作已成功完成!',
      duration: 3000
    });
  }

  showError() {
    this.toastService.show({
      kind: 'error',
      title: '錯誤',
      message: '發生錯誤,請稍後再試。',
      duration: 5000
    });
  }

  showWithAction() {
    this.toastService.show({
      kind: 'info',
      title: '通知',
      message: '您有新的訊息',
      action: {
        label: '查看',
        handler: () => console.log('查看訊息')
      },
      duration: 0  // 不自動關閉
    });
  }

  showWithCountdown() {
    this.toastService.show({
      kind: 'warning',
      title: '警告',
      message: '此操作將在倒數結束後執行',
      countdown: true,  // 顯示倒數計時
      duration: 10000   // 10 秒
    });
  }
}
```

### GxTag - 標籤組件

```typescript
import { Component } from '@angular/core';
import { GxTag } from '@sanring/gx-ui';

@Component({
  selector: 'app-tag-example',
  standalone: true,
  imports: [GxTag],
  template: `
    <!-- 基本標籤 -->
    <gx-tag [intent]="'info'">資訊標籤</gx-tag>
    <gx-tag [intent]="'success'">成功標籤</gx-tag>
    <gx-tag [intent]="'warning'">警告標籤</gx-tag>
    <gx-tag [intent]="'error'">錯誤標籤</gx-tag>

    <!-- 可移除標籤 -->
    <gx-tag
      [intent]="'info'"
      [removable]="true"
      (remove)="onRemove()">
      可移除標籤
    </gx-tag>

    <!-- 可點擊標籤 -->
    <gx-tag
      [intent]="'success'"
      (onClick)="onTagClick($event)">
      可點擊標籤
    </gx-tag>

    <!-- 禁用標籤 -->
    <gx-tag [disabled]="true">禁用標籤</gx-tag>
  `
})
export class TagExampleComponent {
  onRemove() {
    console.log('標籤被移除');
  }

  onTagClick(event: MouseEvent) {
    console.log('標籤被點擊', event);
  }
}
```

### GxLoading - 載入組件

```typescript
import { Component } from '@angular/core';
import { GxLoading } from '@sanring/gx-ui';

@Component({
  selector: 'app-loading-example',
  standalone: true,
  imports: [GxLoading],
  template: `
    <!-- Bar 樣式載入 -->
    <gx-loading
      [type]="'bar'"
      [size]="'md'"
      [speed]="'normal'">
    </gx-loading>

    <!-- Spinner 樣式載入 -->
    <gx-loading
      [type]="'spinner'"
      [size]="'lg'"
      [color]="'#3b82f6'">
    </gx-loading>

    <!-- 不同大小 -->
    <gx-loading [type]="'bar'" [size]="'xs'"></gx-loading>
    <gx-loading [type]="'bar'" [size]="'sm'"></gx-loading>
    <gx-loading [type]="'bar'" [size]="'md'"></gx-loading>
    <gx-loading [type]="'bar'" [size]="'lg'"></gx-loading>
    <gx-loading [type]="'bar'" [size]="'xl'"></gx-loading>

    <!-- Spinner 漸層色 -->
    <gx-loading
      [type]="'spinner'"
      [colors]="['#3b82f6', '#8b5cf6', '#ec4899']"
      [strokeWidth]="6">
    </gx-loading>

    <!-- 自定義 Bar 數量 -->
    <gx-loading
      [type]="'bar'"
      [barsAmount]="8">
    </gx-loading>
  `
})
export class LoadingExampleComponent {}
```

### GxOverlay - 遮罩層組件

```typescript
import { Component, signal } from '@angular/core';
import { GxOverlay } from '@sanring/gx-ui';
import { GxButton } from '@sanring/gx-ui';

@Component({
  selector: 'app-overlay-example',
  standalone: true,
  imports: [GxOverlay, GxButton],
  template: `
    <gx-button (pressed)="showOverlay.set(true)">顯示遮罩層</gx-button>

    @if (showOverlay()) {
      <gx-overlay
        [closeOnEsc]="true"
        (backdropClick)="showOverlay.set(false)">
        <div class="modal-content">
          <h2>對話框內容</h2>
          <p>這是一個使用 Overlay 的對話框範例</p>
          <gx-button (pressed)="showOverlay.set(false)">關閉</gx-button>
        </div>
      </gx-overlay>
    }
  `,
  styles: [`
    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 0.5rem;
      max-width: 400px;
    }
  `]
})
export class OverlayExampleComponent {
  showOverlay = signal(false);
}
```

### GxIcon - 圖標組件

```typescript
import { Component } from '@angular/core';
import { GxIcon } from '@sanring/gx-ui';

@Component({
  selector: 'app-icon-example',
  standalone: true,
  imports: [GxIcon],
  template: `
    <!-- 使用內建圖標(無需 lucide-angular) -->
    <gx-icon [name]="'x'" [size]="24"></gx-icon>
    <gx-icon [name]="'plus'" [size]="24"></gx-icon>
    <gx-icon [name]="'minus'" [size]="24"></gx-icon>
    <gx-icon [name]="'chevron-left'" [size]="24"></gx-icon>
    <gx-icon [name]="'chevron-right'" [size]="24"></gx-icon>

    <!-- 使用 Lucide 圖標(需要安裝 lucide-angular) -->
    <gx-icon [name]="'home'" [size]="24"></gx-icon>
    <gx-icon [name]="'settings'" [size]="24"></gx-icon>

    <!-- 自定義樣式 -->
    <gx-icon
      [name]="'x'"
      [size]="32"
      [strokeWidth]="3"
      [color]="'#ef4444'">
    </gx-icon>

    <!-- 帶無障礙標籤 -->
    <gx-icon
      [name]="'home'"
      [ariaLabel]="'首頁'"
      [size]="'1.5rem'">
    </gx-icon>
  `
})
export class IconExampleComponent {}
```

## 📖 API 文檔

### GxButton

#### Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `action` | `GxAction \| undefined` | `undefined` | 行為導向模式(包含 label 和 handler) |
| `intent` | `GxButtonIntent` | `'info'` | 按鈕意圖(info, success, warning, error) |
| `variant` | `GxButtonVariant` | `'filled'` | 按鈕變體(filled, outline, soft, ghost, tag) |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `styleTokens` | `GxButtonStyle` | `{px:12, py:8, radius:8}` | 自定義樣式配置 |
| `tooltip` | `string \| undefined` | `undefined` | 滑鼠 hover 顯示的提示文字 |
| `needsAriaLabel` | `boolean` | `false` | 若內容沒有可見文字時設為 true |

#### Outputs

| 事件 | 類型 | 說明 |
|------|------|------|
| `pressed` | `EventEmitter<MouseEvent>` | 按鈕點擊事件 |

#### GxAction 介面

```typescript
interface GxAction {
  label?: string;           // 按鈕標籤
  handler?: () => void;     // 點擊處理函數
  disabled?: boolean;       // 是否禁用
}
```

#### GxButtonStyle 介面

```typescript
interface GxButtonStyle {
  px?: number;           // 水平 padding
  py?: number;           // 垂直 padding
  radius?: number;       // 邊框圓角
  background?: string;   // 背景色
  foreground?: string;   // 前景色
}
```

### GxToastService

#### 方法

```typescript
// 顯示 Toast
show(partial: Omit<GxToast, 'id'>): number

// 關閉指定 Toast
dismiss(id: number): void

// 清除所有 Toast
clear(): void
```

#### GxToast 介面

```typescript
interface GxToast {
  id: number;                   // Toast ID(自動生成)
  kind: GxToastCategory;        // 類型(info, success, warning, error)
  message: string;              // 訊息內容
  title?: string;               // 標題
  icon?: string;                // 自定義圖標
  duration?: number;            // 持續時間(毫秒),0 表示不自動關閉
  dismissible?: boolean;        // 是否可手動關閉
  countdown?: boolean;          // 是否顯示倒數計時
  action?: {                    // 動作按鈕
    label: string;
    handler: () => void;
  };
}
```

### GxTag

#### Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `intent` | `GxButtonIntent` | `'info'` | 標籤樣式意圖 |
| `removable` | `boolean` | `false` | 是否可移除 |
| `disabled` | `boolean` | `false` | 是否禁用 |

#### Outputs

| 事件 | 類型 | 說明 |
|------|------|------|
| `onClick` | `EventEmitter<MouseEvent>` | 標籤點擊事件 |
| `remove` | `EventEmitter<void>` | 移除按鈕點擊事件 |

### GxOverlay

#### Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `closeOnEsc` | `boolean` | `true` | 是否按 ESC 鍵關閉 |
| `backdropClickFn` | `() => void` | `() => {}` | 背景點擊回調函數 |

#### Outputs

| 事件 | 類型 | 說明 |
|------|------|------|
| `backdropClick` | `EventEmitter<void>` | 背景點擊事件 |

### GxLoading

#### Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `type` | `GxLoadingType` | `'bar'` | 載入類型(bar, spinner) |
| `size` | `GxLoadingSize` | `'md'` | 大小(xs, sm, md, lg, xl) |
| `speed` | `GxLoadingSpeed` | `'normal'` | 速度(slow, normal, fast) |
| `color` | `string \| undefined` | `undefined` | 自定義顏色 |
| `colors` | `string[] \| undefined` | `undefined` | 漸層色陣列(僅 spinner) |
| `strokeWidth` | `number` | `4` | 線條寬度(1-8,僅 spinner) |
| `barsAmount` | `number` | `5` | Bar 數量(3-12,僅 bar) |

### GxLoadingSpinner

#### Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `color` | `string \| undefined` | `undefined` | 單色設定 |
| `colors` | `string[] \| undefined` | `undefined` | 漸層色陣列 |
| `strokeWidth` | `number` | `4` | 線條寬度(1-8) |

### GxLoadingBar

#### Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `color` | `string \| undefined` | `undefined` | 自定義顏色 |
| `barsAmount` | `number` | `5` | Bar 數量(3-12) |

### GxIcon

#### Inputs

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `name` | `string` | **必填** | 圖標名稱 |
| `ariaLabel` | `string \| null` | `null` | 無障礙標籤 |
| `size` | `string \| number` | `16` | 大小 |
| `unit` | `string` | `'px'` | 單位 |
| `strokeWidth` | `number` | `2` | 線條寬度 |
| `color` | `string \| null` | `null` | 顏色 |

#### 內建圖標

- `x` - 關閉圖標
- `plus` - 加號
- `minus` - 減號
- `chevron-left` - 左箭頭
- `chevron-right` - 右箭頭

## 🎨 樣式自定義

### GxButton 樣式變數

```css
:root {
  /* 按鈕顏色 */
  --gx-button-info-bg: #3b82f6;
  --gx-button-success-bg: #10b981;
  --gx-button-warning-bg: #f59e0b;
  --gx-button-error-bg: #ef4444;

  /* 按鈕文字 */
  --gx-button-text-color: #ffffff;

  /* 按鈕邊框 */
  --gx-button-border-width: 1px;

  /* 按鈕陰影 */
  --gx-button-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);

  /* Hover 效果 */
  --gx-button-hover-brightness: 1.1;
}
```

### GxToast 樣式變數

```css
:root {
  /* Toast 容器 */
  --gx-toast-width: 320px;
  --gx-toast-max-height: 500px;
  --gx-toast-padding: 1rem;

  /* Toast 項目 */
  --gx-toast-item-bg: #ffffff;
  --gx-toast-item-border-radius: 0.5rem;
  --gx-toast-item-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  /* Toast 顏色 */
  --gx-toast-info-color: #3b82f6;
  --gx-toast-success-color: #10b981;
  --gx-toast-warning-color: #f59e0b;
  --gx-toast-error-color: #ef4444;
}
```

### GxLoading 樣式變數

```css
:root {
  /* 載入顏色 */
  --gx-bar-bc: #3b82f6;
  --gx-spinner-color: #3b82f6;

  /* 大小(由組件自動設定) */
  --gx-base-height: 40px;
  --gx-bar-gap: 4px;
  --gx-radius: 4px;
  --gx-spinner-size: 40px;

  /* 動畫速度(由組件自動設定) */
  --gx-bar-duration: 1.2s;
}
```

## 🔄 技術實現

本組件庫採用 Angular 18+ 的 Standalone Components 架構,提供現代化且高效能的 UI 解決方案。

### 組件架構

| 組件名稱 | 功能說明 |
|---------|---------|
| `GxButton` | 按鈕組件,支援多種樣式變體與行為模式 |
| `GxToastHost` | Toast 容器組件,管理 Toast 顯示 |
| `GxToastService` | Toast 服務,統一管理通知狀態與生命週期 |
| `GxTag` | 標籤組件,支援可移除與點擊互動 |
| `GxOverlay` | 遮罩層組件,提供模態對話框背景 |
| `GxLoading` | 載入組件,整合 Spinner 和 Bar 兩種樣式 |
| `GxLoadingSpinner` | 旋轉載入動畫組件 |
| `GxLoadingBar` | 條狀載入動畫組件 |
| `GxIcon` | 圖標組件,支援 Lucide Icons 與內建圖標 |

### 核心特點
- **響應式狀態管理**: 完全使用 Angular Signals,提供高效能的資料響應
- **靈活的樣式系統**: 支援 CSS 變數與 Input 屬性兩種客製化方式
- **完整的 TypeScript 類型**: 提供完整的類型定義,提升開發體驗
- **無障礙支援**: 遵循 ARIA 標準,提供良好的可訪問性
- **模組化設計**: 每個組件獨立,可按需引入
- **現代化動畫**: 使用 CSS 動畫與過渡效果,流暢自然

### 使用場景
- 應用程式按鈕與互動元素
- Toast 通知與訊息提示
- 標籤管理與篩選
- 載入狀態指示
- 對話框與彈出層
- 圖標顯示

## 🛠️ 開發

```bash
# 安裝依賴
cd packages/gx-ui
npm install

# 構建
npm run build

# 查看生成的文件
ls -la ../../dist/gx-ui
```

## 🤝 貢獻

歡迎提交 Issue 與 Pull Request 來改進組件功能!

## 📄 授權

MIT

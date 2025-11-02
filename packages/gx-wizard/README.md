# GX-Wizard

基於 TPI ICR-frontend Wizard 組件的 Angular 版本實現。

## ✅ 已完成的組件

### 核心組件
- ✅ `GxWizardContainer` - 步驟器容器（支援步驟指示器、導航、狀態管理）
- ✅ `GxWizardStep` - 單一步驟容器
- ✅ `GxWizardHeader` - 步驟標頭（支援標題、描述、圖標）
- ✅ `GxWizardContent` - 步驟內容區域
- ✅ `GxWizardActions` - 步驟動作按鈕（上一步、下一步、完成）

### 類型定義
- ✅ `WizardStepConfig` - 步驟配置介面
- ✅ `WizardCustomClass` - 自定義樣式介面
- ✅ `StepChangeEvent` - 步驟變更事件
- ✅ `NextStepEvent` / `PrevStepEvent` / `FinishEvent` - 各種事件介面

## 📦 安裝

```bash
npm install @sanring/gx-wizard
```

## 🎯 使用方式

### 基本範例

```typescript
import { Component } from '@angular/core';
import {
  GxWizardContainer,
  WizardStepConfig
} from '@sanring/gx-wizard';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [GxWizardContainer],
  template: `
    <gx-wizard-container
      [wizardId]="'registration-wizard'"
      [steps]="steps"
      [showStepsIndicator]="true"
      (finish)="onFinish($event)">

      <!-- 自定義步驟內容 -->
      <div step-content>
        @switch (wizardContainer.currentStep()) {
          @case (1) {
            <h3>步驟 1：基本資料</h3>
            <p>請輸入您的基本資料...</p>
          }
          @case (2) {
            <h3>步驟 2：聯絡方式</h3>
            <p>請輸入您的聯絡方式...</p>
          }
          @case (3) {
            <h3>步驟 3：確認資料</h3>
            <p>請確認您的資料...</p>
          }
        }
      </div>
    </gx-wizard-container>
  `
})
export class ExampleComponent {
  steps: WizardStepConfig[] = [
    { id: 'basic', title: '基本資料', description: '填寫基本資訊' },
    { id: 'contact', title: '聯絡方式', description: '填寫聯絡資訊' },
    { id: 'confirm', title: '確認資料', description: '檢查並確認' }
  ];

  onFinish(event: { wizardId: string }) {
    console.log('Wizard 完成:', event.wizardId);
  }
}
```

### 完整範例（含步驟監聽）

```typescript
import { Component, signal } from '@angular/core';
import {
  GxWizardContainer,
  WizardStepConfig,
  StepChangeEvent
} from '@sanring/gx-wizard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [CommonModule, GxWizardContainer],
  template: `
    <gx-wizard-container
      [wizardId]="'user-registration'"
      [steps]="steps"
      [initialStep]="1"
      [showStepsIndicator]="true"
      [allowStepJump]="false"
      (stepChange)="onStepChange($event)"
      (next)="onNext($event)"
      (prev)="onPrev($event)"
      (finish)="onFinish($event)">
    </gx-wizard-container>
  `
})
export class MultiStepFormComponent {
  steps: WizardStepConfig[] = [
    {
      id: 'personal',
      title: '個人資料',
      description: '請提供您的個人資訊',
    },
    {
      id: 'account',
      title: '帳號設定',
      description: '設定您的帳號資訊',
    },
    {
      id: 'preferences',
      title: '偏好設定',
      description: '自訂您的偏好',
    },
    {
      id: 'review',
      title: '檢視確認',
      description: '檢查所有資訊',
    }
  ];

  onStepChange(event: StepChangeEvent) {
    console.log(`步驟變更：從 ${event.from} 到 ${event.to}`);
  }

  onNext(event: { step: number }) {
    console.log('下一步:', event.step);
  }

  onPrev(event: { step: number }) {
    console.log('上一步:', event.step);
  }

  onFinish(event: { wizardId: string }) {
    console.log('完成 Wizard:', event.wizardId);
    // 提交表單或導航到其他頁面
  }
}
```

### 自定義樣式

```typescript
@Component({
  template: `
    <gx-wizard-container
      [wizardId]="'custom-wizard'"
      [steps]="steps"
      [customClass]="{
        container: 'my-wizard-container',
        indicator: 'my-indicator',
        header: 'my-header',
        body: 'my-body',
        actions: 'my-actions',
        prevButton: 'my-prev-btn',
        nextButton: 'my-next-btn',
        finishButton: 'my-finish-btn'
      }">
    </gx-wizard-container>
  `,
  styles: [`
    .my-wizard-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .my-next-btn {
      background: #10b981;
      color: white;
    }
  `]
})
export class CustomStyledWizardComponent {
  // ...
}
```

## 📖 API 文檔

### GxWizardContainer

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `wizardId` | `string` | **必填** | Wizard 唯一識別 |
| `steps` | `WizardStepConfig[]` | `[]` | 步驟配置陣列 |
| `initialStep` | `number` | `1` | 初始步驟 |
| `showStepsIndicator` | `boolean` | `true` | 是否顯示步驟指示器 |
| `allowStepJump` | `boolean` | `false` | 是否允許跳轉步驟 |
| `customClass` | `WizardCustomClass` | `{}` | 自定義樣式 |

**事件：**
- `stepChange: EventEmitter<StepChangeEvent>` - 步驟變更事件
- `next: EventEmitter<NextStepEvent>` - 下一步事件
- `prev: EventEmitter<PrevStepEvent>` - 上一步事件
- `finish: EventEmitter<FinishEvent>` - 完成事件

**插槽：**
- `[indicator]` - 自定義步驟指示器
- `[step-content]` - 自定義步驟內容

### GxWizardStep

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `wizardId` | `string` | **必填** | Wizard ID |
| `step` | `number` | **必填** | 當前步驟序號 |
| `totalSteps` | `number` | `0` | 總步驟數 |
| `title` | `string` | `undefined` | 步驟標題 |
| `description` | `string` | `undefined` | 步驟描述 |
| `active` | `boolean` | `false` | 是否為目前啟用的步驟 |
| `customClass` | `WizardCustomClass` | `{}` | 自定義樣式 |

**事件：**
- `next: EventEmitter<{wizardId: string, step: number}>` - 下一步事件
- `prev: EventEmitter<{wizardId: string, step: number}>` - 上一步事件
- `finish: EventEmitter<{wizardId: string}>` - 完成事件

**插槽：**
- `[header]` - 自定義標頭
- `[content]` - 自定義內容
- `[actions]` - 自定義動作按鈕

### GxWizardHeader

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `wizardId` | `string` | **必填** | Wizard ID |
| `step` | `number` | **必填** | 當前步驟序號 |
| `totalSteps` | `number` | `0` | 總步驟數 |
| `title` | `string` | `undefined` | 標題 |
| `description` | `string` | `undefined` | 描述文字 |
| `showIcon` | `boolean` | `false` | 是否顯示圖標 |
| `showStepIndicator` | `boolean` | `true` | 是否顯示步驟指示器 |

**插槽：**
- `[icon]` - 自定義圖標
- `[title]` - 自定義標題
- `[description]` - 自定義描述
- `[indicator]` - 自定義步驟指示器

### GxWizardActions

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `wizardId` | `string` | **必填** | Wizard ID |
| `step` | `number` | **必填** | 當前步驟序號 |
| `totalSteps` | `number` | `0` | 總步驟數 |
| `showPrev` | `boolean` | `true` | 是否顯示上一步按鈕 |
| `showNext` | `boolean` | `true` | 是否顯示下一步按鈕 |
| `showFinish` | `boolean` | `false` | 是否顯示完成按鈕 |
| `prevLabel` | `string` | `'上一步'` | 上一步按鈕文字 |
| `nextLabel` | `string` | `'下一步'` | 下一步按鈕文字 |
| `finishLabel` | `string` | `'完成'` | 完成按鈕文字 |

**事件：**
- `next: EventEmitter<void>` - 下一步事件
- `prev: EventEmitter<void>` - 上一步事件
- `finish: EventEmitter<void>` - 完成事件

**插槽：**
- `[prev-button]` - 自定義上一步按鈕內容
- `[next-button]` - 自定義下一步按鈕內容
- `[finish-button]` - 自定義完成按鈕內容

### WizardStepConfig 介面

```typescript
interface WizardStepConfig {
  id: string;              // 步驟唯一識別
  title: string;           // 步驟標題
  description?: string;    // 步驟描述
  disabled?: boolean;      // 是否禁用
  [key: string]: any;      // 其他自定義屬性
}
```

### WizardCustomClass 介面

```typescript
interface WizardCustomClass {
  container?: string;        // 容器樣式
  indicator?: string;        // 指示器樣式
  content?: string;          // 內容區樣式
  header?: string;           // 標頭樣式
  body?: string;             // 主體樣式
  actions?: string;          // 動作區樣式
  actionContainer?: string;  // 動作容器樣式
  prevButton?: string;       // 上一步按鈕樣式
  nextButton?: string;       // 下一步按鈕樣式
  finishButton?: string;     // 完成按鈕樣式
}
```

## 🎨 樣式自定義

使用 CSS 變數進行自定義：

```css
:root {
  /* 主要顏色 */
  --gx-wizard-primary-color: #3b82f6;
  --gx-wizard-primary-hover-color: #2563eb;

  /* 容器 */
  --gx-wizard-bg: #ffffff;
  --gx-wizard-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --gx-wizard-border-color: #e5e7eb;

  /* 文字顏色 */
  --gx-wizard-title-color: #111827;
  --gx-wizard-description-color: #6b7280;
  --gx-wizard-counter-color: #6b7280;

  /* 次要按鈕 */
  --gx-wizard-secondary-text-color: #374151;
  --gx-wizard-secondary-hover-bg: #f3f4f6;

  /* 指示器顏色 */
  --gx-wizard-gray-300: #d1d5db;
  --gx-wizard-gray-400: #9ca3af;
}
```

## 🔄 與 TPI 項目的對應關係

| TPI (Vue) | gx-wizard (Angular) | 狀態 |
|-----------|-------------------|------|
| `WizardContainer.vue` | `GxWizardContainer` | ✅ 完成 |
| `WizardStep.vue` | `GxWizardStep` | ✅ 完成 |
| `WizardHeader.vue` | `GxWizardHeader` | ✅ 完成 |
| `WizardContent.vue` | `GxWizardContent` | ✅ 完成 |
| `WizardActions.vue` | `GxWizardActions` | ✅ 完成 |

## 📚 參考資料

- TPI 項目：`/Users/charlie010583/Desktop/TPI/ICR-frontend/components/wizard`
- gx-table 實現：`/Users/charlie010583/Desktop/01_private/gxcella/packages/gx-table`

## 🛠️ 開發

```bash
# 構建
npm run build

# 查看生成的文件
ls -la dist/gx-wizard
```

## 🤝 貢獻

歡迎提交 PR 或 Issue！

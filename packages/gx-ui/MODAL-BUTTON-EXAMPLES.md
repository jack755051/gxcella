# Modal 按鈕整合完整指南

本文件詳細說明 Modal 組件如何整合 `gx-button`，以及所有可用的按鈕功能。

## 🎯 核心概念

### 1. Modal 的開關控制

Modal 的開關已經完整定義：

```typescript
// ✅ 已定義的 Input
visible: boolean         // 控制 Modal 顯示/隱藏

// ✅ 已定義的 Output
closed: void            // Modal 關閉時觸發
visibleChange: boolean  // visible 狀態改變時觸發（支援雙向綁定）
```

**使用方式：**

```typescript
import { Component, signal } from '@angular/core';
import { GxModal } from '@sanring/gx-ui';

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [GxModal],
    template: `
        <!-- 開啟按鈕 -->
        <button (click)="openModal()">開啟 Modal</button>

        <!-- Modal -->
        <gx-modal
            [visible]="isModalOpen()"
            [title]="'我的 Modal'"
            (closed)="onModalClosed()"
            (visibleChange)="isModalOpen.set($event)">
            <p>Modal 內容</p>
        </gx-modal>
    `
})
export class ExampleComponent {
    isModalOpen = signal(false);

    openModal() {
        this.isModalOpen.set(true);
    }

    onModalClosed() {
        console.log('Modal 已關閉');
        // 可以在這裡執行額外的清理工作
    }
}
```

---

## 🔘 按鈕整合方式

Modal 提供 **三種** 方式來整合按鈕：

### 方式 1: 使用 `buttons` 屬性（推薦）

這是最簡單且功能完整的方式，**直接串接 gx-button 的所有功能**。

```typescript
import { Component, signal } from '@angular/core';
import { GxModal, GxModalButton } from '@sanring/gx-ui';

@Component({
    selector: 'app-example',
    template: `
        <gx-modal
            [visible]="showModal()"
            [title]="'確認操作'"
            [buttons]="modalButtons()"
            (buttonPressed)="onButtonPressed($event)"
            (visibleChange)="showModal.set($event)">
            <p>是否確認此操作？</p>
        </gx-modal>
    `
})
export class ExampleComponent {
    showModal = signal(false);

    modalButtons = signal<GxModalButton[]>([
        {
            action: {
                label: '取消',
                handler: () => this.handleCancel()
            },
            variant: 'outline',      // gx-button 的 variant
            intent: 'info',          // gx-button 的 intent
            tooltip: '取消此操作'     // gx-button 的 tooltip
        },
        {
            action: {
                label: '確認',
                handler: () => this.handleConfirm(),
                disabled: false      // 控制按鈕 disabled 狀態
            },
            variant: 'filled',
            intent: 'success'
        }
    ]);

    handleCancel() {
        console.log('取消');
        this.showModal.set(false);
    }

    handleConfirm() {
        console.log('確認');
        this.showModal.set(false);
    }

    onButtonPressed(event: { button: GxModalButton; event: MouseEvent }) {
        console.log('按鈕被點擊:', event.button.action.label);
        console.log('原生事件:', event.event);
    }
}
```

### 方式 2: 使用自訂 Footer Slot

如果需要完全自訂按鈕佈局，可以使用 footer slot 直接使用 `gx-button`：

```typescript
import { Component, signal } from '@angular/core';
import { GxModal, GxButton } from '@sanring/gx-ui';

@Component({
    selector: 'app-example',
    imports: [GxModal, GxButton],
    template: `
        <gx-modal
            [visible]="showModal()"
            [title]="'自訂按鈕'"
            (visibleChange)="showModal.set($event)">

            <p>Modal 內容</p>

            <!-- 自訂 footer -->
            <div footer class="custom-footer">
                <gx-button
                    [action]="{ label: '左側按鈕', handler: leftAction }"
                    [variant]="'ghost'"
                    [intent]="'info'"
                    (pressed)="onLeftButtonClick($event)">
                </gx-button>

                <div class="right-buttons">
                    <gx-button
                        [action]="cancelAction()"
                        [variant]="'outline'"
                        (pressed)="onCancelClick($event)">
                    </gx-button>
                    <gx-button
                        [action]="confirmAction()"
                        [variant]="'filled'"
                        [intent]="'success'"
                        [disabled]="isProcessing()"
                        (pressed)="onConfirmClick($event)">
                    </gx-button>
                </div>
            </div>
        </gx-modal>
    `,
    styles: [`
        .custom-footer {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
        .right-buttons {
            display: flex;
            gap: 12px;
        }
    `]
})
export class ExampleComponent {
    showModal = signal(false);
    isProcessing = signal(false);

    leftAction = () => console.log('左側按鈕');

    cancelAction = () => ({
        label: '取消',
        handler: () => this.showModal.set(false)
    });

    confirmAction = () => ({
        label: this.isProcessing() ? '處理中...' : '確認',
        handler: () => this.processConfirm()
    });

    processConfirm() {
        this.isProcessing.set(true);
        setTimeout(() => {
            this.isProcessing.set(false);
            this.showModal.set(false);
        }, 2000);
    }

    onLeftButtonClick(event: MouseEvent) {
        console.log('左側按鈕點擊事件:', event);
    }

    onCancelClick(event: MouseEvent) {
        console.log('取消按鈕點擊');
    }

    onConfirmClick(event: MouseEvent) {
        console.log('確認按鈕點擊');
    }
}
```

### 方式 3: 混合使用

也可以同時使用 `buttons` 和 footer slot：

```typescript
<gx-modal
    [visible]="showModal()"
    [title]="'混合按鈕'"
    [buttons]="defaultButtons()"     <!-- 預設按鈕 -->
    (visibleChange)="showModal.set($event)">

    <p>內容</p>

    <!-- 額外的自訂按鈕 -->
    <div footer>
        <gx-button [action]="extraAction()"></gx-button>
    </div>
</gx-modal>
```

---

## 📋 GxModalButton 完整屬性

`GxModalButton` 介面完全對應 `gx-button` 的所有功能：

```typescript
interface GxModalButton {
    // ✅ 必填：按鈕行為
    action: {
        label: string;           // 按鈕文字
        handler?: () => void;    // 點擊處理函數
        disabled?: boolean;      // 是否禁用
    };

    // ✅ 選填：外觀樣式
    intent?: 'info' | 'success' | 'warning' | 'error';
    variant?: 'filled' | 'outline' | 'soft' | 'ghost' | 'tag';

    // ✅ 選填：進階功能
    styleTokens?: {
        px?: number;           // 水平 padding
        py?: number;           // 垂直 padding
        radius?: number;       // 圓角
        background?: string;   // 背景色
        foreground?: string;   // 文字色
    };
    tooltip?: string;          // Hover 提示
    needsAriaLabel?: boolean;  // 無障礙標籤
}
```

---

## 🎨 完整範例：所有按鈕功能

```typescript
import { Component, signal, computed } from '@angular/core';
import { GxModal, GxModalButton } from '@sanring/gx-ui';

@Component({
    selector: 'app-complete-example',
    standalone: true,
    imports: [GxModal],
    template: `
        <button (click)="showModal.set(true)">開啟完整範例</button>

        <gx-modal
            [visible]="showModal()"
            [title]="'完整按鈕範例'"
            [size]="'lg'"
            [buttons]="allButtons()"
            [buttonPosition]="'right'"
            (closed)="onClosed()"
            (visibleChange)="showModal.set($event)"
            (buttonPressed)="onAnyButtonPressed($event)">

            <div class="modal-content">
                <p>這個範例展示所有按鈕功能：</p>
                <ul>
                    <li>不同的 intent 和 variant</li>
                    <li>Disabled 狀態</li>
                    <li>Tooltip 提示</li>
                    <li>自訂樣式</li>
                    <li>事件處理</li>
                </ul>

                <label>
                    <input
                        type="checkbox"
                        [checked]="isAgreed()"
                        (change)="isAgreed.set($any($event.target).checked)">
                    我同意條款
                </label>
            </div>
        </gx-modal>
    `,
    styles: [`
        .modal-content {
            line-height: 1.6;
        }
        label {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 16px;
            cursor: pointer;
        }
    `]
})
export class CompleteExampleComponent {
    showModal = signal(false);
    isAgreed = signal(false);
    isLoading = signal(false);

    // 動態計算按鈕配置
    allButtons = computed<GxModalButton[]>(() => [
        // 1. 基本按鈕
        {
            action: {
                label: '取消',
                handler: () => this.handleCancel()
            },
            variant: 'outline',
            intent: 'info'
        },

        // 2. 帶 Tooltip 的按鈕
        {
            action: {
                label: '重置',
                handler: () => this.handleReset()
            },
            variant: 'soft',
            intent: 'warning',
            tooltip: '重置所有設定'
        },

        // 3. 根據狀態動態 Disabled
        {
            action: {
                label: this.isLoading() ? '提交中...' : '提交',
                handler: () => this.handleSubmit(),
                disabled: !this.isAgreed() || this.isLoading()  // 動態控制
            },
            variant: 'filled',
            intent: 'success',
            tooltip: this.isAgreed() ? '提交表單' : '請先同意條款'
        },

        // 4. 自訂樣式的按鈕
        {
            action: {
                label: '進階',
                handler: () => this.handleAdvanced()
            },
            variant: 'filled',
            intent: 'info',
            styleTokens: {
                px: 20,
                py: 10,
                radius: 20,
                background: '#6366f1',
                foreground: '#ffffff'
            }
        }
    ]);

    handleCancel() {
        console.log('取消操作');
        this.showModal.set(false);
    }

    handleReset() {
        console.log('重置');
        this.isAgreed.set(false);
    }

    handleSubmit() {
        console.log('提交中...');
        this.isLoading.set(true);

        // 模擬 API 請求
        setTimeout(() => {
            console.log('提交成功');
            this.isLoading.set(false);
            this.showModal.set(false);
        }, 2000);
    }

    handleAdvanced() {
        console.log('進階設定');
    }

    onClosed() {
        console.log('Modal 關閉，執行清理');
        this.isAgreed.set(false);
        this.isLoading.set(false);
    }

    onAnyButtonPressed(event: { button: GxModalButton; event: MouseEvent }) {
        console.log('按鈕被按下:', {
            label: event.button.action.label,
            intent: event.button.intent,
            mouseEvent: event.event
        });
    }
}
```

---

## 🎯 重點總結

### ✅ Modal 開關控制

| 功能 | 方式 | 說明 |
|------|------|------|
| 開啟 | `visible` input | 設為 `true` |
| 關閉 | `visible` input 或 `close()` | 設為 `false` 或呼叫內部方法 |
| 監聽關閉 | `closed` output | Modal 關閉時觸發 |
| 雙向綁定 | `visibleChange` output | 狀態改變時觸發 |

### ✅ 按鈕功能支援

| 功能 | 支援 | 使用方式 |
|------|------|----------|
| **Click 事件** | ✅ | `action.handler` + `buttonPressed` output |
| **Disabled 狀態** | ✅ | `action.disabled` |
| **Hover 提示** | ✅ | `tooltip` 屬性 |
| **樣式變體** | ✅ | `variant` + `intent` |
| **自訂樣式** | ✅ | `styleTokens` |
| **無障礙** | ✅ | `needsAriaLabel` |

### ✅ 直接串接 gx-button

**是的！** Modal 完全支援直接串接 `gx-button` 的所有功能：

1. **透過 `buttons` 屬性**：自動使用 gx-button，所有屬性都會傳遞
2. **透過 footer slot**：手動使用 gx-button，完全自訂
3. **事件處理**：
   - 按鈕的 `action.handler` 處理業務邏輯
   - Modal 的 `buttonPressed` output 處理額外事件（如追蹤、日誌）

---

## 💡 最佳實踐

1. **使用 Signal 管理狀態**：利用 Angular 的 signal 讓按鈕狀態響應式更新
2. **動態 Disabled**：根據表單狀態或業務邏輯動態禁用按鈕
3. **事件分離**：業務邏輯放在 `action.handler`，追蹤/日誌放在 `buttonPressed`
4. **Tooltip 提示**：為 disabled 的按鈕添加 tooltip 說明原因
5. **Loading 狀態**：提交時修改 label 和 disabled 狀態提供反饋

---

如有其他問題，請參考 `MODAL-TOOLTIP-USAGE.md` 或查看測試檔案。

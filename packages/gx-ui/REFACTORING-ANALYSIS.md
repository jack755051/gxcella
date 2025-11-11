# Button 和 Tag 耦合分析與重構方案

## 🔍 當前耦合問題

### 問題 1: 強依賴關係

```typescript
// gx-tag.ts
import { GxButton } from "../button/gx-button";
import { GxButtonIntent, GxButtonStyle } from "../button/model/button.types";

// gx-tag.html
<gx-button
    [intent]="intent()"
    [variant]="'soft'"
    [disabled]="disabled()"
    [styleTokens]="tagStyles"
    (pressed)="onClick.emit($event)">
  <ng-content></ng-content>
</gx-button>
```

**問題**：
- ❌ `gx-tag` 直接依賴整個 `gx-button` 組件
- ❌ Tag 無法獨立演進（修改 Button 會影響 Tag）
- ❌ 語意不正確（Tag 不一定是可點擊的按鈕）
- ❌ Tag 繼承了 Button 的所有行為（可能不需要）
- ❌ Button 的 CSS 包含 tag variant（181-192行），造成雙向耦合

### 問題 2: 設計系統混亂

```css
/* button/gx-button.css */
.gx-btn.gx-variant-tag {
    --gx-btn-px: 8px;
    --gx-btn-py: 4px;
    --gx-btn-radius: 999px;  /* 藥丸形狀 */
}
```

**問題**：
- ❌ Button 的 CSS 中有 `tag` variant
- ❌ Tag 組件同時定義了自己的 `tagStyles`
- ❌ 樣式邏輯分散在兩個地方

### 問題 3: 類型共享

```typescript
// Tag 使用 Button 的類型
intent = input<GxButtonIntent>('info');
readonly tagStyles: GxButtonStyle = { ... };
```

**問題**：
- ❌ Tag 依賴 Button 的類型定義
- ❌ 如果 Button 類型改變，Tag 也必須改變

---

## 💡 重構方案（推薦）

### 方案 A: 共享設計 Token 系統（✅ 推薦）

**核心思路**：
1. 創建獨立的設計 token 系統（intent colors）
2. Button 和 Tag 都使用相同的 token
3. 組件實現完全獨立

**優點**：
- ✅ 組件獨立，可各自演進
- ✅ 保持一致的設計系統
- ✅ 減少重複代碼（共享顏色系統）
- ✅ 語意正確（Tag 是 Tag，Button 是 Button）
- ✅ 更容易維護和測試

**架構**：

```
packages/gx-ui/src/lib/
├── shared/
│   ├── model/
│   │   ├── action.model.ts
│   │   └── design-tokens.ts  ← 新增：共享的設計 token
│   └── styles/
│       └── intent-colors.css  ← 新增：共享的顏色系統
├── button/
│   ├── gx-button.ts
│   ├── gx-button.html
│   ├── gx-button.css  ← 移除 tag variant
│   └── model/
│       └── button.types.ts
└── tag/
    ├── gx-tag.ts  ← 移除對 GxButton 的依賴
    ├── gx-tag.html  ← 獨立實現
    ├── gx-tag.css  ← 獨立樣式，使用共享 tokens
    └── model/
        └── tag.types.ts  ← 新增：Tag 專屬類型
```

---

### 方案 B: 組合優化（適中方案）

**核心思路**：
1. 保留 Tag 使用 Button 的做法
2. 但明確定義為「組合關係」而非「繼承關係」
3. 添加抽象層來減少直接依賴

**優點**：
- ✅ 改動較小
- ✅ 保持代碼 DRY（不重複）
- ⚠️ 仍然存在依賴關係

**缺點**：
- ❌ 組件無法完全獨立
- ❌ 語意仍然不夠清晰

---

### 方案 C: 保持現狀（不推薦）

**優點**：
- ✅ 不需要改動

**缺點**：
- ❌ 所有上述問題持續存在
- ❌ 技術債累積

---

## 🎯 推薦實施：方案 A

### 步驟 1: 創建共享設計 Token

```typescript
// shared/model/design-tokens.ts
export type GxIntent = 'info' | 'success' | 'warning' | 'error';
export type GxSize = 'sm' | 'md' | 'lg';

export interface GxStyleTokens {
    px?: number;
    py?: number;
    radius?: number;
    background?: string;
    foreground?: string;
}
```

### 步驟 2: 創建共享顏色系統

```css
/* shared/styles/intent-colors.css */
:root {
    /* Info */
    --gx-intent-info-bg: var(--gx-color-blue-500);
    --gx-intent-info-foreground: white;
    --gx-intent-info-soft-bg: var(--gx-color-blue-50);

    /* Success */
    --gx-intent-success-bg: var(--gx-color-green-500);
    /* ... */
}
```

### 步驟 3: Button 使用共享 Token

```typescript
// button/gx-button.ts
import { GxIntent, GxStyleTokens } from '../shared/model/design-tokens';

export class GxButton {
    intent = input<GxIntent>('info');
    styleTokens = input<GxStyleTokens>({ px: 12, py: 8, radius: 8 });
}
```

### 步驟 4: Tag 獨立實現

```typescript
// tag/model/tag.types.ts
import { GxIntent, GxStyleTokens } from '../../shared/model/design-tokens';

export interface GxTagConfig {
    intent: GxIntent;
    removable: boolean;
    disabled: boolean;
}

// tag/gx-tag.ts
import { GxIntent } from '../shared/model/design-tokens';

@Component({
    selector: 'gx-tag',
    standalone: true,
    imports: [CommonModule],  // 移除 GxButton
    templateUrl: 'gx-tag.html',
    styleUrls: ['gx-tag.css', '../shared/styles/intent-colors.css']
})
export class GxTag {
    intent = input<GxIntent>('info');
    removable = input<boolean>(false);
    disabled = input<boolean>(false);

    onClick = output<MouseEvent>();
    remove = output<void>();
}

// tag/gx-tag.html
<span
    class="gx-tag gx-tag--{{intent()}}"
    [class.gx-tag--disabled]="disabled()"
    [class.gx-tag--clickable]="onClick.observed"
    (click)="!disabled() && onClick.emit($event)">

    <span class="gx-tag-content">
        <ng-content></ng-content>
    </span>

    @if (removable()) {
        <button
            class="gx-tag-remove"
            type="button"
            [disabled]="disabled()"
            (click)="onRemove($event)"
            aria-label="Remove tag">
            <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5"/>
            </svg>
        </button>
    }
</span>

// tag/gx-tag.css
.gx-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.875rem;

    /* 使用共享的 intent colors */
    background: var(--intent-soft-bg);
    color: var(--intent-bg);
    border: 1px solid transparent;

    transition: background-color 0.15s ease, color 0.15s ease;
}

.gx-tag--clickable {
    cursor: pointer;
}

.gx-tag--clickable:hover:not(.gx-tag--disabled) {
    background: var(--intent-soft-hover);
}

.gx-tag--disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Intent colors mapping */
.gx-tag--info {
    --intent-bg: var(--gx-intent-info-bg);
    --intent-soft-bg: var(--gx-intent-info-soft-bg);
    --intent-soft-hover: var(--gx-color-info-100);
}
/* ... success, warning, error */
```

### 步驟 5: 移除 Button 中的 Tag Variant

```css
/* button/gx-button.css */
/* 刪除這段 */
.gx-btn.gx-variant-tag { ... }
```

---

## 📊 重構影響評估

### 破壞性改動

| 改動 | 影響 | 遷移難度 |
|------|------|---------|
| Tag 不再使用 Button | 需要更新 Tag 樣式 | 中等 |
| 移除 `GxButtonIntent` → `GxIntent` | 需要更新 import | 簡單（重新導出可兼容）|
| Button 移除 tag variant | 如果有使用會破壞 | 低（應該沒有使用）|

### 遷移計畫

1. **Phase 1**: 創建共享 token 系統
2. **Phase 2**: Button 遷移到新 token（向後兼容）
3. **Phase 3**: Tag 重構為獨立組件
4. **Phase 4**: 移除 Button 的 tag variant
5. **Phase 5**: 清理舊的類型導出

### 向後兼容策略

```typescript
// button/model/button.types.ts
import { GxIntent } from '../../shared/model/design-tokens';

// 向後兼容：重新導出
export type GxButtonIntent = GxIntent;
export { GxStyleTokens as GxButtonStyle } from '../../shared/model/design-tokens';
```

---

## 🎬 下一步行動

### 建議的重構順序：

1. ✅ **現在決定**：選擇重構方案
2. 🔧 **創建基礎**：建立共享 token 系統
3. 🏗️ **重構 Tag**：讓 Tag 獨立
4. 🧹 **清理 Button**：移除 tag variant
5. ✅ **測試驗證**：確保沒有破壞現有功能

### 是否立即執行重構？

**問題給你**：
- 選項 A：立即執行完整重構（方案 A）
- 選項 B：先創建共享 token，逐步重構
- 選項 C：暫時保持現狀，記錄技術債

你希望如何處理？

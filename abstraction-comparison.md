# @sanring/gx-table vs @sanring/gx-card 抽象化對比分析

## 📊 總體評分

| 維度 | gx-table | gx-card | 勝出 |
|------|----------|---------|------|
| **組件拆分** | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐ (3/5) | **gx-table** |
| **使用彈性** | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐⭐ (4/5) | **gx-table** |
| **學習曲線** | ⭐⭐⭐⭐ (4/5) | ⭐⭐⭐⭐⭐ (5/5) | **gx-card** |
| **抽象層次** | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐ (3/5) | **gx-table** |
| **狀態管理** | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐ (2/5) | **gx-table** |
| **向後兼容** | ⭐⭐⭐ (3/5) | ⭐⭐⭐⭐⭐ (5/5) | **gx-card** |

### 🏆 總結：**gx-table 抽象化更加成功**

---

## 🔍 詳細對比分析

### 1️⃣ **組件拆分程度**

#### gx-table ✅ 勝出

```typescript
// ✅ 高度模組化，每個組件職責單一
GxTableShell         // 容器（佈局、插槽）
├── GxTableHeader    // 表頭（排序、全選）
│   └── GxTableHeaderCell  // 單個表頭欄位
├── GxTableBody      // 主體（資料渲染）
│   ├── GxTableRow   // 單一資料列
│   │   └── GxTableCell    // 單個儲存格
└── GxTableEmptyState // 空狀態

TableService         // 狀態管理（獨立）
```

**優點：**
- ✅ 職責單一（Single Responsibility）
- ✅ 可獨立使用任何組件
- ✅ 易於測試和維護
- ✅ 高度可組合

#### gx-card ⚠️ 拆分不足

```typescript
// ⚠️ 組件拆分較粗
GxCard               // 主容器（過於龐大）
├── GxCardHeader     // 標頭
├── GxCardContent    // 內容
└── GxCardFooter     // 底部

GxCardGroup          // 群組容器
```

**問題：**
- ❌ `GxCard` 組件包含過多邏輯（180+ 行）
- ❌ 樣式計算、事件處理都在同一個組件
- ❌ 難以單獨使用子組件（Header/Content/Footer）

---

### 2️⃣ **使用彈性**

#### gx-table ✅ 勝出

```typescript
// ✅ 極高彈性：可以任意組合
<gx-table-shell>
  <!-- 可以只用 Header -->
  <gx-table-header />
</gx-table-shell>

<!-- 或者自己組合 Row 和 Cell -->
<tbody>
  @for (row of data; track row.id) {
    <gx-table-row>
      <gx-table-cell>自定義內容</gx-table-cell>
    </gx-table-row>
  }
</tbody>

<!-- 或者完全自定義 -->
<gx-table-shell>
  <div>完全自定義內容</div>
</gx-table-shell>
```

**優點：**
- ✅ 組件之間松耦合
- ✅ 可以選擇性使用功能
- ✅ 易於擴展和自定義

#### gx-card ⚠️ 彈性有限

```typescript
// ⚠️ 必須使用完整的 Card 結構
<gx-card>
  <gx-card-header />  <!-- 必須在 Card 內 -->
  <gx-card-content /> <!-- 必須在 Card 內 -->
  <gx-card-footer />  <!-- 必須在 Card 內 -->
</gx-card>

// ❌ 無法單獨使用子組件
<gx-card-header />  <!-- 樣式會錯亂 -->
```

**問題：**
- ❌ 子組件與父組件高度耦合
- ❌ 難以在 Card 外使用子組件
- ❌ 自定義受限

---

### 3️⃣ **抽象層次**

#### gx-table ✅ 勝出

```typescript
// ✅ 清晰的抽象層次

// 層次 1: 基礎組件（無狀態）
GxTableCell, GxTableHeaderCell

// 層次 2: 容器組件（有狀態）
GxTableRow, GxTableHeader, GxTableBody

// 層次 3: 佈局組件
GxTableShell

// 層次 4: 狀態管理（獨立）
TableService
```

**優點：**
- ✅ 每層職責清晰
- ✅ 可以在任何層次介入
- ✅ 狀態管理獨立於 UI

#### gx-card ⚠️ 抽象混亂

```typescript
// ⚠️ 抽象層次混亂

GxCard {
  // ❌ UI 邏輯
  get classes() {...}
  get cardStyles() {...}

  // ❌ 狀態計算
  effectiveVariant = computed(...)
  effectiveLayout = computed(...)

  // ❌ 事件處理
  onActionPressed() {...}
  onCardClick() {...}
  onTagClick() {...}

  // ❌ 業務邏輯
  isInteractiveEvent() {...}
  private upChain() {...}
}
```

**問題：**
- ❌ UI、狀態、邏輯混在一起
- ❌ 缺少獨立的狀態管理層
- ❌ 難以抽取可複用邏輯

---

### 4️⃣ **狀態管理**

#### gx-table ✅ 勝出

```typescript
// ✅ 獨立的狀態管理服務
@Injectable()
export class TableService<T> {
  readonly state: WritableSignal<TableState>;
  readonly sortedData: Signal<T[]>;
  readonly hasSelection: Signal<boolean>;
  readonly selectedCount: Signal<number>;
  readonly isAllSelected: Signal<boolean>;
  readonly isIndeterminate: Signal<boolean>;

  handleSort(key: string): void {...}
  toggleSelectAll(): void {...}
  toggleSelectRow(id: string): void {...}
  getSelectedRows(): T[] {...}
}
```

**優點：**
- ✅ 狀態管理與 UI 分離
- ✅ 可獨立測試
- ✅ 可在多個 Table 間共用
- ✅ 完整的 Signal 響應式系統

#### gx-card ❌ 無獨立狀態管理

```typescript
// ❌ 狀態散落在組件內
GxCard {
  effectiveVariant = computed(...)  // 在組件內
  effectiveLayout = computed(...)   // 在組件內
  resolvedShape = computed(...)     // 在組件內
}
```

**問題：**
- ❌ 無法在組件外訪問狀態
- ❌ 難以測試
- ❌ 無法複用狀態邏輯

---

### 5️⃣ **API 設計**

#### gx-table ✅ 勝出

```typescript
// ✅ 清晰簡潔的 API
interface TableColumn {
  key: string;        // 必填
  label: string;      // 必填
  sortable?: boolean; // 可選
  width?: string;     // 可選
  align?: 'left' | 'center' | 'right'; // 可選
}

// ✅ 最小必填欄位
<gx-table-body
  [data]="data"      // 必填
  [columns]="columns" // 必填
/>
```

**優點：**
- ✅ API 簡單直觀
- ✅ 必填項少
- ✅ TypeScript 類型完整

#### gx-card ⚠️ API 複雜

```typescript
// ⚠️ 過於複雜的型別定義
interface IGxCard extends IGxInteractive {
  id?: string;
  variant?: GxCardVariant;
  header?: IGxCardHeader;
  content: IGxCardContent;  // 必填，但結構複雜
  footer?: IGxCardFooter;
  shape?: GxCardShape;
}

interface IGxCardContent {
  title?: string;
  subtitle?: string;
  description?: string;
  descriptionCollapse?: IGxDescriptionCollapse; // 深層嵌套
  tags?: IGxTag[];
  image?: GxMedia;
}
```

**問題：**
- ❌ 類型嵌套過深
- ❌ 配置項過多
- ❌ 學習成本高

---

### 6️⃣ **向後兼容性**

#### gx-card ✅ 勝出

```typescript
// ✅ 優秀的向後兼容設計
<gx-card [data]="cardData">  <!-- 舊方式：data input -->
</gx-card>

<gx-card>  <!-- 新方式：投影插槽 -->
  <gx-card-header />
  <gx-card-content />
</gx-card>

// ✅ 自動判斷模式
readonly isLegacyMode = computed(() => !!this.data());
```

**優點：**
- ✅ 同時支援兩種方式
- ✅ 漸進式遷移
- ✅ 不破壞現有代碼

#### gx-table ⚠️ 無明確的遷移路徑

```typescript
// ⚠️ 只有一種使用方式
<gx-table-shell>
  <gx-table-header [columns]="columns" />
  <gx-table-body [data]="data" />
</gx-table-shell>
```

**問題：**
- ❌ 無向後兼容
- ❌ 重構成本高（如果有舊版本）

---

## 🎯 具體問題分析

### gx-card 的主要問題

#### 問題 1: 組件職責過重

```typescript
// ❌ GxCard 組件做太多事情
export class GxCard {
  data = input<IGxCard>();           // 1. 資料管理
  variant = input<GxCardVariant>();  // 2. 樣式配置
  clickable = input<boolean>();      // 3. 互動配置
  colors = input<IGxCardColors>();   // 4. 顏色配置

  actions = output<GxAction>();      // 5. 動作事件
  cardClick = output<MouseEvent>();  // 6. 點擊事件
  tagClick = output<...>();          // 7. Tag 事件
  headerItemClick = output<...>();   // 8. Header 事件

  effectiveVariant = computed(...)   // 9. 樣式計算
  effectiveLayout = computed(...)    // 10. 佈局計算
  resolvedShape = computed(...)      // 11. 形狀計算

  get cardStyles() {...}             // 12. 動態樣式
  get classes() {...}                // 13. CSS 類別

  onActionPressed() {...}            // 14. 事件處理
  onCardClick() {...}                // 15. 點擊處理
  isInteractiveEvent() {...}         // 16. 互動判斷
}
```

**建議：** 拆分為多個小組件和服務

---

#### 問題 2: 缺少狀態管理服務

```typescript
// ❌ 狀態計算散落在組件中
readonly effectiveVariant = computed(() =>
  this.variant() ?? this.group?.variant() ?? this.cardConfig.config.defaultVariant ?? 'elevated'
);
```

**建議：** 創建 `CardStateService`

```typescript
@Injectable()
export class CardStateService {
  readonly effectiveVariant: Signal<GxCardVariant>;
  readonly effectiveLayout: Signal<GxCardLayout>;
  readonly resolvedShape: Signal<GxCardShape>;

  computeEffectiveStyle(card: GxCard): CardStyle {...}
}
```

---

#### 問題 3: 子組件無法獨立使用

```typescript
// ❌ 必須在 GxCard 內使用
<gx-card>
  <gx-card-header />  <!-- 依賴父組件的 context -->
</gx-card>

// ❌ 無法單獨使用
<gx-card-header />  <!-- 樣式會錯亂 -->
```

**建議：** 讓子組件獨立可用

---

### gx-table 的優點

#### 優點 1: 完美的組件拆分

```typescript
// ✅ 每個組件都可獨立使用
<gx-table-cell [column]="col" [row]="row">
  自定義內容
</gx-table-cell>

// ✅ 可以只用部分組件
<gx-table-header [columns]="columns" />

// ✅ 可以完全自定義
<gx-table-shell>
  <div>我的自定義 Table</div>
</gx-table-shell>
```

---

#### 優點 2: 獨立的狀態管理

```typescript
// ✅ 狀態與 UI 分離
constructor(public tableService: TableService) {
  tableService.initialize({
    data: this.data,
    columns: this.columns,
  });
}

// ✅ 可在組件外訪問狀態
const selected = this.tableService.getSelectedRows();
const sortedData = this.tableService.sortedData();
```

---

#### 優點 3: 最小化 API

```typescript
// ✅ 簡單直觀
interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

// ✅ 只需要基本資料
<gx-table-body
  [data]="data"
  [columns]="columns"
/>
```

---

## 💡 改進建議

### 🔧 gx-card 改進方向

#### 1. 拆分組件職責

```typescript
// 建議：創建更細粒度的組件
GxCard                    // 容器
├── GxCardContainer       // 佈局容器
├── GxCardHeader
│   ├── GxCardAvatar     // 獨立頭像組件
│   ├── GxCardTitle      // 獨立標題組件
│   └── GxCardSubtitle   // 獨立副標題組件
├── GxCardContent
│   ├── GxCardImage      // 獨立圖片組件
│   ├── GxCardTags       // 獨立標籤容器
│   └── GxCardDescription // 獨立描述組件
└── GxCardFooter
    └── GxCardActions    // 獨立動作容器
```

#### 2. 創建狀態管理服務

```typescript
// 建議：創建 CardStateService
@Injectable()
export class CardStateService {
  computeEffectiveVariant(
    card: GxCardVariant | undefined,
    group: GxCardVariant | undefined,
    global: GxCardVariant
  ): GxCardVariant {...}

  computeEffectiveLayout(...): GxCardLayout {...}
  resolveShape(...): GxCardShape {...}
}
```

#### 3. 簡化 API

```typescript
// 建議：減少必填欄位
interface IGxCardContent {
  title?: string;           // 簡化
  description?: string;     // 簡化
  image?: string;           // 簡化（不用 GxMedia）
}

// 而不是
interface IGxCardContent {
  title?: string;
  subtitle?: string;
  description?: string;
  descriptionCollapse?: IGxDescriptionCollapse; // ❌ 太複雜
  tags?: IGxTag[];
  image?: GxMedia;          // ❌ 太複雜
}
```

#### 4. 讓子組件獨立可用

```typescript
// 建議：讓子組件可獨立使用
<gx-card-header
  [avatar]="avatarUrl"
  [title]="title"
  [subtitle]="subtitle">
</gx-card-header>  <!-- ✅ 可以在任何地方使用 -->
```

---

### ✅ gx-table 保持優點

gx-table 已經做得很好，建議：

1. ✅ 繼續保持組件拆分粒度
2. ✅ 保持 TableService 的獨立性
3. ✅ 保持最小化 API 設計
4. 🔄 可以考慮添加向後兼容模式（如 gx-card）

---

## 📊 最終結論

### 🏆 gx-table 抽象化更加成功

**原因：**

1. ✅ **組件拆分更細緻** - 每個組件職責單一
2. ✅ **狀態管理獨立** - TableService 與 UI 分離
3. ✅ **使用彈性更高** - 可任意組合
4. ✅ **API 設計更簡潔** - 最小化必填欄位
5. ✅ **抽象層次清晰** - 分層明確

**gx-card 的優點：**
- ✅ 向後兼容性優秀
- ✅ 學習曲線較平緩（對簡單使用場景）

**gx-card 需要改進：**
- ❌ 組件職責過重
- ❌ 缺少獨立狀態管理
- ❌ 子組件無法獨立使用
- ❌ API 過於複雜

---

## 🎯 設計原則總結

**優秀的組件抽象應該：**

1. **單一職責** - 每個組件只做一件事
2. **松耦合** - 組件之間低依賴
3. **高內聚** - 相關邏輯集中管理
4. **可組合** - 可以自由組合
5. **最小 API** - 必填項少，可選項多
6. **狀態分離** - UI 與狀態管理分離

**gx-table 符合所有原則 ✅**
**gx-card 需要重構以符合這些原則 ⚠️**

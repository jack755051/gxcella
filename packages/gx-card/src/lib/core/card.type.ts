export type GxCardVariant = 'elevated' | 'outlined' | 'flat';
/**
 * 卡片群組的排列方式
 * grid（網格排列）
 * single（單一排列）
 * masonry（瀑布排列）
 */
export type GxCardLayout = 'grid' | 'single' | 'masonry';

/**
 * 單張卡片的形狀類型
 * square（方形卡片）
 * landscape（長條形卡片）
 * portrait（豎向卡片）
 */
export type GxCardShape = 
  | 'classic'      // 經典（標題 + 內容 + footer）
  | 'square'       // 方形卡片
  | 'landscape'    // 長條橫向卡片
  | 'portrait'     // 豎向卡片
  | 'custom';      // 完全自定義

/**
 * 動作的意圖類型
 */
export type GxActionIntent = 'primary' | 'secondary' | 'danger';

/**
 * 哪些 shape 可用在哪種 layout
 */
export const ALLOWED = {
  grid:    ['classic', 'square', 'portrait', 'custom'],
  masonry: ['classic', 'square', 'portrait', 'custom'],
  single:  ['landscape', 'custom'],
} as const satisfies Record<GxCardLayout, readonly GxCardShape[]>;

/** 卡片或動作的互動/導向設定 */
export interface IGxInteractive {
  href?: string;
  target?: '_self' | '_blank';
  ariaLabel?: string; // 無可見文字、或卡片整體可點擊時有用
}

/**
 * 卡牌的資料結構
 */
export interface IGxCard extends IGxInteractive{
  id?: string;
  variant?: GxCardVariant;
  header?: IGxCardHeader;
  content?: IGxCardContent; // ⚠️ 改成可選，因為 custom 時可能不需要
  footer?: IGxCardFooter;
  shape?: GxCardShape; // 卡片形狀
}

/**
 * 媒體資源的資料結構
 */
export type GxMedia = {
  src: string;
  alt?: string;
  /** 比例：用常見字串或自訂，例如 '1:1' | '16:9' | '3:4' | 'auto' */
  ratio?: string;
};


export interface IGxCardHeader{
  cover?: GxMedia;    // 封面圖（比 image 更語意化）
  avatar?: GxMedia;   // 可選：作者頭像
  title?: string;     // 標題（通常搭配 cover/頭像時使用）
  subtitle?: string;  // 副標題
}

export interface IGxCardContent {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: GxMedia;   // 內文中的插圖
}

export interface IGxCardFooter {
  actions: GxAction[];
}


export interface GxAction extends IGxInteractive {
  id: string;
  label: string;
  icon?: string;
  intent?: GxActionIntent;
  disabled?: boolean;
}
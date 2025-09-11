import { GxTag } from "@sanring/gx-ui";

/**
 * Tag 資料介面
 */
export interface IGxTag {
  id: string;
  label: string;
  intent?: 'info' | 'success' | 'warning' | 'error';
  disabled?: boolean;
  removable?: boolean;
}

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
  content: IGxCardContent; 
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


export interface IGxCardHeader extends IGxInteractive{
  avatar?: GxMedia;   // 可選：作者頭像
  title?: string;     // 標題（通常搭配 cover/頭像時使用）
  subtitle?: string;  // 副標題
}

/**
 * 描述文字收合配置介面
 */
export interface IGxDescriptionCollapse {
  /** 是否啟用收合功能 */
  enabled: boolean;
  /** 最大顯示行數 */
  maxLines?: number;
  /** 字型大小 (px) */
  fontSize?: number;
  /** 行高 (px) */
  lineHeight?: number;
  /** 展開按鈕文字 */
  expandText?: string;
  /** 收起按鈕文字 */
  collapseText?: string;
}

export interface IGxCardContent {
  title?: string;
  subtitle?: string;
  description?: string;
  /** 描述文字收合配置 */
  descriptionCollapse?: IGxDescriptionCollapse;
  tags?: IGxTag[]; // 標籤
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

export const SHAPE_DISPLAY_RULES = {
  classic: {
    headerSubtitle: true,
    contentImage: true,
    contentSubtitle: true,
    contentDescription: true,
    maxActions: Infinity,
    buttonVariant: 'filled' as const
  },
  square: {
    headerSubtitle: false,
    contentImage: false,
    contentSubtitle: false,
    contentDescription: false,
    maxActions: 1,
    buttonVariant: 'filled' as const
  },
  landscape: {
    headerSubtitle: true,
    contentImage: false,
    contentSubtitle: false,
    contentDescription: true,
    maxActions: 2,
    buttonVariant: 'outlined' as const
  }
} as const;
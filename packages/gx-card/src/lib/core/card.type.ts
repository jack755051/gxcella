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
export type GxCardLayout = 'grid' | 'single';

/**
 * 簡化的卡片形狀類型 - 只保留 3 種核心類型
 */
export type GxCardShape = 
  | 'classic'      // 經典完整卡片
  | 'compact'      // 緊湊型卡片
  | 'custom';      // 完全自定義

/**
 * 動作的意圖類型
 */
export type GxActionIntent = 'primary' | 'secondary' | 'danger';

/**
 * 哪些 shape 可用在哪種 layout
 */
export const ALLOWED = {
  grid:   ['classic', 'compact', 'custom'],
  single: ['classic', 'custom'],
} as const satisfies Record<GxCardLayout, readonly GxCardShape[]>;

/** 卡片或動作的互動/導向設定 */
export interface IGxInteractive {
  href?: string;
  target?: '_self' | '_blank';
  ariaLabel?: string;
}

/**
 * 卡牌的資料結構
 */
export interface IGxCard extends IGxInteractive{
  id?: string;
  variant?: GxCardVariant;
  header?: IGxCardHeader;
  content?: IGxCardContent;
  footer?: IGxCardFooter;
  shape?: GxCardShape;
}

/**
 * 媒體資源的資料結構
 */
export type GxMedia = {
  src: string;
  alt?: string;
  ratio?: string;
};

export interface IGxCardHeader extends IGxInteractive{
  avatar?: GxMedia;
  title?: string;
  subtitle?: string;
}

export interface IGxCardContent {
  title?: string;
  subtitle?: string;
  description?: string;
  tags?: IGxTag[];
  image?: GxMedia;
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
export type GxCardVariant = 'elevated' | 'outlined' | 'flat';
export type GxCardLayout = 'tile' | 'horizontal' | 'grid';

export type GxMedia = { src: string; alt?: string; ratio?: string };

/**
 * 卡牌的資料結構
 */
export interface IGxCard{
  header?: IGxCardHeader;
  content: IGxCardContent;
  footer?: IGxCardFooter; 
}

export interface IGxCardHeader{
  image?: GxMedia;
  title?: string;
  subtitle?: string;
}

export interface IGxCardContent{
  title?: string;
  subtitle?: string;
  description?: string;
  image?: GxMedia;
}

export interface IGxCardFooter {
  actions: GxAction[];
}

export interface GxAction {
  id: string;            // e.g. 'open', 'share', 'delete'
  label: string;
  icon?: string;         // optional: 'mat:share' or 'i-heroicons-share'
  intent?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  href?: string;         // 如為超連結動作
  target?: '_blank' | '_self';
}
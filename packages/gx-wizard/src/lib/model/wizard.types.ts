/**
 * Wizard 步驟配置介面
 */
export interface WizardStepConfig {
  /** 步驟唯一識別 */
  id: string;
  /** 步驟標題 */
  title: string;
  /** 步驟描述 */
  description?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 其他自定義屬性 */
  [key: string]: any;
}

/**
 * 步驟變更事件
 */
export interface StepChangeEvent {
  /** 來源步驟 */
  from: number;
  /** 目標步驟 */
  to: number;
}

/**
 * 下一步事件
 */
export interface NextStepEvent {
  /** 當前步驟 */
  step: number;
}

/**
 * 上一步事件
 */
export interface PrevStepEvent {
  /** 當前步驟 */
  step: number;
}

/**
 * 完成事件
 */
export interface FinishEvent {
  /** Wizard ID */
  wizardId: string;
}

/**
 * Wizard 自定義樣式類
 */
export interface WizardCustomClass {
  /** 容器樣式 */
  container?: string;
  /** 指示器樣式 */
  indicator?: string;
  /** 內容區樣式 */
  content?: string;
  /** 標頭樣式 */
  header?: string;
  /** 主體樣式 */
  body?: string;
  /** 動作區樣式 */
  actions?: string;
  /** 動作容器樣式 */
  actionContainer?: string;
  /** 上一步按鈕樣式 */
  prevButton?: string;
  /** 下一步按鈕樣式 */
  nextButton?: string;
  /** 完成按鈕樣式 */
  finishButton?: string;
}

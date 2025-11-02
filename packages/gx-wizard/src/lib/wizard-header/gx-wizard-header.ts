import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * GxWizardHeader Component
 *
 * 對應 Vue 的 WizardHeader.vue，提供步驟標頭功能：
 * - 顯示步驟標題和描述
 * - 顯示步驟指示器（N / M）
 * - 支援自定義圖標
 * - 支援自定義內容投影
 */
@Component({
  selector: 'gx-wizard-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gx-wizard-header.html',
  styleUrl: './gx-wizard-header.css',
})
export class GxWizardHeader {
  /** Wizard ID */
  wizardId = input.required<string>();

  /** 當前步驟序號 */
  step = input.required<number>();

  /** 總步驟數 */
  totalSteps = input<number>(0);

  /** 標題（可選，未提供則顯示「步驟 N」） */
  title = input<string | undefined>(undefined);

  /** 描述文字 */
  description = input<string | undefined>(undefined);

  /** 是否顯示圖標 */
  showIcon = input<boolean>(false);

  /** 是否顯示步驟指示器 */
  showStepIndicator = input<boolean>(true);

  /** 自定義樣式 */
  customClass = input<{
    container?: string;
    icon?: string;
    title?: string;
    description?: string;
    indicator?: string;
  }>({});

  /** Header 容器樣式 */
  readonly headerClass = computed(() => {
    const classes = [
      'wizard-header',
      'flex',
      'items-center',
      'gap-4',
      'p-4',
      'border-b',
      'border-gray-200',
    ];
    if (this.customClass().container) {
      classes.push(this.customClass().container!);
    }
    return classes.join(' ');
  });

  /** 預設標題 */
  readonly defaultTitle = computed(() => {
    return this.title() || `步驟 ${this.step()}`;
  });
}

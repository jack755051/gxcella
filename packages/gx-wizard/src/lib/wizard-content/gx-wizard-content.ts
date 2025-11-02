import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * GxWizardContent Component
 *
 * 對應 Vue 的 WizardContent.vue，提供步驟內容區域：
 * - 作為內容容器，主要透過 ng-content 投影自定義內容
 * - 提供預設的空模板
 */
@Component({
  selector: 'gx-wizard-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gx-wizard-content.html',
  styleUrl: './gx-wizard-content.css',
})
export class GxWizardContent {
  /** Wizard ID */
  wizardId = input<string>('');

  /** 當前步驟序號 */
  step = input<number>(1);
}

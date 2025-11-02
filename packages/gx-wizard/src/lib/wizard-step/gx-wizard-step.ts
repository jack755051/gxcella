import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxWizardHeader } from '../wizard-header/gx-wizard-header';
import { GxWizardContent } from '../wizard-content/gx-wizard-content';
import { GxWizardActions } from '../wizard-actions/gx-wizard-actions';
import { WizardCustomClass } from '../model/wizard.types';

/**
 * GxWizardStep Component
 *
 * 對應 Vue 的 WizardStep.vue，提供單一步驟容器：
 * - 組合 Header、Content、Actions 三個子組件
 * - 支援自定義各部分內容
 * - 處理步驟內的事件傳遞
 */
@Component({
  selector: 'gx-wizard-step',
  standalone: true,
  imports: [CommonModule, GxWizardHeader, GxWizardContent, GxWizardActions],
  templateUrl: './gx-wizard-step.html',
  styleUrl: './gx-wizard-step.css',
})
export class GxWizardStep {
  /** Wizard ID */
  wizardId = input.required<string>();

  /** 當前步驟序號 */
  step = input.required<number>();

  /** 總步驟數 */
  totalSteps = input<number>(0);

  /** 步驟標題 */
  title = input<string | undefined>(undefined);

  /** 步驟描述 */
  description = input<string | undefined>(undefined);

  /** 是否為目前啟用的步驟 */
  active = input<boolean>(false);

  /** 自定義樣式 */
  customClass = input<WizardCustomClass>({});

  /** 事件發射 */
  next = output<{ wizardId: string; step: number }>();
  prev = output<{ wizardId: string; step: number }>();
  finish = output<{ wizardId: string }>();

  /** 容器樣式 */
  readonly containerClass = computed(() => {
    const classes = ['wizard-step-wrapper', 'w-full'];
    if (this.customClass().container) {
      classes.push(this.customClass().container);
    }
    return classes.join(' ');
  });

  /** 處理下一步 */
  handleNext(): void {
    this.next.emit({ wizardId: this.wizardId(), step: this.step() });
  }

  /** 處理上一步 */
  handlePrev(): void {
    this.prev.emit({ wizardId: this.wizardId(), step: this.step() });
  }

  /** 處理完成 */
  handleFinish(): void {
    this.finish.emit({ wizardId: this.wizardId() });
  }
}

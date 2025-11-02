import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * GxWizardActions Component
 *
 * 對應 Vue 的 WizardActions.vue，提供步驟動作按鈕：
 * - 上一步按鈕
 * - 下一步按鈕
 * - 完成按鈕
 * - 支援自定義按鈕樣式和文字
 */
@Component({
  selector: 'gx-wizard-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gx-wizard-actions.html',
  styleUrl: './gx-wizard-actions.css',
})
export class GxWizardActions {
  /** Wizard ID */
  wizardId = input.required<string>();

  /** 當前步驟序號 */
  step = input.required<number>();

  /** 總步驟數 */
  totalSteps = input<number>(0);

  /** 是否顯示上一步按鈕 */
  showPrev = input<boolean>(true);

  /** 是否顯示下一步按鈕 */
  showNext = input<boolean>(true);

  /** 是否顯示完成按鈕 */
  showFinish = input<boolean>(false);

  /** 按鈕文字 */
  prevLabel = input<string>('上一步');
  nextLabel = input<string>('下一步');
  finishLabel = input<string>('完成');

  /** 自訂樣式 */
  customClass = input<{
    container?: string;
    prevButton?: string;
    nextButton?: string;
    finishButton?: string;
  }>({});

  /** 事件發射 */
  next = output<void>();
  prev = output<void>();
  finish = output<void>();

  /** 容器樣式 */
  readonly containerClass = computed(() => {
    const classes = ['flex', 'items-center', 'gap-2', 'justify-end'];
    if (this.customClass().container) {
      classes.push(this.customClass().container);
    }
    return classes.join(' ');
  });

  /** 是否為第一步 */
  readonly isFirstStep = computed(() => this.step() === 1);

  /** 是否為最後一步 */
  readonly isLastStep = computed(() => {
    return this.totalSteps() > 0 && this.step() === this.totalSteps();
  });

  /** 上一步按鈕樣式 */
  readonly prevButtonClass = computed(() => {
    return this.customClass().prevButton || 'btn-secondary';
  });

  /** 下一步按鈕樣式 */
  readonly nextButtonClass = computed(() => {
    return this.customClass().nextButton || 'btn-primary';
  });

  /** 完成按鈕樣式 */
  readonly finishButtonClass = computed(() => {
    return this.customClass().finishButton || 'btn-primary';
  });

  /** 處理上一步 */
  handlePrev(): void {
    if (!this.isFirstStep()) {
      this.prev.emit();
    }
  }

  /** 處理下一步 */
  handleNext(): void {
    if (!this.isLastStep()) {
      this.next.emit();
    }
  }

  /** 處理完成 */
  handleFinish(): void {
    this.finish.emit();
  }
}

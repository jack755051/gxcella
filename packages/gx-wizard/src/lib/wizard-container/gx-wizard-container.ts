import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GxWizardStep } from '../wizard-step/gx-wizard-step';
import { WizardStepConfig, WizardCustomClass, StepChangeEvent, NextStepEvent, PrevStepEvent, FinishEvent } from '../model/wizard.types';

/**
 * GxWizardContainer Component
 *
 * 對應 Vue 的 WizardContainer.vue，提供完整的 Wizard 容器：
 * - 管理步驟狀態（當前步驟、總步驟數）
 * - 提供步驟指示器
 * - 處理步驟導航（上一步、下一步、跳轉）
 * - 支援完成事件
 * - 高度可自定義的插槽系統
 */
@Component({
  selector: 'gx-wizard-container',
  standalone: true,
  imports: [CommonModule, GxWizardStep],
  templateUrl: './gx-wizard-container.html',
  styleUrl: './gx-wizard-container.css',
})
export class GxWizardContainer {
  /** Wizard 唯一識別 */
  wizardId = input.required<string>();

  /** 步驟配置陣列 */
  steps = input<WizardStepConfig[]>([]);

  /** 初始步驟 */
  initialStep = input<number>(1);

  /** 是否顯示步驟指示器 */
  showStepsIndicator = input<boolean>(true);

  /** 是否允許跳轉步驟 */
  allowStepJump = input<boolean>(false);

  /** 自定義樣式 */
  customClass = input<WizardCustomClass>({});

  /** 事件發射 */
  stepChange = output<StepChangeEvent>();
  next = output<NextStepEvent>();
  prev = output<PrevStepEvent>();
  finish = output<FinishEvent>();

  /** 當前步驟（使用 signal 管理狀態） */
  currentStep = signal(1);

  /** 總步驟數 */
  readonly totalSteps = computed(() => {
    return this.steps().length > 0 ? this.steps().length : 1;
  });

  /** 當前步驟資料 */
  readonly currentStepData = computed(() => {
    if (this.steps().length === 0) return null;
    return this.steps()[this.currentStep() - 1];
  });

  /** 是否為第一步 */
  readonly isFirstStep = computed(() => this.currentStep() === 1);

  /** 是否為最後一步 */
  readonly isLastStep = computed(() => this.currentStep() === this.totalSteps());

  /** 容器樣式 */
  readonly containerClass = computed(() => {
    const classes = ['wizard-container', 'w-full'];
    if (this.customClass().container) {
      classes.push(this.customClass().container);
    }
    return classes.join(' ');
  });

  /** 生成步驟數字陣列（用於指示器） */
  readonly stepNumbers = computed(() => {
    return Array.from({ length: this.totalSteps() }, (_, i) => i + 1);
  });

  constructor() {
    // 在組件初始化時設置初始步驟
    this.currentStep.set(this.initialStep());
  }

  /** 下一步 */
  nextStep(): void {
    if (!this.isLastStep()) {
      const from = this.currentStep();
      this.currentStep.update(v => v + 1);
      this.stepChange.emit({ from, to: this.currentStep() });
      this.next.emit({ step: this.currentStep() });
    }
  }

  /** 上一步 */
  prevStep(): void {
    if (!this.isFirstStep()) {
      const from = this.currentStep();
      this.currentStep.update(v => v - 1);
      this.stepChange.emit({ from, to: this.currentStep() });
      this.prev.emit({ step: this.currentStep() });
    }
  }

  /** 跳轉到指定步驟 */
  goToStep(step: number): void {
    if (this.allowStepJump() && step >= 1 && step <= this.totalSteps()) {
      const from = this.currentStep();
      this.currentStep.set(step);
      this.stepChange.emit({ from, to: step });
    }
  }

  /** 完成 Wizard */
  finishWizard(): void {
    this.finish.emit({ wizardId: this.wizardId() });
  }

  /** 處理下一步事件 */
  handleNext(): void {
    this.nextStep();
  }

  /** 處理上一步事件 */
  handlePrev(): void {
    this.prevStep();
  }

  /** 處理完成事件 */
  handleFinish(): void {
    this.finishWizard();
  }

  /** 判斷步驟狀態（用於指示器樣式） */
  getStepClass(stepNum: number): string {
    const classes = [
      'flex',
      'h-10',
      'w-10',
      'items-center',
      'justify-center',
      'rounded-full',
      'border-2',
      'transition-all',
    ];

    if (stepNum < this.currentStep()) {
      // 已完成的步驟
      classes.push('border-primary-500', 'bg-primary-500', 'text-white');
    } else if (stepNum === this.currentStep()) {
      // 當前步驟
      classes.push('border-primary-500', 'bg-white', 'text-primary-500');
    } else {
      // 未完成的步驟
      classes.push('border-gray-300', 'bg-white', 'text-gray-400');
    }

    return classes.join(' ');
  }

  /** 判斷連接線樣式 */
  getConnectorClass(stepNum: number): string {
    const classes = ['mx-2', 'h-0.5', 'w-12'];
    if (stepNum < this.currentStep()) {
      classes.push('bg-primary-500');
    } else {
      classes.push('bg-gray-300');
    }
    return classes.join(' ');
  }
}

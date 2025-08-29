import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GxButton, GxToastService} from '@sanring/gx-ui';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, GxButton],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  private toast = inject(GxToastService);

  successAction = {
    label: 'Success',
    handler: () => this.show('success'),
  };

  show(kind: 'success'|'info'|'warning'|'error') {
    this.toast.show({
      kind,
      title: kind.toUpperCase(),
      message: `This is a ${kind} toast`,
      duration: 3000,
    });
  }

  showLong() {
    this.toast.show({
      kind: 'info',
      title: 'Processing…',
      message: 'This message will stay for 5 seconds',
      duration: 5000,
    });
  }

  showLongWithTicker() {
    this.toast.show({
      kind: 'info',
      title: 'Processing…',
      message: 'This message will stay for',
      duration: 5000,
      countdown: true,
    });
  }

  showCustom() {
    this.toast.show({
      kind: 'success',
      action:{label:'Undo',handler:()=>alert('Undo clicked!')},
      title: 'Saved',
      message: 'Your settings have been updated.',
      // duration: 3000,
    });
  }

}

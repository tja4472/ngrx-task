import { Component, EventEmitter, Output, effect, input } from '@angular/core';

@Component({
  selector: 'app-stepper',

  template: `
    <div>
      <button aria-label="decrement" (click)="decrement()">-</button>
      <span data-cy="counter">{{ count }}</span>
      <button aria-label="increment" (click)="increment()">+</button>
    </div>
  `,
})
export class StepperComponent {
  initalCount = input(0);
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter();

  count = 0;

  constructor() {
    effect(() => {
      this.count = this.initalCount();
    });
  }

  increment(): void {
    this.count++;
    this.change.emit(this.count);
  }

  decrement(): void {
    this.count--;
    this.change.emit(this.count);
  }
}

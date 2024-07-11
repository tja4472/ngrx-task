import { Component, effect, input, output } from '@angular/core';

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

  change = output<number>();

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

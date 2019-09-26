import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TodoCompleted } from '@app/tasks/models';

import { CompletedTaskDetailPresenter } from './completed-task-detail.presenter';

@Component({
  selector: 'app-completed-task-detail',
  templateUrl: './completed-task-detail.component.html',
  styleUrls: ['./completed-task-detail.component.css'],
  viewProviders: [CompletedTaskDetailPresenter],
})
export class CompletedTaskDetailComponent implements OnInit {
  @Input() completedTask: TodoCompleted;
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() remove = new EventEmitter<TodoCompleted>();
  @Output() checkout = new EventEmitter<TodoCompleted>();

  get checkoutForm(): FormGroup {
    return this.presenter.form;
  }

  get isNew(): boolean {
    return this.presenter.isNew;
  }

  constructor(private presenter: CompletedTaskDetailPresenter) {}

  ngOnInit() {
    console.log('ngOnInit>', this.completedTask);
    this.presenter.init(this.completedTask);
  }

  removeClick() {
    console.log('removeClick>', this.completedTask);
    this.remove.emit(this.completedTask);
  }

  onSubmit() {
    console.log('onSubmit>', this.completedTask);
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}

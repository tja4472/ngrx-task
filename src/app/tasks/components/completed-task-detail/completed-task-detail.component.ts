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
  @Output() cancel = new EventEmitter<TodoCompleted>();
  @Output() remove = new EventEmitter<TodoCompleted>();
  @Output() checkout = new EventEmitter<TodoCompleted>();

  get checkoutForm(): FormGroup {
    return this.presenter.form;
  }

  constructor(private presenter: CompletedTaskDetailPresenter) {}

  ngOnInit() {
    this.presenter.init(this.completedTask);
  }

  cancelClick() {
    this.cancel.emit(this.completedTask);
  }

  removeClick() {
    this.remove.emit(this.completedTask);
  }

  onSubmit() {
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}

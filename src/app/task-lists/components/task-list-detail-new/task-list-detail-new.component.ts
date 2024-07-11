import { Component, OnInit, input, output } from '@angular/core';

import { TaskListListItem } from '@app/models/task-list-list-item.model';

import { TaskListDetailNewPresenter } from './task-list-detail-new.presenter';

@Component({
  selector: 'app-task-list-detail-new',
  templateUrl: './task-list-detail-new.component.html',
  styleUrls: ['./task-list-detail-new.component.css'],
  viewProviders: [TaskListDetailNewPresenter],
})
export class TaskListDetailNewComponent implements OnInit {
  completedTask = input.required<TaskListListItem>();
  cancel = output<TaskListListItem>();
  checkout = output<TaskListListItem>();

  get checkoutForm() {
    return this.presenter.form;
  }

  constructor(private presenter: TaskListDetailNewPresenter) {}

  ngOnInit() {
    this.presenter.init(this.completedTask());
  }

  cancelClick() {
    this.cancel.emit(this.completedTask());
  }

  onSubmit() {
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}

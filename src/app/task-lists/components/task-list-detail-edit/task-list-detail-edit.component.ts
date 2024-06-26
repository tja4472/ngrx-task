import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TaskListListItem } from '@app/models/task-list-list-item.model';

import { TaskListDetailEditPresenter } from './task-list-detail-edit.presenter';

@Component({
  selector: 'app-task-list-detail-edit',
  templateUrl: './task-list-detail-edit.component.html',
  styleUrls: ['./task-list-detail-edit.component.css'],
  viewProviders: [TaskListDetailEditPresenter],
})
export class TaskListDetailEditComponent implements OnInit {
  @Input() completedTask!: TaskListListItem;
  @Output() cancel = new EventEmitter<TaskListListItem>();
  @Output() remove = new EventEmitter<TaskListListItem>();
  @Output() checkout = new EventEmitter<TaskListListItem>();

  get checkoutForm() {
    return this.presenter.form;
  }

  get isNew(): boolean {
    return this.presenter.isNew;
  }

  constructor(private presenter: TaskListDetailEditPresenter) {}

  ngOnInit() {
    console.log('ngOnInit>', this.completedTask);
    this.presenter.init(this.completedTask);
  }

  cancelClick() {
    this.cancel.emit(this.completedTask);
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TodoListsItem } from '@app/tasks/models';

import { TaskListDetailPresenter } from './task-list-detail.presenter';

@Component({
  selector: 'app-task-list-detail',
  templateUrl: './task-list-detail.component.html',
  styleUrls: ['./task-list-detail.component.css'],
  viewProviders: [TaskListDetailPresenter],
})
export class TaskListDetailComponent implements OnInit {
  @Input() completedTask: TodoListsItem;
  @Output() cancel = new EventEmitter<TodoListsItem>();
  @Output() remove = new EventEmitter<TodoListsItem>();
  @Output() checkout = new EventEmitter<TodoListsItem>();

  get checkoutForm(): FormGroup {
    return this.presenter.form;
  }

  get isNew(): boolean {
    return this.presenter.isNew;
  }

  constructor(private presenter: TaskListDetailPresenter) {}

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

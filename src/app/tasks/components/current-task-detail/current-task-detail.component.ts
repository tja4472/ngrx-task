import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Todo } from '@app/tasks/models';

import { CurrentTaskDetailPresenter } from './current-task-detail.presenter';

@Component({
  selector: 'app-current-task-detail',
  templateUrl: './current-task-detail.component.html',
  styleUrls: ['./current-task-detail.component.css'],
  viewProviders: [CurrentTaskDetailPresenter],
})
export class CurrentTaskDetailComponent implements OnInit {
  @Input() todo: Todo;
  @Output() cancel = new EventEmitter<Todo>();
  @Output() remove = new EventEmitter<Todo>();
  @Output() checkout = new EventEmitter<Todo>();

  get checkoutForm(): FormGroup {
    return this.presenter.form;
  }

  get isNew(): boolean {
    return this.presenter.isNew;
  }

  constructor(private presenter: CurrentTaskDetailPresenter) {}

  ngOnInit() {
    console.log('ngOnInit>', this.todo);
    this.presenter.init(this.todo);
  }

  cancelClick() {
    this.cancel.emit(this.todo);
  }

  removeClick() {
    this.remove.emit(this.todo);
  }

  onSubmit() {
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}

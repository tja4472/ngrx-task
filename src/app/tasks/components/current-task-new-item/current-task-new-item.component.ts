import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CurrentTask } from '@app/tasks/models';

import { CurrentTaskNewItemPresenter } from './current-task-new-item.presenter';

@Component({
  selector: 'app-current-task-new-item',
  templateUrl: './current-task-new-item.component.html',
  styleUrls: ['./current-task-new-item.component.css'],
  viewProviders: [CurrentTaskNewItemPresenter],
})
export class CurrentTaskNewItemComponent implements OnInit {
  @Input() todo: CurrentTask;

  @Output() cancel = new EventEmitter<CurrentTask>();
  @Output() checkout = new EventEmitter<CurrentTask>();

  get checkoutForm(): FormGroup {
    return this.presenter.form;
  }

  constructor(private presenter: CurrentTaskNewItemPresenter) {}

  ngOnInit() {
    this.presenter.init(this.todo);
  }

  cancelClick() {
    this.cancel.emit(this.todo);
  }

  onSubmit() {
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}

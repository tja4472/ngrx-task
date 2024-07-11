import { Component, OnInit, input, output } from '@angular/core';

import { CurrentTask } from '@app/root-store/tasks-store/models/current-task.model';

import { CurrentTaskDetailEditPresenter } from './current-task-detail-edit.presenter';

@Component({
  selector: 'app-current-task-detail-edit',
  templateUrl: './current-task-detail-edit.component.html',
  styleUrls: ['./current-task-detail-edit.component.css'],
  viewProviders: [CurrentTaskDetailEditPresenter],
})
export class CurrentTaskDetailEditComponent implements OnInit {
  todo = input.required<CurrentTask>();
  cancel = output<CurrentTask>();
  remove = output<CurrentTask>();
  checkout = output<CurrentTask>();

  get checkoutForm() {
    return this.presenter.form;
  }

  constructor(private presenter: CurrentTaskDetailEditPresenter) {}

  ngOnInit() {
    this.presenter.init(this.todo());
  }

  cancelClick() {
    this.cancel.emit(this.todo());
  }

  removeClick() {
    this.remove.emit(this.todo());
  }

  onSubmit() {
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}

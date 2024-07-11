import { Component, OnInit, input, output } from '@angular/core';

import { CurrentTask } from '@app/root-store/tasks-store/models/current-task.model';

import { CurrentTaskDetailNewPresenter } from './current-task-detail-new.presenter';

@Component({
  selector: 'app-current-task-detail-new',
  templateUrl: './current-task-detail-new.component.html',
  styleUrls: ['./current-task-detail-new.component.css'],
  viewProviders: [CurrentTaskDetailNewPresenter],
})
export class CurrentTaskDetailNewComponent implements OnInit {
  todo = input.required<CurrentTask>();

  cancel = output<CurrentTask>();
  checkout = output<CurrentTask>();

  get checkoutForm() {
    return this.presenter.form;
  }

  constructor(private presenter: CurrentTaskDetailNewPresenter) {}

  ngOnInit() {
    this.presenter.init(this.todo());
  }

  cancelClick() {
    this.cancel.emit(this.todo());
  }

  onSubmit() {
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}

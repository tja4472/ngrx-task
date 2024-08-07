import { Component, OnInit, input, output } from '@angular/core';

import { CompletedTask } from '@app/root-store/tasks-store/models/completed-task.model';

import { CompletedTaskDetailEditPresenter } from './completed-task-detail-edit.presenter';

@Component({
  selector: 'app-completed-task-detail-edit',
  templateUrl: './completed-task-detail-edit.component.html',
  styleUrls: ['./completed-task-detail-edit.component.css'],
  viewProviders: [CompletedTaskDetailEditPresenter],
})
export class CompletedTaskDetailEditComponent implements OnInit {
  completedTask = input.required<CompletedTask>();
  cancel = output<CompletedTask>();
  remove = output<CompletedTask>();
  checkout = output<CompletedTask>();

  get checkoutForm() {
    return this.presenter.form;
  }

  get isSubmitButtonDisabled(): boolean {
    return this.presenter.isSubmitButtonDisabled;
  }

  constructor(private presenter: CompletedTaskDetailEditPresenter) {}

  ngOnInit() {
    this.presenter.init(this.completedTask());
  }

  cancelClick() {
    this.cancel.emit(this.completedTask());
  }

  removeClick() {
    this.remove.emit(this.completedTask());
  }

  onSubmit() {
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}

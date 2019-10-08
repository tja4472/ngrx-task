import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CompletedTask } from '@app/tasks/models';

import { CompletedTaskDetailEditPresenter } from './completed-task-detail-edit.presenter';

@Component({
  selector: 'app-completed-task-detail-edit',
  templateUrl: './completed-task-detail-edit.component.html',
  styleUrls: ['./completed-task-detail-edit.component.css'],
  viewProviders: [CompletedTaskDetailEditPresenter],
})
export class CompletedTaskDetailEditComponent implements OnInit {
  @Input() completedTask: CompletedTask;
  @Output() cancel = new EventEmitter<CompletedTask>();
  @Output() remove = new EventEmitter<CompletedTask>();
  @Output() checkout = new EventEmitter<CompletedTask>();

  get checkoutForm(): FormGroup {
    return this.presenter.form;
  }

  constructor(private presenter: CompletedTaskDetailEditPresenter) {}

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

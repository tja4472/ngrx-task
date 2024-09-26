import { Component, OnInit, input, output } from '@angular/core';

import { CurrentTask } from '@app/root-store/tasks-store/models/current-task.model';

import { CurrentTaskDetailEditPresenter } from './current-task-detail-edit.presenter';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-current-task-detail-edit',
  templateUrl: './current-task-detail-edit.component.html',
  styleUrls: ['./current-task-detail-edit.component.css'],
  viewProviders: [CurrentTaskDetailEditPresenter],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardActions,
    MatButton,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCheckbox,
    MatFormField,
    MatInput,
    NgIf,
    MatError,
    CdkTextareaAutosize,
  ],
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

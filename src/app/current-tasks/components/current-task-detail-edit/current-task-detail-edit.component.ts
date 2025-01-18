import { Component, OnInit, input, output, inject } from '@angular/core';

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

import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-current-task-detail-edit',
  templateUrl: './current-task-detail-edit.component.html',
  styleUrls: ['./current-task-detail-edit.component.css'],
  viewProviders: [CurrentTaskDetailEditPresenter],
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
    MatError,
    CdkTextareaAutosize,
  ],
})
export class CurrentTaskDetailEditComponent implements OnInit {
  private presenter = inject(CurrentTaskDetailEditPresenter);

  todo = input.required<CurrentTask>();
  cancelClicked = output<CurrentTask>();
  remove = output<CurrentTask>();
  checkout = output<CurrentTask>();

  get checkoutForm() {
    return this.presenter.form;
  }

  ngOnInit() {
    this.presenter.init(this.todo());
  }

  cancelClick() {
    this.cancelClicked.emit(this.todo());
  }

  removeClick() {
    this.remove.emit(this.todo());
  }

  onSubmit() {
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}

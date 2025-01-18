import { Component, OnInit, input, output, inject } from '@angular/core';

import { CompletedTask } from '@app/root-store/tasks-store/models/completed-task.model';

import { CompletedTaskDetailEditPresenter } from './completed-task-detail-edit.presenter';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-completed-task-detail-edit',
  templateUrl: './completed-task-detail-edit.component.html',
  styleUrls: ['./completed-task-detail-edit.component.css'],
  viewProviders: [CompletedTaskDetailEditPresenter],
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardActions,
    MatButton,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatInput,
    MatError,
    CdkTextareaAutosize,
  ],
})
export class CompletedTaskDetailEditComponent implements OnInit {
  private presenter = inject(CompletedTaskDetailEditPresenter);

  completedTask = input.required<CompletedTask>();
  cancelA = output<CompletedTask>();
  remove = output<CompletedTask>();
  checkout = output<CompletedTask>();

  get checkoutForm() {
    return this.presenter.form;
  }

  get isSubmitButtonDisabled(): boolean {
    return this.presenter.isSubmitButtonDisabled;
  }

  ngOnInit() {
    this.presenter.init(this.completedTask());
  }

  cancelClick() {
    this.cancelA.emit(this.completedTask());
  }

  removeClick() {
    this.remove.emit(this.completedTask());
  }

  onSubmit() {
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}

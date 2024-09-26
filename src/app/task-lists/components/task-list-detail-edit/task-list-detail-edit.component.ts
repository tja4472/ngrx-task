import { Component, OnInit, input, output } from '@angular/core';

import { TaskListListItem } from '@app/models/task-list-list-item.model';

import { TaskListDetailEditPresenter } from './task-list-detail-edit.presenter';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-task-list-detail-edit',
  templateUrl: './task-list-detail-edit.component.html',
  styleUrls: ['./task-list-detail-edit.component.css'],
  viewProviders: [TaskListDetailEditPresenter],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatInput,
    NgIf,
    MatError,
    MatCardActions,
    MatButton,
  ],
})
export class TaskListDetailEditComponent implements OnInit {
  completedTask = input.required<TaskListListItem>();
  cancel = output<TaskListListItem>();
  remove = output<TaskListListItem>();
  checkout = output<TaskListListItem>();

  get checkoutForm() {
    return this.presenter.form;
  }

  get isNew(): boolean {
    return this.presenter.isNew;
  }

  constructor(private presenter: TaskListDetailEditPresenter) {}

  ngOnInit() {
    console.log('ngOnInit>', this.completedTask());
    this.presenter.init(this.completedTask());
  }

  cancelClick() {
    this.cancel.emit(this.completedTask());
  }

  removeClick() {
    console.log('removeClick>', this.completedTask());
    this.remove.emit(this.completedTask());
  }

  onSubmit() {
    console.log('onSubmit>', this.completedTask());
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}

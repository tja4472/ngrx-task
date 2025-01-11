import { Component, OnInit, input, output, inject } from '@angular/core';

import { TaskListListItem } from '@app/models/task-list-list-item.model';

import { TaskListDetailNewPresenter } from './task-list-detail-new.presenter';
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

@Component({
  selector: 'app-task-list-detail-new',
  templateUrl: './task-list-detail-new.component.html',
  styleUrls: ['./task-list-detail-new.component.css'],
  viewProviders: [TaskListDetailNewPresenter],
  standalone: true,
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
  ],
})
export class TaskListDetailNewComponent implements OnInit {
  private presenter = inject(TaskListDetailNewPresenter);

  completedTask = input.required<TaskListListItem>();
  cancelClicked = output<TaskListListItem>();
  checkout = output<TaskListListItem>();

  get checkoutForm() {
    return this.presenter.form;
  }

  ngOnInit() {
    this.presenter.init(this.completedTask());
  }

  cancelClick() {
    this.cancelClicked.emit(this.completedTask());
  }

  onSubmit() {
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}

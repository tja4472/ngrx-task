import { Component, OnInit, input, output } from '@angular/core';

import { CurrentTask } from '@app/root-store/tasks-store/models/current-task.model';

import { CurrentTaskDetailNewPresenter } from './current-task-detail-new.presenter';
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
  selector: 'app-current-task-detail-new',
  templateUrl: './current-task-detail-new.component.html',
  styleUrls: ['./current-task-detail-new.component.css'],
  viewProviders: [CurrentTaskDetailNewPresenter],
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
    MatError,
    CdkTextareaAutosize,
  ],
})
export class CurrentTaskDetailNewComponent implements OnInit {
  todo = input.required<CurrentTask>();

  cancelClicked = output<CurrentTask>();
  checkout = output<CurrentTask>();

  get checkoutForm() {
    return this.presenter.form;
  }

  constructor(private presenter: CurrentTaskDetailNewPresenter) {}

  ngOnInit() {
    this.presenter.init(this.todo());
  }

  cancelClick() {
    this.cancelClicked.emit(this.todo());
  }

  onSubmit() {
    const todoData = this.presenter.checkout();
    this.checkout.emit(todoData);
  }
}

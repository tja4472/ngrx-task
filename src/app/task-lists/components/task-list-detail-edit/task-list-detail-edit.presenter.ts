/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { TaskListListItem } from '@app/root-store/tasks-store/models/task-list-list-item.model';

@Injectable()
export class TaskListDetailEditPresenter {
  form = this.fb.group({
    name: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
  });

  initialData!: TaskListListItem;
  isNew!: boolean;

  constructor(private fb: FormBuilder) {}

  init(todo: TaskListListItem) {
    this.isNew = todo.id === '';

    this.initialData = { ...todo };

    this.form.setValue({
      name: this.initialData.name,
    });
  }

  checkout(): TaskListListItem {
    const todoData: TaskListListItem = {
      ...this.initialData,
      ...this.form.value,
    };
    this.form.reset();

    return todoData;
  }
}

/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { TaskListListItem } from '@app/models/task-list-list-item.model';

@Injectable()
export class TaskListDetailEditPresenter {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
  });

  initialData!: TaskListListItem;
  isNew!: boolean;

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

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TodoListsItem } from '@app/tasks/models';

@Injectable()
export class TaskListDetailNewPresenter {
  form: FormGroup;

  initialData: TodoListsItem;

  constructor(private formBuilder: FormBuilder) {}

  init(todo: TodoListsItem) {
    this.initialData = { ...todo };

    this.form = this.formBuilder.group({
      name: [this.initialData.name, Validators.required],
    });
  }

  checkout(): TodoListsItem {
    const todoData: TodoListsItem = { ...this.initialData, ...this.form.value };
    this.form.reset();

    return todoData;
  }
}

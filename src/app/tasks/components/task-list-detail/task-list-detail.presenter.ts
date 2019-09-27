import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TodoListsItem } from '@app/tasks/models';

@Injectable()
export class TaskListDetailPresenter {
  form: FormGroup;

  initialData: TodoListsItem;
  isNew: boolean;

  constructor(private formBuilder: FormBuilder) {}

  init(todo: TodoListsItem) {
    this.isNew = todo.id === '';

    this.initialData = { ...todo };

    this.form = this.formBuilder.group({
      name: [this.initialData.name, Validators.required],
    });
  }

  checkout(): TodoListsItem {
    const todoData: TodoListsItem = { ...this.initialData, ...this.form.value };
    this.form.reset();
    //    console.log('initialData>', this.initialData);
    //    console.log('todoData>', todoData);
    return todoData;
  }
}

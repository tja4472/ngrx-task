import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Todo } from '@app/tasks/models';

@Injectable()
export class CurrentTaskDetailPresenter {
  /*
  form = this.formBuilder.group({
    name: '',
    description: '',
  });
  */
  form;

  initialData: Todo;

  constructor(private formBuilder: FormBuilder) {}

  init(todo: Todo) {
    this.initialData = { ...todo };
    this.form = this.formBuilder.group({
      name: [this.initialData.name],
      description: [this.initialData.description],
    });
  }

  checkout(): Todo {
    const todoData: Todo = { ...this.initialData, ...this.form.value };
    this.form.reset();
    console.log('initialData>', this.initialData);
    console.log('todoData>', todoData);
    return todoData;
  }
}

import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { newTodo, Todo } from '@app/tasks/models';

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
    if (!!!todo) {
      // todo undefined - new item.
      this.initialData = newTodo();
    } else {
      this.initialData = { ...todo };
    }

    this.form = this.formBuilder.group({
      name: [this.initialData.name, Validators.required],
      description: [this.initialData.description],
      isComplete: [this.initialData.isComplete],
    });
  }

  checkout(): Todo {
    const todoData: Todo = { ...this.initialData, ...this.form.value };
    this.form.reset();
    //    console.log('initialData>', this.initialData);
    //    console.log('todoData>', todoData);
    return todoData;
  }
}

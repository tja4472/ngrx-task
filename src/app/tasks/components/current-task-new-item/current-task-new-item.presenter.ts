import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Todo } from '@app/tasks/models';

@Injectable()
export class CurrentTaskNewItemPresenter {
  form: FormGroup;

  initialData: Todo;

  constructor(private formBuilder: FormBuilder) {}

  init(todo: Todo) {
    this.initialData = { ...todo };

    this.form = this.formBuilder.group({
      name: [this.initialData.name, Validators.required],
      description: [this.initialData.description],
      isComplete: [this.initialData.isComplete],
    });
  }

  checkout(): Todo {
    const todoData: Todo = { ...this.initialData, ...this.form.value };
    this.form.reset();
    return todoData;
  }
}

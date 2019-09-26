import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TodoCompleted } from '@app/tasks/models';

@Injectable()
export class CompletedTaskDetailPresenter {
  form: FormGroup;

  initialData: TodoCompleted;
  isNew: boolean;

  constructor(private formBuilder: FormBuilder) {}

  init(todo: TodoCompleted) {
    this.isNew = todo.id === '';

    this.initialData = { ...todo };

    this.form = this.formBuilder.group({
      name: [this.initialData.name, Validators.required],
      description: [this.initialData.description],
      isComplete: [this.initialData.isComplete],
    });
  }

  checkout(): TodoCompleted {
    const todoData: TodoCompleted = { ...this.initialData, ...this.form.value };
    this.form.reset();
    //    console.log('initialData>', this.initialData);
    //    console.log('todoData>', todoData);
    return todoData;
  }
}

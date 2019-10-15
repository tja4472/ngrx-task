import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CompletedTask } from '@app/root-store/tasks-store/models';

@Injectable()
export class CompletedTaskDetailEditPresenter {
  form: FormGroup;

  initialData: CompletedTask;

  constructor(private formBuilder: FormBuilder) {}

  init(todo: CompletedTask) {
    this.initialData = { ...todo };

    this.form = this.formBuilder.group({
      name: [this.initialData.name, Validators.required],
      description: [this.initialData.description],
      isComplete: [this.initialData.isComplete],
    });
  }

  checkout(): CompletedTask {
    const todoData: CompletedTask = { ...this.initialData, ...this.form.value };
    this.form.reset();

    return todoData;
  }
}

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CurrentTask } from '@app/tasks/models';

@Injectable()
export class CurrentTaskDetailEditPresenter {
  form: FormGroup;

  initialData: CurrentTask;

  constructor(private formBuilder: FormBuilder) {}

  init(todo: CurrentTask) {
    this.initialData = { ...todo };

    this.form = this.formBuilder.group({
      name: [this.initialData.name, Validators.required],
      description: [this.initialData.description],
      isComplete: [this.initialData.isComplete],
    });
  }

  checkout(): CurrentTask {
    const todoData: CurrentTask = { ...this.initialData, ...this.form.value };
    this.form.reset();

    return todoData;
  }
}

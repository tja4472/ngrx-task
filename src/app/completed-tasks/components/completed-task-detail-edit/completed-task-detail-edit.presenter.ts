/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CompletedTask } from '@app/root-store/tasks-store/models/completed-task.model';

@Injectable()
export class CompletedTaskDetailEditPresenter {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    description: '',
  });

  public get isSubmitButtonDisabled(): boolean {
    return !(this.form.dirty && this.form.valid);
  }

  initialData!: CompletedTask;

  init(todo: CompletedTask) {
    this.initialData = { ...todo };
    this.form.setValue({
      name: this.initialData.name,
      description: this.initialData.description,
    });
  }

  checkout(): CompletedTask {
    const todoData: CompletedTask = {
      ...this.initialData,
      ...this.form.value,
    };
    this.form.reset();

    return todoData;
  }
}

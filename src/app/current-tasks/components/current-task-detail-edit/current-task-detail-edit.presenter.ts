import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  CurrentTask,
  getCompletedTimestamp,
} from '@app/root-store/tasks-store/models';

@Injectable()
export class CurrentTaskDetailEditPresenter implements OnDestroy {
  form = this.fb.group({
    name: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    description: '',
    isComplete: this.fb.nonNullable.control(false),
    completedTimestamp: 0,
  });

  initialData!: CurrentTask;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private fb: FormBuilder) {}

  init(todo: CurrentTask) {
    this.initialData = { ...todo };
    this.form.setValue({
      name: this.initialData.name,
      description: this.initialData.description,
      isComplete: this.initialData.isComplete,
      completedTimestamp: this.initialData.completedTimestamp,
    });

    this.form.controls.isComplete.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value: boolean) => {
        console.log('value changes>', value);
        this.form.controls.completedTimestamp.setValue(
          getCompletedTimestamp(value)
        );
      });
  }

  checkout(): CurrentTask {
    const todoData: CurrentTask = {
      ...this.initialData,
      ...this.form.value,
    };
    this.form.reset();

    return todoData;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

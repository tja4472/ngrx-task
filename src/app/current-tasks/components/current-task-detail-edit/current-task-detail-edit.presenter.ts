import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  CurrentTask,
  getCompletedTimestamp,
} from '@app/root-store/tasks-store/models';

@Injectable()
export class CurrentTaskDetailEditPresenter implements OnDestroy {
  form: FormGroup;

  initialData: CurrentTask;

  get completedTimestampControl() {
    return this.form.get('completedTimestamp');
  }
  get isCompleteControl() {
    return this.form.get('isComplete');
  }

  private unsubscribe: Subject<void> = new Subject();

  constructor(private formBuilder: FormBuilder) {}

  init(todo: CurrentTask) {
    this.initialData = { ...todo };

    this.form = this.formBuilder.group({
      name: [this.initialData.name, Validators.required],
      description: [this.initialData.description],
      isComplete: [this.initialData.isComplete],
      completedTimestamp: [this.initialData.completedTimestamp],
    });

    this.isCompleteControl.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value: boolean) => {
        this.completedTimestampControl.setValue(getCompletedTimestamp(value));
      });
  }

  checkout(): CurrentTask {
    const todoData: CurrentTask = { ...this.initialData, ...this.form.value };
    this.form.reset();

    return todoData;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatLegacyCheckboxChange as MatCheckboxChange,
  MatLegacyCheckboxDefaultOptions as MatCheckboxDefaultOptions,
  MAT_LEGACY_CHECKBOX_DEFAULT_OPTIONS as MAT_CHECKBOX_DEFAULT_OPTIONS,
} from '@angular/material/legacy-checkbox';

import { pathPrefix, routeNames } from '@app/app-route-names';
import { CurrentTask } from '@app/root-store/tasks-store/models';

@Component({
  selector: 'app-current-task-list',
  templateUrl: './current-task-list.component.html',
  styleUrls: ['./current-task-list.component.css'],
  providers: [
    {
      provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions      
      useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions,
    },
  ],
})
export class CurrentTaskListComponent {
  @Input()
  currentTasks: CurrentTask[];

  @Output() reorderItems = new EventEmitter<string[]>();
  @Output() newCurrentTask = new EventEmitter<void>();
  @Output() toggleCompleteItem = new EventEmitter<CurrentTask>();

  constructor() {}

  /*
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
  */
  viewTrackBy(index: number, item: CurrentTask) {
    return item.id;
  }

  drop(event: CdkDragDrop<CurrentTask[]>) {
    // console.log({ event });
    console.log('currentIndex', event.currentIndex);
    console.log('previousIndex', event.previousIndex);

    // const aaa = this.currentTasks.map((book) => book);
    const aaa = [...this.currentTasks];
    moveItemInArray(aaa, event.previousIndex, event.currentIndex);

    const bbb = aaa.map((book) => book.id);
    // const bbb = aaa.map((book) => ({ index: book.index, id: book.id}));

    console.log('aaa', aaa);
    console.log('bbb', bbb);

    bbb.forEach((t, i) => {
      console.log('X:', t, i);
    });

    this.reorderItems.emit(bbb);
  }

  editPath() {
    return (
      pathPrefix +
      routeNames.currentTasks.path +
      pathPrefix +
      routeNames.currentTasks.edit.path
    );
  }
  /*
  onCompleteChange(toDo: Todo, change: MatCheckboxChange) {
    this.toDoChange.emit({
      ...toDo,
      // complete: change.checked
      isComplete: change.checked,
    });
  }
  */
  onCheckboxClick(task: CurrentTask): void {
    this.toggleCompleteItem.emit(task);
  }
}

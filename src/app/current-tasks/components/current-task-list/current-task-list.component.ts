/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDropList,
  CdkDrag,
  CdkDragHandle,
} from '@angular/cdk/drag-drop';
import { Component, input, output } from '@angular/core';
import {
  MatCheckboxDefaultOptions,
  MAT_CHECKBOX_DEFAULT_OPTIONS,
  MatCheckbox,
} from '@angular/material/checkbox';

import { pathPrefix, routeNames } from '@app/app-route-names';
import { CurrentTask } from '@app/root-store/tasks-store/models/current-task.model';
import { NgFor, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';

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
  standalone: true,
  imports: [
    CdkDropList,
    NgFor,
    CdkDrag,
    MatCheckbox,
    RouterLink,
    NgClass,
    CdkDragHandle,
    MatIcon,
    MatFabButton,
  ],
})
export class CurrentTaskListComponent {
  currentTasks = input.required<CurrentTask[]>();

  reorderItems = output<string[]>();
  newCurrentTask = output();
  toggleCompleteItem = output<CurrentTask>();

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
    const aaa = [...this.currentTasks()];
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

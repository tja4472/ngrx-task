import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { TodoListsItem } from '@app/tasks/models';

@Component({
  selector: 'app-task-list-list',
  templateUrl: './task-list-list.component.html',
  styleUrls: ['./task-list-list.component.css'],
})
export class TaskListListComponent implements OnInit {
  @Input()
  currentTasks: TodoListsItem[];

  @Output() toggleCompleteItem = new EventEmitter<TodoListsItem>();

  constructor() {}

  ngOnInit() {}

  /*
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
  */

  drop(event: CdkDragDrop<TodoListsItem[]>) {
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

    // this.reorderItems.emit(bbb);
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
}

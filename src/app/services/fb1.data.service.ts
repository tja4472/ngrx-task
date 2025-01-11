/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable, inject } from '@angular/core';

import {
  CurrentTask,
  newCurrentTask,
} from '../root-store/tasks-store/models/current-task.model';

import {
  CompletedTask,
  newCompletedTask,
} from '../root-store/tasks-store/models/completed-task.model';

import { CompletedTaskDataService } from './completed-task.data.service';
import { CurrentTaskDataService } from './current-task.data.service';

@Injectable({
  providedIn: 'root',
})
export class Fb1DataService {
  private todoCompletedDataService = inject(CompletedTaskDataService);
  private todoDataService = inject(CurrentTaskDataService);

  clearCompletedTodos(
    items: CurrentTask[],
    todoListId: string,
    userId: string
  ) {
    //
    items.map((x: CurrentTask) => {
      if (x.completedTimestamp === null) {
        throw new Error('completedTimestamp is null');
      }
      const todoCompleted: CompletedTask = {
        ...newCompletedTask(),
        description: x.description,
        name: x.name,
        completedTimestamp: x.completedTimestamp,
      };

      this.todoCompletedDataService.save(todoCompleted, todoListId, userId);
      this.todoDataService.removeItem(x.id, todoListId, userId);
    });
  }

  public moveToCurrent(
    item: CompletedTask,
    todoListId: string,
    userId: string
  ): void {
    console.log('moveToCurrent>', item);

    const todo: CurrentTask = {
      ...newCurrentTask(),
      description: item.description,
      id: item.id,
      name: item.name,
    };

    this.todoDataService.save(todo, todoListId, userId);

    if (item.id === undefined) {
      return;
    }
    this.todoCompletedDataService.removeItem(item.id, todoListId, userId);
  }
}

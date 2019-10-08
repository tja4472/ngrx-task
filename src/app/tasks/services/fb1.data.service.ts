import { Injectable } from '@angular/core';

import {
  CompletedTask,
  CurrentTask,
  newCompletedTask,
  newCurrentTask,
} from '../models';

import { CurrentTaskDataService } from './current-task.data.service';
import { TodoCompletedDataService } from './todo-completed.data.service';

@Injectable({
  providedIn: 'root',
})
export class Fb1DataService {
  constructor(
    private todoCompletedDataService: TodoCompletedDataService,
    private todoDataService: CurrentTaskDataService
  ) {}

  clearCompletedTodos(
    items: CurrentTask[],
    todoListId: string,
    userId: string
  ) {
    //
    items.map((x: CurrentTask) => {
      const todoCompleted = {
        ...newCompletedTask(),
        description: x.description,
        name: x.name,
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
      // tslint:disable-next-line: no-non-null-assertion
      id: item.id!,
      name: item.name,
    };

    this.todoDataService.save(todo, todoListId, userId);

    if (item.id === undefined) {
      return;
    }
    this.todoCompletedDataService.removeItem(item.id, todoListId, userId);
  }
}

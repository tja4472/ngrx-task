import { Injectable } from '@angular/core';

import {
  CurrentTask,
  newCurrentTask,
  newTodoCompleted,
  TodoCompleted,
} from '../models';

import { TodoCompletedDataService } from './todo-completed.data.service';
import { TodoDataService } from './todo.data.service';

@Injectable({
  providedIn: 'root',
})
export class Fb1DataService {
  constructor(
    private todoCompletedDataService: TodoCompletedDataService,
    private todoDataService: TodoDataService
  ) {}

  clearCompletedTodos(
    items: CurrentTask[],
    todoListId: string,
    userId: string
  ) {
    //
    items.map((x: CurrentTask) => {
      const todoCompleted = {
        ...newTodoCompleted(),
        description: x.description,
        name: x.name,
      };

      this.todoCompletedDataService.save(todoCompleted, todoListId, userId);
      this.todoDataService.removeItem(x.id, todoListId, userId);
    });
  }

  public moveToCurrent(
    item: TodoCompleted,
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

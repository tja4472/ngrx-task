/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Component, input, output } from '@angular/core';

import { pathPrefix, routeNames } from '@app/app-route-names';
import { TaskListListItem } from '@app/models/task-list-list-item.model';

@Component({
  selector: 'app-task-list-list',
  templateUrl: './task-list-list.component.html',
  styleUrls: ['./task-list-list.component.css'],
})
export class TaskListListComponent {
  currentTasks = input<TaskListListItem[]>([]);

  newCurrentTask = output();

  constructor() {}

  editPath() {
    return (
      pathPrefix +
      routeNames.taskLists.path +
      pathPrefix +
      routeNames.taskLists.edit.path
    );
  }
}

/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { pathPrefix, routeNames } from '@app/app-route-names';
import { CompletedTask } from '@app/root-store/tasks-store/models/completed-task.model';

import { format } from 'date-fns';

interface GroupTasksByDate {
  header: string;
  tasks: CompletedTask[];
}

@Component({
  selector: 'app-completed-task-list',
  templateUrl: './completed-task-list.component.html',
  styleUrls: ['./completed-task-list.component.css'],
})
export class CompletedTaskListComponent {
  private inputCurrentTasks!: CompletedTask[];

  @Input()
  set currentTasks(tasks: CompletedTask[]) {
    this.inputCurrentTasks = tasks;

    this.viewGroupByDateArray = this.convertToGroupByDateArray(tasks);
  }

  get currentTasks(): CompletedTask[] {
    return this.inputCurrentTasks;
  }

  @Output() toggleCompleteItem = new EventEmitter<CompletedTask>();

  viewGroupByDateArray: GroupTasksByDate[] = [];

  constructor() {}

  private convertToGroupByDateArray(
    tasks: CompletedTask[]
  ): GroupTasksByDate[] {
    // sort by descending completedTimestamp
    const sorted = tasks.sort((a, b) => {
      if (a.completedTimestamp > b.completedTimestamp) {
        return -1;
      }

      if (a.completedTimestamp < b.completedTimestamp) {
        return 1;
      }

      return 0;
    });

    const result: GroupTasksByDate[] = [];

    let header = '';
    let groupTasks: CompletedTask[] = [];

    sorted.forEach((value) => {
      const dateText = format(value.completedTimestamp, 'E, d MMM yyyy');
      // const dateText = moment(value.updatedTimestamp).format('ddd, D MMM YYYY');

      if (dateText === header) {
        groupTasks.push(value);
      } else {
        header = dateText;
        groupTasks = [{ ...value }];
        result.push({ header, tasks: groupTasks });
      }
    });

    return result;
  }

  viewTrackBy(index: number, item: CompletedTask) {
    return item.id;
  }

  editPath() {
    return (
      pathPrefix +
      routeNames.completedTasks.path +
      pathPrefix +
      routeNames.completedTasks.edit.path
    );
  }
}

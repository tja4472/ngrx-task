/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  input,
  output,
} from '@angular/core';

import { pathPrefix, routeNames } from '@app/app-route-names';
import { CompletedTask } from '@app/root-store/tasks-store/models/completed-task.model';

import { format } from 'date-fns';
import { MatList, MatListItem } from '@angular/material/list';
import { NgFor } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { MatDivider } from '@angular/material/divider';

interface GroupTasksByDate {
  header: string;
  tasks: CompletedTask[];
}

@Component({
  selector: 'app-completed-task-list',
  templateUrl: './completed-task-list.component.html',
  styleUrls: ['./completed-task-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatList, NgFor, MatListItem, MatCheckbox, RouterLink, MatDivider],
})
export class CompletedTaskListComponent {
  private inputCurrentTasks!: CompletedTask[];

  currentTasks = input.required<CompletedTask[]>();

  toggleCompleteItem = output<CompletedTask>();

  viewGroupByDateArray: GroupTasksByDate[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      this.inputCurrentTasks = this.currentTasks();
      this.viewGroupByDateArray = this.convertToGroupByDateArray(
        this.inputCurrentTasks
      );
      this.cdr.markForCheck();
    });
  }

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

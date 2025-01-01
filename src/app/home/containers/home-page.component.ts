import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import * as HomePageActions from '../actions/home-page.actions';
import { UserInfoStore } from '@app/signals/user-info.store';
import { CurrentTaskStore } from '@app/signals/current-task.store';
import { AuthStore } from '@app/signals/auth.store';
import { JsonPipe } from '@angular/common';
import { CompletedTaskStore } from '@app/signals/completed-task.store';
import { TaskListStore } from '@app/signals/task-list.store';

@Component({
  selector: 'app-home-page',
  template: `
    Home Page - Latest

    <button data-test="sign-out-button" (click)="viewSignOutClicked()">
      Sign Out
    </button>
    <div>authStore.email> {{ authStore.$email() }}</div>
    <div>authStore.userId> {{ authStore.$userId() }}</div>
    <div>authStore.status> {{ authStore.$status() }}</div>
    <div>userInfoStore.todoListId> {{ userInfoStore.$todoListId() }}</div>
    <div>
      completedTaskStore.$isLoaded> {{ completedTaskStore.$isLoaded() }}
    </div>
    <div>
      completedTaskStore.tasks count>
      {{ completedTaskStore.$completedTasks().length }}
    </div>
    <div>
      completedTaskStore.tasks>
      {{ completedTaskStore.$completedTasks() | json }}
    </div>
    <div>currentTaskStore.$isLoaded> {{ currentTaskStore.$isLoaded() }}</div>
    <div>
      currentTaskStore.tasks count>
      {{ currentTaskStore.$currentTasks().length }}
    </div>
    <div>
      currentTaskStore.tasks> {{ currentTaskStore.$currentTasks() | json }}
    </div>
    <div>taskListStore.$isLoaded> {{ taskListStore.$isLoaded() }}</div>
    <div>
      taskListStore.tasks count>
      {{ taskListStore.$taskLists().length }}
    </div>
    <div>taskListStore.tasks> {{ taskListStore.$taskLists() | json }}</div>
  `,
  styles: [],
  standalone: true,
  imports: [JsonPipe],
})
export class HomePageComponent {
  readonly authStore = inject(AuthStore);
  readonly userInfoStore = inject(UserInfoStore);
  readonly completedTaskStore = inject(CompletedTaskStore);
  readonly currentTaskStore = inject(CurrentTaskStore);
  readonly taskListStore = inject(TaskListStore);

  constructor(private readonly store: Store) {}

  viewSignOutClicked() {
    this.store.dispatch(HomePageActions.signOut());
  }
}

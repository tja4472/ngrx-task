import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import * as HomePageActions from '../actions/home-page.actions';
import { UserInfoStore } from '@app/signals/user-info.store';
import { CurrentTaskStore } from '@app/signals/current-task.store';
import { AuthStore } from '@app/signals/auth.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  template: `
    Home Page - Latest

    <button data-test="sign-out-button" (click)="viewSignOutClicked()">
      Sign Out
    </button>
    <div>authStore.email> {{ authStore.email() }}</div>
    <div>authStore.userId> {{ authStore.$userId() }}</div>
    <div>userInfoStore.todoListId> {{ userInfoStore.$todoListId() }}</div>
    <div>
      currentTaskStore.task count> {{ currentTaskStore.currentTasks().length }}
    </div>
    <div>
      currentTaskStore.tasks> {{ currentTaskStore.currentTasks() | json }}
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [JsonPipe],
})
export class HomePageComponent {
  readonly authStore = inject(AuthStore);
  readonly userInfoStore = inject(UserInfoStore);
  readonly currentTaskStore = inject(CurrentTaskStore);

  constructor(private readonly store: Store) {}

  viewSignOutClicked() {
    this.store.dispatch(HomePageActions.signOut());
  }
}

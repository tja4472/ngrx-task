import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { UserInfoStore } from '@app/signals/user-info.store';
import { CurrentTaskStore } from '@app/signals/current-task.store';
import { AuthStore } from '@app/signals/auth.store';
import { CompletedTaskStore } from '@app/signals/completed-task.store';
import { TaskListStore } from '@app/signals/task-list.store';

@Component({
  selector: 'app-signals-page',
  imports: [JsonPipe],
  template: `<p>signals-page works!</p>
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
    <div>taskListStore.tasks> {{ taskListStore.$taskLists() | json }}</div> `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsPageComponent {
  //
  readonly authStore = inject(AuthStore);
  readonly userInfoStore = inject(UserInfoStore);
  readonly completedTaskStore = inject(CompletedTaskStore);
  readonly currentTaskStore = inject(CurrentTaskStore);
  readonly taskListStore = inject(TaskListStore);
}

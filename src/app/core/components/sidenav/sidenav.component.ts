import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { UserModel } from '@app/auth/models/user.model';
import * as FromAuthSelector from '@app/auth/selectors/auth.selectors';
import { TaskSelectors } from '@app/tasks/selectors';

// import { TodoListsItem } from '@app/tasks/models';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  user$: Observable<UserModel>;
  selected = 'Cn7vwq2PCR6uj2u5nw3d';
  taskLists$;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<any>
  ) {
    this.user$ = this.store.select(FromAuthSelector.authQuery.selectAuthUser);
    this.taskLists$ = store.pipe(select(TaskSelectors.getAllTaskLists));
  }

  public viewtodoListsSelectChange(todoListId: any): void {
    console.log('todoListId>', todoListId);
    // this.userService.SetTodoListId(todoListId);
  }
}

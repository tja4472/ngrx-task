import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map, shareReplay, withLatestFrom } from 'rxjs/operators';

import { User } from '@app/models';
import { TaskListSelectors } from '@app/root-store/tasks-store/selectors';
import {
  UserStoreActions,
  UserStoreSelectors,
} from '@app/root-store/user-store';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  @ViewChild('drawer', { static: true }) drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  user$: Observable<User>;
  selected = 'Cn7vwq2PCR6uj2u5nw3d';
  taskLists$;

  constructor(
    private breakpointObserver: BreakpointObserver,
    router: Router,
    private store: Store<any>
  ) {
    this.user$ = this.store.select(UserStoreSelectors.selectUser);
    this.taskLists$ = store.pipe(select(TaskListSelectors.selectAll));

    // Close sidenav on a handset device after route click.
    router.events
      .pipe(
        withLatestFrom(this.isHandset$),
        filter(([a, b]) => b && a instanceof NavigationEnd)
      )
      .subscribe((_) => this.drawer.close());
  }

  public viewtodoListsSelectChange(todoListId: any): void {
    // console.log('todoListId>', todoListId.value);
    // this.userService.SetTodoListId(todoListId);
    this.store.dispatch(
      UserStoreActions.setTaskListId({ taskListId: todoListId.value })
    );
  }
}

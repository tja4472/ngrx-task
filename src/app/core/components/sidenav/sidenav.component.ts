import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map, shareReplay, withLatestFrom } from 'rxjs/operators';

import { AuthApiActions } from '@app/auth/actions';
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
  @ViewChild('drawer', { static: true }) drawer: MatSidenav;

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
    router: Router,
    private store: Store<any>
  ) {
    this.user$ = this.store.select(FromAuthSelector.authQuery.selectAuthUser);
    this.taskLists$ = store.pipe(select(TaskSelectors.getAllTaskLists));

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
      AuthApiActions.setUserListId({ listId: todoListId.value })
    );
  }
}

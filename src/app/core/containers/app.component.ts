import { ChangeDetectionStrategy, Component } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

/*
import { AuthActions } from '@example-app/auth/actions';
import * as fromAuth from '@example-app/auth/reducers';
import { LayoutActions } from '@example-app/core/actions';

*/
import * as fromRoot from '@app/reducers';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-sidenav></app-sidenav>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    // this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
    // this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromRoot from '@app/reducers';

/*
import { AuthActions } from '@example-app/auth/actions';
import * as fromAuth from '@example-app/auth/reducers';
import { LayoutActions } from '@example-app/core/actions';

*/

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-sidenav></app-sidenav>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    private swUpdate: SwUpdate
  ) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    // this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
    // this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }
}

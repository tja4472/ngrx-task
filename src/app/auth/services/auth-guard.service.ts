import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Route,
  RouterStateSnapshot,
} from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { exhaustMap, filter, map, take } from 'rxjs/operators';

import { selectHasChecked, selectHasUser } from '..//selectors/auth.selectors';
import * as AuthGuardServiceActions from '@app/auth/actions/auth-guard-service.actions';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private authService: AuthService,
    private readonly store: Store
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    //
    return this.checkAuth(state.url);
  }

  canLoad(route: Route): Observable<boolean> {
    //
    if (route.path == undefined) {
      return of(false);
    }

    const url = `/${route.path}`;
    return this.checkAuth(url);
  }

  private checkAuth(url: string) {
    //
    this.authService.redirectUrl = url;

    return this.checkStoreAuthentication().pipe(
      take(1),
      map((storeOrApiAuth) => {
        if (!storeOrApiAuth) {
          this.store.dispatch(
            AuthGuardServiceActions.navigateToSignIn({
              requestedUrl: url,
            })
          );
          return false;
        } else {
          return true;
        }
      })
    );
  }

  private checkStoreAuthentication() {
    //
    return this.store.select(selectHasChecked).pipe(
      filter((hasChecked) => hasChecked),
      exhaustMap(() => this.store.select(selectHasUser).pipe(take(1)))
    );
  }

  /*
  checkApiAuthentication() {
    return this.authService.check().pipe(
      map((user) => !!user),
      catchError(() => of(false)),
    );
  }
  */
}

import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanMatchFn,
  RouterStateSnapshot,
} from '@angular/router';

import { Store } from '@ngrx/store';

import { exhaustMap, filter, Observable, map, take } from 'rxjs';

import { selectHasChecked, selectHasUser } from '..//selectors/auth.selectors';
import * as AuthGuardServiceActions from '@app/auth/actions/auth-guard-service.actions';
import { AuthService } from '../services/auth.service';

export const authCanMatchGuard: CanMatchFn = (route) => {
  //
  const authGuardService = inject(AuthGuardService);
  const url = route.path ?? '';

  return authGuardService.checkAuth(url);
};

// TODO: Add tests
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  private authService = inject(AuthService);
  private readonly store = inject(Store);

  // TODO: Move to functional guard
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    //
    return this.checkAuth(state.url);
  }

  checkAuth(url: string) {
    //
    // TODO: Remove authService?
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

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { SignInPageActions } from '@app/auth/actions';
import { Credentials } from '@app/auth/models/credentials.model';
import { AuthRootState } from '@app/auth/reducers';
import { SignInPageSelectors } from '@app/auth/selectors';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPageComponent {
  error$: Observable<string | null>;
  pending$: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.error$ = store.select(SignInPageSelectors.selectSignInPageError);
    this.pending$ = store.select(SignInPageSelectors.selectSignInPagePending);

    this.store.dispatch(SignInPageActions.entered());
  }

  onSubmitted(credentials: Credentials) {
    this.store.dispatch(SignInPageActions.signIn({ credentials }));
  }

  onSignUp() {
    this.store.dispatch(SignInPageActions.showSignUpPage());
  }
}

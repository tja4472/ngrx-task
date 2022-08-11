import { ChangeDetectionStrategy, Component } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { SignUpPageActions } from '@app/auth/actions';
import { Credentials } from '@app/auth/models/credentials.model';
import { AuthRootState } from '@app/auth/reducers';
import { SignUpPageSelectors } from '@app/auth/selectors';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPageComponent {
  error$: Observable<string | null>;
  pending$: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.error$ = store.select(SignUpPageSelectors.selectSignUpPageError);
    this.pending$ = store.select(SignUpPageSelectors.selectSignUpPagePending);

    this.store.dispatch(SignUpPageActions.entered());
  }

  onSubmitted(credentials: Credentials) {
    this.store.dispatch(SignUpPageActions.signUp({ credentials }));
  }
}

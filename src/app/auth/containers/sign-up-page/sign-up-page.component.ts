import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as SignUpPageActions from '@app/auth/actions/sign-up-page.actions';
import { Credentials } from '@app/auth/models/credentials.model';
import * as SignUpPageSelectors from '@app/auth//selectors/sign-up-page.selectors';
import { CredentialsFormComponent } from '../../components/credentials-form/credentials-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CredentialsFormComponent, AsyncPipe],
})
export class SignUpPageComponent {
  private readonly store = inject(Store);

  error$: Observable<string | null>;
  pending$: Observable<boolean>;

  constructor() {
    const store = this.store;

    this.error$ = store.select(SignUpPageSelectors.selectSignUpPageError);
    this.pending$ = store.select(SignUpPageSelectors.selectSignUpPagePending);

    this.store.dispatch(SignUpPageActions.entered());
  }

  onSubmitted(credentials: Credentials) {
    this.store.dispatch(SignUpPageActions.signUp({ credentials }));
  }
}

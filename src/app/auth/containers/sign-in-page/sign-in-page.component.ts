import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { SignInPageActions } from '@app/auth/actions/sign-in-page.actions';

import { Credentials } from '@app/auth/models/credentials.model';
import * as SignInPageSelectors from '@app/auth//selectors/sign-in-page.selectors';
import { CredentialsFormComponent } from '../../components/credentials-form/credentials-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CredentialsFormComponent, AsyncPipe],
})
export class SignInPageComponent implements OnInit {
  error$: Observable<string>;
  pending$: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.error$ = store.pipe(SignInPageSelectors.selectFilteredSignInPageError);
    this.pending$ = store.select(SignInPageSelectors.selectSignInPagePending);
  }
  ngOnInit(): void {
    this.store.dispatch(SignInPageActions.entered());
  }

  onSubmitted(credentials: Credentials) {
    this.store.dispatch(SignInPageActions.signIn({ credentials }));
  }

  onSignUp() {
    this.store.dispatch(SignInPageActions.showSignUpPage());
  }
}

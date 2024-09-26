// https://github.com/albinhalitaj/conduitapp/blob/main/conduit/src/app/auth/login/login.store.ts

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { SignInPageActions } from '@app/auth/actions/sign-in-page.actions';

import { Credentials } from '@app/auth/models/credentials.model';

import { SignInPageComponentStore } from './sign-in-page-component-store.store';
import { NgIf, AsyncPipe } from '@angular/common';
import { CredentialsFormComponent } from '../../components/credentials-form/credentials-form.component';

@Component({
  selector: 'app-sign-in-page-component-store',
  templateUrl: './sign-in-page-component-store.component.html',
  styleUrls: ['./sign-in-page-component-store.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SignInPageComponentStore],
  standalone: true,
  imports: [NgIf, CredentialsFormComponent, AsyncPipe],
})
export class SignInPageComponentStoreComponent {
  // error$: Observable<string | null>;
  // pending$: Observable<boolean>;

  // ViewModel for the Component
  readonly vm$ = this.signInPageComponentStore.vm$;

  constructor(
    private readonly store: Store,
    private readonly signInPageComponentStore: SignInPageComponentStore
  ) {
    // this.error$ = store.pipe(select(SignInPageSelectors.selectSignInPageError));
    // this.pending$ = store.pipe(
    //  select(SignInPageSelectors.selectSignInPagePending)
    // );
    // this.store.dispatch(SignInPageActions.entered());
  }

  onSubmitted(credentials: Credentials) {
    // this.store.dispatch(SignInPageActions.signIn({ credentials }));
    console.log('onSubmitted>', credentials);
    // Will do auth check here.
    // this.signInPageComponentStore.effect1('test text');
    // this.signInPageComponentStore.effect2(credentials);
    // this.signInPageComponentStore.effect3(credentials);
    // this.signInPageComponentStore.effect4(credentials);
  }

  onSignUp() {
    this.store.dispatch(SignInPageActions.showSignUpPage());
  }
}

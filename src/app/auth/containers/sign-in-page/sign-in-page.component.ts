import { Component, OnInit } from '@angular/core';

import { SignInPageActions } from '@app/auth/actions';
import { AuthFacade } from '@app/auth/facades/auth.facade';
import { Credentials } from '@app/auth/models/credentials.model';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css'],
})
export class SignInPageComponent implements OnInit {
  error$ = this.authFacade.signInPageError$;
  pending$ = this.authFacade.signInPagePending$;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {
    // temp!!!!
    this.authFacade.dispatch(
      SignInPageActions.signIn({
        credentials: { username: 'b.b@b.com', password: 'password' },
      })
    );
  }

  onSubmitted(credentials: Credentials) {
    this.authFacade.dispatch(SignInPageActions.signIn({ credentials }));
  }

  onSignUp() {
    this.authFacade.dispatch(SignInPageActions.showSignUpPage());
  }
}

import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl = '';

  constructor(private readonly afAuth: AngularFireAuth) {}

  /* Still to convert
  public signUp(auth: Credentials) {
    //
    const result$ = from(
      this.afAuth.auth.createUserWithEmailAndPassword(
        auth.username,
        auth.password
      )
    ).pipe(
      switchMap(() => {
        return this.signedIn$.pipe(take(1));
      })
    );

    return result$;
  }
*/
}

import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { first, map, skip, switchMap, tap } from 'rxjs/operators';

import { UserInfoDataService } from '@app/services/user-info.data.service';

import { AppUser } from '../models/app-user.model';

import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl = '';

  appUser$: Observable<AppUser | null>;
  user$: Observable<User>;
  constructor(
    private auth: AngularFireAuth,
    private userInfoDataService: UserInfoDataService
  ) {
    console.log('### AuthService:constructor');

    this.user$ = this.auth.authState.pipe(
      // first(),
      tap((user) => {
        console.log('### AuthService>', user);
      })
    );

    this.auth.user.subscribe((user) => {
      console.log('auth.user.subscribe>', user);
    });

    const a$: Observable<AppUser | null> = this.auth.user.pipe(
      switchMap((user) => {
        if (user === null) {
          return of(null);
        } else {
          return this.userInfoDataService.getItem$(user.uid).pipe(
            map((userInfo) => {
              const result: AppUser = {
                taskListId: userInfo.todoListId,
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
              };
              return result;
            })
          );
        }
      })
    );

    a$.subscribe((u) => {
      console.log('a$.subscribe>', u);
    });

    a$.pipe(first()).subscribe((u) => console.log('first>', u));
    a$.pipe(skip(1)).subscribe((u) => console.log('skip>', u));

    this.appUser$ = a$;
  }

  public autoSignIn() {
    // should return userProfile or null
    console.log('### autoSignIn');
    // console.log('aaa>', this.auth.currentUser)
    this.auth.user.pipe(
      // first(),
      tap((user) => {
        console.log('### autoSignIn>', user);
      })
    );
  }
}

import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { UserInfoDataService } from '@app/services/user-info.data.service';

import { AppUser } from '../models/app-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl = '';

  appUser$: Observable<AppUser | null>;

  constructor(
    private auth: AngularFireAuth,
    private userInfoDataService: UserInfoDataService
  ) {
    this.appUser$ = this.auth.user.pipe(
      switchMap((user) => {
        if (user === null) {
          return of(null);
        } else {
          return this.userInfoDataService.getItem$(user.uid).pipe(
            // Stop listening for changes.
            first(),
            map((userInfo) => {
              if (user.email === null) {
                throw new Error('user.email is null');
              }
              const result: AppUser = {
                taskListId: userInfo.todoListId,
                uid: user.uid,
                email: user.email,
              };
              return result;
            })
          );
        }
      })
    );
  }
}

import { Injectable, Optional } from '@angular/core';

import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
  signOut,
} from '@angular/fire/auth';

import { from, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { UserInfoDataService } from '@app/services/user-info.data.service';

import { AppUser } from '../models/app-user.model';
import { newUserInfo } from '@app/models/user-info.model';

import {
  newTaskListListItemB,
  TaskListListItem,
} from '@app/root-store/tasks-store/models';
import { TaskListDataService } from '@app/services/task-list.data.service';

// https://firebase.google.com/docs/web/modular-upgrade?authuser=0
// https://github.com/angular/angularfire/blob/master/docs/version-7-upgrade.md

// https://benjaminjohnson.me/blog/typesafe-errors-in-typescript
type ResultSuccess<T> = { type: 'success'; value: T };

type ResultError = { type: 'error'; error: Error; errorCode: string };

type Result<T> = ResultSuccess<T> | ResultError;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl = '';

  get appUser$(): Observable<AppUser | null> {
    return this.#appUser$;
  }

  #appUser$: Observable<AppUser | null>;

  // private auth: Auth not being set
  // authTemp = getAuth();

  constructor(
    @Optional() private auth: Auth,
    private taskListDataService: TaskListDataService,
    private userInfoDataService: UserInfoDataService
  ) {
    this.#appUser$ = authState(this.auth).pipe(
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
              console.log('AAA>', result);
              return result;
            })
          );
        }
      })
    );
  }
  /*
      this.store.dispatch(
        AuthApiActions.signInFailure({
          error: {
            code: error.code,
            message: error.message,
          },
        })
      )
*/
  async bbbsignIn(email: string, password: string): Promise<UserCredential> {
    console.log('bbbsignIn');
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   *
   * @param email
   * @param password
   * @returns
   */
  async signIn(
    email: string,
    password: string
  ): Promise<UserCredential | undefined> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: unknown) {
      // Process error
      throw error;
    } finally {
      console.log('We do cleanup here');
    }
  }

  async signOut(): Promise<void> {
    try {
      return await signOut(this.auth);
    } catch (error: unknown) {
      // Process error
      throw error;
    } finally {
      console.log('We do cleanup here');
    }
  }

  ddddsignIn() {
    signInWithEmailAndPassword(this.auth, 'email', 'password')
      /*    
      .then((cred) => {
        console.log('Signed in>', cred);
      })
*/
      .catch((error: unknown) => {
        // Process error
        throw error;
        /*        
        // this doesn't work
        // if (error instanceof FirebaseError) {
        if (error instanceof Error) {
          console.error(error.message); // It's an Error instance.
          // console.error('error>>>>', error.code);
          return { success: true, errorCode: error.message };
        } else {
          console.error('🤷‍♂️'); // Who knows?
        }
*/
      });
  }

  signInAAA() {
    signInWithEmailAndPassword(this.auth, 'email', 'password')
      .then((cred) => {
        console.log('Signed in>', cred);
      })
      .catch((error) => {});
  }

  // firebase.FirebaseError
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  public async signUp(email: string, password: string) {
    console.log('KKKKKKKKKKKKKKKKKKKKKKKKK-signUp-A');
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    console.log('KKKKKKKKKKKKKKKKKKKKKKKKK-signUp-B');
    if (userCredential.user == null) {
      throw new Error('user is null');
    }

    const defaultValue = newUserInfo();
    await this.userInfoDataService.save(defaultValue, userCredential.user.uid);

    const taskListListItem: TaskListListItem = {
      id: defaultValue.todoListId,
      name: defaultValue.todoListId + ' name',
    };
    console.log('KKKKKKKKKKKKKKKKKKKKKKKKK');
    await this.taskListDataService.save(
      taskListListItem,
      userCredential.user.uid
    );
  }

  /*
  async aaaaa(
    email: string,
    password: string
  ): Promise<ResultSuccess<firebase.auth.UserCredential> | ResultError> {
    try {
      const result = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );
      return { type: 'success', value: result };
      /*
      const success: ResultSuccess<firebase.auth.UserCredential> = {
        type: 'success',
        value: result,
      };
      return success;
*
    } catch (error) {
      const errorCode: string = error.code;
      const errorMessage: string = error.message;

      return { type: 'error', error, errorCode };
      /*
      const resultError: ResultError = { type: 'error', error, errorCode };
      return resultError;
*
    }
  }

  bbbb(email: string, password: string) {
    return from(this.aaaaa(email, password));
  }
*/
}

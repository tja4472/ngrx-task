/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  signOut,
} from 'firebase/auth';

import { from, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { UserInfoDataService } from '@app/services/user-info.data.service';

import { AppUser } from '../models/app-user.model';
import { newUserInfo } from '@app/models/user-info.model';

import { TaskListListItem } from '@app/models/task-list-list-item.model';
import { TaskListDataService } from '@app/services/task-list.data.service';
import { injectAuth, user$ } from '@app/rxfire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //
  readonly #auth = injectAuth();

  public redirectUrl = '';

  get appUser$(): Observable<AppUser | null> {
    return this.#appUser$;
  }

  #appUser$: Observable<AppUser | null>;

  constructor(
    // @Optional() private auth: Auth,
    private taskListDataService: TaskListDataService,
    private userInfoDataService: UserInfoDataService
  ) {
    this.#appUser$ = user$(this.#auth).pipe(
      switchMap((user) => {
        if (user === null) {
          return of(null);
        } else {
          return this.userInfoDataService.getData$(user.uid).pipe(
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

  async bbbsignIn(email: string, password: string): Promise<UserCredential> {
    console.log('bbbsignIn');
    return await signInWithEmailAndPassword(this.#auth, email, password);
  }

  /**
   *
   * @param email
   * @param password
   * @returns
   */
  async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.#auth, email, password);
    } catch (error: unknown) {
      const processedError = this.processError(error);
      throw processedError;
    } finally {
      console.log('We do cleanup here');
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.#auth);
      return;
    } catch (error: unknown) {
      const processedError = this.processError(error);
      throw processedError;
    } finally {
      console.log('We do cleanup here');
    }
  }

  processError(error: unknown): unknown {
    // if (error instanceof FirebaseError) {
    if (error instanceof Error) {
      console.error(error.message); // It's an Error instance.
      // console.error('error>>>>', error.code);
      // return { success: true, errorCode: error.message };
    } else {
      console.error('🤷‍♂️'); // Who knows?
    }

    return error;
  }

  ddddsignIn() {
    signInWithEmailAndPassword(this.#auth, 'email', 'password')
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
    signInWithEmailAndPassword(this.#auth, 'email', 'password')
      .then((cred) => {
        console.log('Signed in>', cred);
      })
      .catch(() => {});
  }

  // firebase.FirebaseError
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.#auth, email, password));
  }

  public async signUp(email: string, password: string) {
    console.log('KKKKKKKKKKKKKKKKKKKKKKKKK-signUp-A');
    const userCredential = await createUserWithEmailAndPassword(
      this.#auth,
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

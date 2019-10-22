import { Action, createReducer, on } from '@ngrx/store';

import { AuthApiActions, SignInPageActions } from '@app/auth/actions';

export interface SignInPageState {
  pending: boolean;
  error: string | null;
}

export const initialState: SignInPageState = {
  error: null,
  pending: false,
};

/*
Typescript not enforcing State type.
https://github.com/microsoft/TypeScript/issues/241#issuecomment-540168588
Hence const values: State = { bodge
*/
const featureReducer = createReducer(
  initialState,
  on(SignInPageActions.signIn, (state) => {
    const values: SignInPageState = { ...state, error: null, pending: true };
    return values;
  }),
  on(AuthApiActions.signInSuccess, (state) => {
    const values: SignInPageState = { ...state, error: null, pending: true };
    return values;
  })
  /*
  on(AuthApiActions.signInFailure, (state) => {
    const values: SignInPageState = { ...state, error: null, pending: true };
    return values;
  })  
  */
);

export function reducer(state: SignInPageState | undefined, action: Action) {
  return featureReducer(state, action);
}

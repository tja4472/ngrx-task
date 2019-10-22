import { Action, createReducer, on } from '@ngrx/store';

import { AuthApiActions, SignUpPageActions } from '@app/auth/actions';

export interface SignUpPageState {
  readonly pending: boolean;
  readonly error: string | null;
}

export const initialState: SignUpPageState = {
  pending: false,
  error: null,
};

/*
Typescript not enforcing State type.
https://github.com/microsoft/TypeScript/issues/241#issuecomment-540168588
Hence const values: State = { bodge
*/
const featureReducer = createReducer(
  initialState,
  on(SignUpPageActions.signUp, (state) => {
    const values: SignUpPageState = { ...state, error: null, pending: true };
    return values;
  }),
  on(AuthApiActions.signInSuccess, (state) => {
    const values: SignUpPageState = { ...state, error: null, pending: true };
    return values;
  })
  /*
  on(AuthApiActions.signInFailure, (state) => {
    const values: SignUpPageState = { ...state, error: null, pending: true };
    return values;
  })  
  */
);

export function reducer(state: SignUpPageState | undefined, action: Action) {
  return featureReducer(state, action);
}

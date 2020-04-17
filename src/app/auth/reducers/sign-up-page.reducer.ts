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
export const reducer = createReducer(
  initialState,
  on(SignUpPageActions.entered, (state) => {
    const values: SignUpPageState = { ...initialState };
    return values;
  }),
  on(SignUpPageActions.signUp, (state) => {
    const values: SignUpPageState = { ...state, error: null, pending: true };
    return values;
  }),
  on(AuthApiActions.signUpFailure, (state, { error }) => {
    const values: SignUpPageState = {
      ...state,
      error: error.message,
      pending: false,
    };
    return values;
  })
);

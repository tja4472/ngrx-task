import { Action, createReducer, on } from '@ngrx/store';

import * as featureActions from './actions';
import { initialState, State } from './state';

export const featureKey = 'user';

/*
Typescript not enforcing State type.
https://github.com/microsoft/TypeScript/issues/241#issuecomment-540168588
Hence const values: State = { bodge
*/
const featureReducer = createReducer(
  initialState,
  on(featureActions.clearUser, (state) => {
    const values: State = { ...initialState };
    return values;
  }),
  on(featureActions.setUser, (state, { user }) => {
    const values: State = { ...state, user };
    return values;
  })
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}

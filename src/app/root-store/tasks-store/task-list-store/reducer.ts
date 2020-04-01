import { Action, createReducer, on } from '@ngrx/store';

import { AuthApiActions } from '@app/auth/actions';

import * as featureActions from './actions';
import { featureAdapter, initialState, State } from './state';

export const featureKey = 'taskLists';

/*
Typescript not enforcing State type.
https://github.com/microsoft/TypeScript/issues/241#issuecomment-540168588
Hence const values: State = { bodge
*/
const featureReducer = createReducer(
  initialState,
  on(featureActions.listenForData, (state) => {
    const values: State = {
      ...state,
      loading: true,
    };
    return values;
  }),
  /*
  on(AuthApiActions.signOutComplete, () => ({
    ...initialState,
  })),
*/

  on(featureActions.loadSuccess, (state, { items }) => {
    const values: State = { ...state, loaded: true, loading: false };
    return featureAdapter.setAll(items, values);
  })
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}

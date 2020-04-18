import { Action, createReducer } from '@ngrx/store';

import * as featureActions from './actions';
import { initialState, State } from './state';

import { mutableOn } from 'ngrx-etc';

export const featureKey = 'user';

/*
Typescript not enforcing State type.
https://github.com/microsoft/TypeScript/issues/241#issuecomment-540168588

const values: State = {
  ...state,
  loaded: true,
  loading: false,
};
*/
/*
Automatic type checking for the state that is returned by the on function in createReducer
https://github.com/ngrx/platform/issues/2412
*/
export const reducer = createReducer(
  initialState,
  /*
  on(featureActions.clearUser, (state) => {
    const values: State = { ...initialState };
    return values;
  }),
*/

  mutableOn(featureActions.setData, (state, { user, taskListId }) => {
    /*
    const values: State = { ...state, user, taskListId };
    return values;
*/

    state.user = user;
    state.taskListId = taskListId;
  }),
  mutableOn(featureActions.setTaskListId, (state, { taskListId }) => {
    /*
    const values: State = { ...state, taskListId };
    return values;
*/

    state.taskListId = taskListId;
  })
);

import { Action, createReducer } from '@ngrx/store';

import * as featureActions from './actions';
import { initialState, State } from './state';

import { mutableOn } from 'ngrx-etc';

export const featureKey = 'user';

/*
Typescript not enforcing State type.
https://github.com/microsoft/TypeScript/issues/241#issuecomment-540168588
Hence const values: State = { bodge
*/
const featureReducer = createReducer(
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

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}

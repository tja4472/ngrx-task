import { Action, createReducer, on } from '@ngrx/store';
import * as HomeActions from '../actions/home.actions';

export const homeFeatureKey = 'home';

export interface State {}

export const initialState: State = {};

const homeReducer = createReducer(
  initialState,

  on(HomeActions.loadHomes, (state) => state)
);

export function reducer(state: State | undefined, action: Action) {
  return homeReducer(state, action);
}

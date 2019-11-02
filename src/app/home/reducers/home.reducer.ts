import { Action, createReducer, on } from '@ngrx/store';

export const homeFeatureKey = 'home';

// tslint:disable-next-line: no-empty-interface
export interface State {}

export const initialState: State = {};

const homeReducer = createReducer(
  initialState

  // on(HomeActions.qqqqloadHomes, (state) => state)
);

export function reducer(state: State | undefined, action: Action) {
  return homeReducer(state, action);
}

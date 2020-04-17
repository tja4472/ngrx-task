import { Action, createReducer, on } from '@ngrx/store';

export const homeFeatureKey = 'home';

// tslint:disable-next-line: no-empty-interface
export interface State {}

export const initialState: State = {};

export const reducer = createReducer(
  initialState

  // on(HomeActions.qqqqloadHomes, (state) => state)
);

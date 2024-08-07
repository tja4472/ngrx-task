/* eslint-disable @typescript-eslint/no-empty-interface */
import { createReducer } from '@ngrx/store';

export const homeFeatureKey = 'home';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface State {}

export const initialState: State = {};

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
  initialState

  // on(HomeActions.qqqqloadHomes, (state) => state)
);

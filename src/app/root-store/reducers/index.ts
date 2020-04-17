import { InjectionToken } from '@angular/core';

import * as fromRouter from '@ngrx/router-store';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

import { AuthActions } from '@app/auth/actions';
import * as fromAuth from '@app/auth/reducers';

import { environment } from '../../../environments/environment';

export interface State {
  router: fromRouter.RouterReducerState<any>;
}

export const rootReducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

// reset whole state except for authFeature and router
export function flush(reducer: any) {
  // tslint:disable-next-line: only-arrow-functions
  return function (state: fromAuth.State | undefined, action: Action) {
    if (action.type === AuthActions.signOutComplete.type) {
      return reducer(
        { authFeature: state.authFeature, router: state.router },
        action
      );
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [logger, flush]
  : [flush];

export const selectRouter = createFeatureSelector<
  State,
  fromRouter.RouterReducerState<any>
>(fromRouter.DEFAULT_ROUTER_FEATURENAME);

export const {
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = fromRouter.getSelectors(selectRouter);

export const selectRouteId = selectRouteParam('id');
export const selectStatus = selectQueryParam('status');

// TODO: Enable lazy loading for effects and stores
import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
//
import { routes } from './app.routes';

import { EnvironmentService } from '@app/environment.service';

import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { MetaReducer, provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AuthEffects } from '@app/auth/effects/auth.effects';
import { authFeatureKey, authReducers } from '@app/auth/reducers';

import { HomeEffects } from '@app/home/effects/home.effects';

import * as fromHome from '@app/home/reducers/home.reducer';
//

import { flush, logger } from '@app/root-store/reducers';

import { TaskEffects } from '@app/root-store/tasks-store/effects/task.effects';
import { TodoCompletedEffects } from '@app/root-store/tasks-store/effects/todo-completed.effect';
import { TodoEffects } from '@app/root-store/tasks-store/effects/todo.effect';
import * as fromTask from '@app/root-store/tasks-store/reducers';
import { TaskListEffects } from '@app/root-store/tasks-store/task-list-store/effects';

import { UserStoreEffects } from '@app/root-store/user-store/effects';
import {
  userStoreFeatureKey,
  reducer,
} from '@app/root-store/user-store/user-store.reducer';
import { appFirebaseProviders } from './app-firebase.providers';
//

const environmentService = new EnvironmentService();

const metaReducers: MetaReducer[] = !environmentService.production
  ? [logger, flush]
  : [flush];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      // registrationStrategy: 'registerWhenStable:30000',
      // Make work with Firebase
      registrationStrategy: 'registerImmediately',
    }),
    provideAnimationsAsync(),
    //
    provideStore(
      {
        router: routerReducer,
      },
      {
        metaReducers,
        runtimeChecks: {
          // strictStateImmutability and strictActionImmutability are enabled by default
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
        },
      }
    ),
    provideRouterStore(),
    provideStoreDevtools({
      name: 'Ng Task App',
      maxAge: 25, // Retains last 25 states
      connectInZone: true,
    }),
    //
    provideState(authFeatureKey, authReducers),
    provideEffects(AuthEffects),
    //
    provideState(fromHome.homeFeatureKey, fromHome.reducer),
    provideEffects(HomeEffects),
    //
    provideState(fromTask.taskFeatureKey, fromTask.taskReducers),
    provideEffects(
      TaskEffects,
      TaskListEffects,
      TodoEffects,
      TodoCompletedEffects
    ),
    //
    provideState(userStoreFeatureKey, reducer),
    provideEffects(UserStoreEffects),
    //
    ...appFirebaseProviders,
    //
  ],
};

/*
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};


*/

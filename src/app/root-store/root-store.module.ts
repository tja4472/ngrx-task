/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-arguments */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { flush, logger, rootReducers } from '@app/root-store/reducers';
import { TasksStoreModule } from '@app/root-store/tasks-store';

import { UserStoreModule } from './user-store';

import { EnvironmentService } from '@app/environment.service';

const environmentService = new EnvironmentService();

const metaReducers: MetaReducer<any>[] = !environmentService.production
  ? [logger, flush]
  : [flush];

@NgModule({
  imports: [
    CommonModule,
    TasksStoreModule,
    UserStoreModule,
    StoreModule.forRoot(rootReducers, {
      metaReducers,
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
      },
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Ng Task App',
      maxAge: 25, // Retains last 25 states
    }),
  ],
  declarations: [],
})
export class RootStoreModule {}

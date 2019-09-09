import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreModule } from '@app/core';
import { AppComponent } from '@app/core/containers';

import { AppRoutingModule } from './app-routing.module';
import { metaReducers, ROOT_REDUCERS } from './reducers';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
    StoreDevtoolsModule.instrument({
      name: 'Ng Task App',
      // In a production build you would want to disable the Store Devtools
      // logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

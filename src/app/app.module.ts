import { ApplicationRef, DoBootstrap, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AuthModule } from '@app/auth/auth.module';
import { CoreModule } from '@app/core/core.module';
import { AppComponent } from '@app/core/containers/app.component';
import { HomeModule } from '@app/home/home.module';

import { AppFirebaseModule } from './app-firebase.module';
import { AppRoutingModule } from './app-routing.module';
import { RootStoreModule } from './root-store/root-store.module';

import { EnvironmentService } from '@app/environment.service';

const environmentService = new EnvironmentService();

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppFirebaseModule,
    AuthModule,
    HomeModule,
    AppRoutingModule,
    RootStoreModule,
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environmentService.production,
      // Make work with Firebase
      registrationStrategy: 'registerImmediately',
    }),
  ],
  // bootstrap: [AppComponent],
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef) {
    //  // For Cypress app actions
    appRef.bootstrap(AppComponent);
    if (window.Cypress) {
      // and save the application reference
      window.appRef = appRef;
    }
  }
}

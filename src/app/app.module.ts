import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AuthModule } from '@app/auth';
import { CoreModule } from '@app/core';
import { AppComponent } from '@app/core/containers';
import { HomeModule } from '@app/home';

import { AppFirebaseModule } from './app-firebase.module';
import { AppRoutingModule } from './app-routing.module';
import { RootStoreModule } from './root-store';

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
  bootstrap: [AppComponent],
})
export class AppModule {}

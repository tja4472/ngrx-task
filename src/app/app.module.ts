import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AngularFireModule } from '@angular/fire';
import {
  AngularFireAnalyticsModule,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirePerformanceModule } from '@angular/fire/performance';

import { AuthModule } from '@app/auth';
import { CoreModule } from '@app/core';
import { AppComponent } from '@app/core/containers';
import { HomeModule } from '@app/home';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { RootStoreModule } from './root-store';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirePerformanceModule,
    AuthModule,
    HomeModule,
    AppRoutingModule,
    RootStoreModule,
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}

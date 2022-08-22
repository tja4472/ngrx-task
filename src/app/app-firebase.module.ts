import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire/compat';
/*
import {
  AngularFireAnalyticsModule,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/compat/analytics';
*/
import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/compat/auth';
import {
  AngularFirestoreModule,
  SETTINGS as FIRESTORE_SETTINGS,
  USE_EMULATOR as USE_FIRESTORE_EMULATOR,
} from '@angular/fire/compat/firestore';
// import { AngularFirePerformanceModule } from '@angular/fire/compat/performance';

import { EnvironmentService } from '@app/environment.service';

const environmentService = new EnvironmentService();

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environmentService.firebase.config),
    AngularFirestoreModule.enablePersistence(),
    // AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    // AngularFirePerformanceModule,
  ],
  // exports: [AngularFireModule, AngularFireAuthModule],
  // providers: [ScreenTrackingService, UserTrackingService],
  providers: [
    {
      provide: FIRESTORE_SETTINGS,
      useValue: { experimentalAutoDetectLongPolling: true },
    },
    {
      provide: USE_AUTH_EMULATOR,
      useValue: environmentService.firebase.emulators?.auth,
    },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environmentService.firebase.emulators?.firestore,
    },
  ],
})
export class AppFirebaseModule {}

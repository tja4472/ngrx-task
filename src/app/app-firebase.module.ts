/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { NgModule } from '@angular/core';

import { EnvironmentService } from '@app/environment.service';

import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
  initializeFirestore,
  enableIndexedDbPersistence,
} from '@angular/fire/firestore';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';

const environmentService = new EnvironmentService();

// cypress requires experimentalAutoDetectLongPolling

@NgModule({
  providers: [
    provideFirebaseApp(() => initializeApp(environmentService.firebase.config)),
    provideAuth(() => {
      const auth = getAuth();
      if (environmentService.firebase.emulators) {
        connectAuthEmulator(auth, 'http://localhost:9099', {
          disableWarnings: false,
        });
      }
      return auth;
    }),
    provideFirestore(() => {
      let firestore;

      if (environmentService.firebase.emulators) {
        console.log('🔔 using firestore emulator...');
        // bug: experimentalAutoDetectLongPolling not picked up via `getFirestore`
        const app = getApp();
        firestore = initializeFirestore(app, {
          experimentalAutoDetectLongPolling: true,
        });
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      } else {
        firestore = getFirestore();
        enableIndexedDbPersistence(firestore);
      }

      return firestore;
    }),
  ],
  /*
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
*/
})
export class AppFirebaseModule {}

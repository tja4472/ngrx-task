/*
import { EnvironmentService } from '@app/environment.service';

import {
  connectFirestoreEmulator,
  provideFirestore,
  initializeFirestore,
  persistentLocalCache,
} from '@angular/fire/firestore';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';

const environmentService = new EnvironmentService();

// cypress requires experimentalAutoDetectLongPolling

export const a = ['aa'];

export const appFirebaseProviders = [
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
      const app = getApp();
      firestore = initializeFirestore(app, {
        localCache: persistentLocalCache(),
      });
    }    
      */

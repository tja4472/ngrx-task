import { Auth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { FIREBASE_AUTH } from './auth';

import { EnvironmentService } from '@app/environment.service';

const environmentService = new EnvironmentService();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function firestoreFactory(_: Auth) {
  const firestore = getFirestore();
  if (environmentService.firebase.emulators) {
    connectFirestoreEmulator(firestore, 'localhost', 8080);
  }
  return firestore;
}

export const [injectFirestore] = createInjectionToken(firestoreFactory, {
  deps: [FIREBASE_AUTH],
});

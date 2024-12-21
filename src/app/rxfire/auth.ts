import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { createInjectionToken } from 'ngxtension/create-injection-token';

import { EnvironmentService } from '@app/environment.service';

const environmentService = new EnvironmentService();

// Initialise the Firebase app here because we expect Auth to be the first thing initialised
initializeApp(environmentService.firebase.config);

function authFactory() {
  const auth = getAuth();
  if (environmentService.firebase.emulators) {
    connectAuthEmulator(auth, 'http://localhost:9099', {
      disableWarnings: true,
    });
  }
  return auth;
}

export const [injectAuth, , FIREBASE_AUTH] = createInjectionToken(authFactory);

export { user as user$ } from 'rxfire/auth';

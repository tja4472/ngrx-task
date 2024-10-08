/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// The below is required for CI but not needed locally
/* eslint-disable import/no-unresolved */
import { firebaseConfigProd } from '@app/firebase/firebase-config-prod';

import { Environment } from './environment-types';

export const environment: Environment = {
  appCode: 'ngrx-auth-module',
  production: true,
  firebase: {
    config: firebaseConfigProd,
  },
};

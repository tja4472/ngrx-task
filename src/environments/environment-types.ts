import { FirebaseConfig } from '@app/firebase/firebase-config-interface';

type UseEmulatorArguments = [string, number];

interface Firebase {
  config: FirebaseConfig;
  emulators?: {
    auth: [string];
    firestore: UseEmulatorArguments;
  };
}

export interface Environment {
  appCode: string;
  production: boolean;
  firebase: Firebase;
}

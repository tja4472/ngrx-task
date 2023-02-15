// cypress requires version 2.
// 👇️ only necessary if running in Node.js version < 17.5
import fetch from 'node-fetch';

import { EmulatorInfo } from './emulator-info';

// https://bobbyhadz.com/blog/typescript-http-request#making-http-delete-requests-in-typescript

/**
 * Returns the HTTP response status code.
 * @see: https://firebase.google.com/docs/emulator-suite/connect_firestore#clear_your_database_between_tests
 */
export async function clearDatabase(
  projectId: string
): Promise<number | undefined> {
  const url = `http://127.0.0.1:${EmulatorInfo.firestore.port}/emulator/v1/projects/${projectId}/databases/(default)/documents`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    /*
    if (!response.ok) {
      // throw new Error(`Error! status: ${response.status}`);
    }

    console.log('User deleted successfully');
*/
    return response.status;
  } catch (error) {
    /*    
    console.log('vvvv catch');
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
*/
  }
}

/**
 *  * Returns the HTTP response status code.
 * @see: https://firebase.google.com/docs/reference/rest/auth#section-auth-emulator-clearaccounts
 */
export async function clearUserAccounts(
  projectId: string
): Promise<number | undefined> {
  const url = `http://127.0.0.1:${EmulatorInfo.auth.port}/emulator/v1/projects/${projectId}/accounts`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    /*
    if (!response.ok) {
      // throw new Error(`Error! status: ${response.status}`);
    }

    console.log('User deleted successfully');
*/
    return response.status;
  } catch (error) {
    /*    
    console.log('vvvv catch');
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
*/
  }
}

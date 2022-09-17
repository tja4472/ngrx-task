import { AuthService } from '@app/auth/services/auth.service';
import { SignInPageComponentStore } from './sign-in-page-component-store.store';
import { Credentials } from '@app/auth/models/credentials.model';
import { until } from '@app/utils/until';

import { MockService } from 'ng-mocks';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at#browser_compatibility
// Array.prototype.at() requires Node.js 16.6.0+
import 'core-js/features/array/at';

function setup() {
  const authService = MockService(AuthService);
  const store = new SignInPageComponentStore(authService);

  const error$Results: (string | null)[] = [];

  store.error$.subscribe((state) => {
    error$Results.push(state);
  });

  const isProcessing$Results: boolean[] = [];

  store.isProcessing$.subscribe((state) => {
    isProcessing$Results.push(state);
  });

  return {
    authService,
    error$Results,
    isProcessing$Results,
    store,
  };
}

describe('SignInPageComponentStore', () => {
  it('initializes with null error', async () => {
    const { error$Results } = setup();
    expect(error$Results.at(-1)).toBeNull();
  });

  it('initializes with false isProcessing', async () => {
    const { isProcessing$Results } = setup();
    expect(isProcessing$Results.at(-1)).toBeFalsy();
  });

  describe('signIn effect', () => {
    it('should sign in', async () => {
      const { authService, isProcessing$Results, store } = setup();

      jest.spyOn(authService, 'bbbsignIn').mockReturnValue(Promise.resolve());

      const credentials: Credentials = {
        username: 'asdf',
        password: 'password1',
      };

      let effectFinished = false;

      store.signIn({ credentials, onFinish: () => (effectFinished = true) });

      await until(() => effectFinished);

      expect(isProcessing$Results).toHaveLength(3);
      expect(isProcessing$Results[0]).toBeFalsy();
      expect(isProcessing$Results[1]).toBeTruthy();
      expect(isProcessing$Results[2]).toBeFalsy();

      expect(authService.bbbsignIn).toHaveBeenCalledTimes(1);
      expect(authService.bbbsignIn).toHaveBeenCalledWith(
        credentials.username,
        credentials.password
      );
    });

    it('should report error.', async () => {
      let { authService, error$Results, store } = setup();

      jest
        .spyOn(authService, 'bbbsignIn')
        .mockRejectedValue(new Error('ddddd'));

      const credentials: Credentials = {
        username: 'asdf',
        password: 'password1',
      };

      let effectFinished = false;

      store.signIn({ credentials, onFinish: () => (effectFinished = true) });

      await until(() => effectFinished);

      expect(error$Results.at(-1)).toBe('ddddd');
    });

    it('should still work after error.', async () => {
      const { authService, error$Results, store } = setup();

      jest
        .spyOn(authService, 'bbbsignIn')
        .mockRejectedValue(new Error('ddddd'));

      const credentials: Credentials = {
        username: 'asdf',
        password: 'password1',
      };

      let effectFinished = false;

      store.signIn({ credentials, onFinish: () => (effectFinished = true) });

      await until(() => effectFinished);

      expect(error$Results.at(-1)).toBe('ddddd');

      jest.spyOn(authService, 'bbbsignIn').mockReturnValue(Promise.resolve());

      effectFinished = false;

      store.signIn({ credentials, onFinish: () => (effectFinished = true) });

      await until(() => effectFinished);

      expect(authService.bbbsignIn).toHaveBeenCalledTimes(2);
    });
  });
});

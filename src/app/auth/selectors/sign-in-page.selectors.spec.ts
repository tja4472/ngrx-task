import { AuthFeatureState } from '@app/auth/reducers';

import {
  selectSignInPageError,
  selectSignInPagePending,
  selectSignInPageState,
} from './sign-in-page.selectors';

describe('sign-in-page selectors', () => {
  const errorMessage = 'error1;';
  const initialState: Partial<AuthFeatureState> = {
    signInPage: {
      error: errorMessage,
      pending: false,
    },
  };

  describe('selectSignInPageState', () => {
    it('should return signInPageState', () => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const result = selectSignInPageState.projector(initialState as any);
      expect(result).toEqual(initialState.signInPage);
    });
  });

  describe('selectSignInPageError', () => {
    it('should return error', () => {
      const result = selectSignInPageError.projector(
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        initialState.signInPage as any
      );
      expect(result).toBe(errorMessage);
    });
  });

  describe('selectSignInPagePending', () => {
    it('should return pending', () => {
      const result = selectSignInPagePending.projector(
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        initialState.signInPage as any
      );
      expect(result).toBeFalsy();
    });
  });
});

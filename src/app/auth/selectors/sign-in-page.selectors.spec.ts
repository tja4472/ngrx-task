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
      const result = selectSignInPageState.projector(initialState);
      expect(result).toEqual(initialState.signInPage);
    });
  });

  describe('selectSignInPageError', () => {
    it('should return error', () => {
      const result = selectSignInPageError.projector(initialState.signInPage);
      expect(result).toBe(errorMessage);
    });
  });

  describe('selectSignInPagePending', () => {
    it('should return pending', () => {
      const result = selectSignInPagePending.projector(initialState.signInPage);
      expect(result).toBeFalsy();
    });
  });
});

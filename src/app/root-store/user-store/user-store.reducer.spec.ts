import { reducer, initialState, State } from './user-store.reducer';
import * as AuthApiActions from '@app/auth/actions/auth-api.actions';
import * as SidenavActions from '@app/core/components/sidenav/actions/sidenav.actions';
import { AppUser } from '@app/auth/models/app-user.model';

describe('UserStore Reducer', () => {
  describe('an unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('SidenavActions.selectTaskListId action', () => {
    it('should set taskListId', () => {
      const taskListId = 'taskListId1';
      const newState: State = {
        user: null,
        taskListId,
      };
      const action = SidenavActions.selectTaskListId({ taskListId });
      const state = reducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('AuthApiActions.signInHaveUser,', () => {
    it('should set user and taskListId', () => {
      const appUser: AppUser = {
        uid: 'uidA',
        email: 'email1',
        taskListId: 'taskListId1',
      };
      const newState: State = {
        user: {
          email: appUser.email,
          id: appUser.uid,
        },
        taskListId: appUser.taskListId,
      };
      const action = AuthApiActions.signInHaveUser({
        appUser,
        isAutoSignIn: false,
      });
      const state = reducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });
});

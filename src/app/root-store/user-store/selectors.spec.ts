import { User } from '@app/models';
import {
  selectIsLoggedIn,
  selectTaskListId,
  selectUser,
  selectUserAndTaskListId,
} from './selectors';

import { State } from './user-store.reducer';

describe('selectors', () => {
  const initialState: Partial<State> = {
    taskListId: 'taskListId1',
    user: {
      id: 'id1',
      email: 'email1',
    },
  };

  describe('selectTaskListId', () => {
    it('should return taskListId', () => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const result = selectTaskListId.projector(initialState as any);
      expect(result).toBe(initialState.taskListId);
    });
  });

  describe('selectUser', () => {
    it('should return taskListId', () => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const result = selectUser.projector(initialState as any);
      expect(result).toEqual(initialState.user);
    });
  });

  describe('selectIsLoggedIn', () => {
    it('should return false if user is null', () => {
      const result = selectIsLoggedIn.projector(null);
      expect(result).toBeFalsy();
    });

    it('should return true if user is not null', () => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const result = selectIsLoggedIn.projector(initialState.user as any);
      expect(result).toBeTruthy();
    });
  });

  describe('selectUserAndTaskListId', () => {
    it('should return null if user is null', () => {
      const result = selectUserAndTaskListId.projector(
        null,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        initialState.taskListId as any
      );
      expect(result).toBeNull();
    });

    it('should return user & taskListId if user is not null', () => {
      const result = selectUserAndTaskListId.projector(
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        initialState.user as any,
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        initialState.taskListId as any
      );
      expect(result).toEqual({
        user: initialState.user,
        taskListId: initialState.taskListId,
      });
    });
  });
});

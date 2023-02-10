import { User } from '@app/models';
import {
  selectIsLoggedIn,
  selectTaskListId,
  selectUser,
  selectUserAndTaskListId,
} from './selectors';

import { State } from './user-store.reducer';

describe('selectors', () => {
  const initialState: State = {
    taskListId: 'taskListId1',
    user: {
      id: 'id1',
      email: 'email1',
    },
  };

  describe('selectTaskListId', () => {
    it('should return taskListId', () => {
      const result = selectTaskListId.projector(initialState);
      expect(result).toBe(initialState.taskListId);
    });
  });

  describe('selectUser', () => {
    it('should return taskListId', () => {
      const result = selectUser.projector(initialState);
      expect(result).toEqual(initialState.user);
    });
  });

  describe('selectIsLoggedIn', () => {
    it('should return false if user is null', () => {
      const result = selectIsLoggedIn.projector(null);
      expect(result).toBeFalsy();
    });

    it('should return true if user is not null', () => {
      const result = selectIsLoggedIn.projector(initialState.user);
      expect(result).toBeTruthy();
    });
  });

  describe('selectUserAndTaskListId', () => {
    it('should return null if user is null', () => {
      const result = selectUserAndTaskListId.projector(
        null,
        initialState.taskListId
      );
      expect(result).toBeNull();
    });

    it('should return user & taskListId if user is not null', () => {
      const result = selectUserAndTaskListId.projector(
        initialState.user,

        initialState.taskListId
      );
      expect(result).toEqual({
        user: initialState.user,
        taskListId: initialState.taskListId,
      });
    });
  });
});

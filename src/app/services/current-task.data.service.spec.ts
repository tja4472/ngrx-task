import {
  FirestoreDoc,
  getCurrentTasksCollectionPath,
  fromFirestoreDoc,
  toFirestoreDoc,
} from './current-task.data.service';

import { CurrentTask } from '../root-store/tasks-store/models/current-task.model';

import * as DataService from './current-task.data.service';

// https://stackoverflow.com/questions/53174202/how-to-mock-a-function-in-jest

describe('CurrentTaskDataService', () => {
  it('Current tasks collection path should be correct', () => {
    const collectionPath = getCurrentTasksCollectionPath(
      'taskListId',
      'userId'
    );
    const expectedCollectionPath =
      '/users/userId/todo-lists/taskListId/current-todos';

    expect(collectionPath).toBe(expectedCollectionPath);
  });

  describe('fromFirestoreDoc', () => {
    it('test-1', () => {
      const fromDb: FirestoreDoc = {
        completedTimestamp: null,
        name: 'Task 1',
        description: null,
        index: 0,
        id: 'CIYgXiYxnVo5vidHK9Rx',
        isComplete: false,
      };

      const expected: CurrentTask = {
        description: null,
        id: 'CIYgXiYxnVo5vidHK9Rx',
        index: 0,
        isComplete: false,
        completedTimestamp: null,
        name: 'Task 1',
      };

      const actual = fromFirestoreDoc(fromDb);
      expect(actual).toStrictEqual(expected);
    });

    it('test-2', () => {
      const fromDb: FirestoreDoc = {
        completedTimestamp: undefined,
        name: 'Task 1',
        description: null,
        index: 0,
        id: 'CIYgXiYxnVo5vidHK9Rx',
        isComplete: false,
      };

      const expected: CurrentTask = {
        description: null,
        id: 'CIYgXiYxnVo5vidHK9Rx',
        index: 0,
        isComplete: false,
        completedTimestamp: null,
        name: 'Task 1',
      };

      const actual = fromFirestoreDoc(fromDb);
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('toFirestoreDoc', () => {
    it('update', () => {
      const currentTask: CurrentTask = {
        description: 'aaa',
        id: 'bb',
        index: 9,
        isComplete: false,
        completedTimestamp: 100,
        name: 'ccccc',
      };
      const expected: FirestoreDoc = {
        description: 'aaa',
        id: 'bb',
        index: 9,
        isComplete: false,
        completedTimestamp: 100,
        name: 'ccccc',
      };
      const actual = toFirestoreDoc(currentTask);
      expect(actual).toStrictEqual(expected);
    });

    it('update with nulls', () => {
      const currentTask: CurrentTask = {
        description: null,
        id: 'bb',
        index: 9,
        isComplete: false,
        completedTimestamp: null,
        name: 'ccccc',
      };
      const expected: FirestoreDoc = {
        description: null,
        id: 'bb',
        index: 9,
        isComplete: false,
        completedTimestamp: null,
        name: 'ccccc',
      };
      const actual = toFirestoreDoc(currentTask);
      expect(actual).toStrictEqual(expected);
    });

    it('insert', () => {
      const mock = jest.spyOn(DataService, 'randomCode');
      mock.mockImplementation(() => 'TEST');

      const currentTask: CurrentTask = {
        description: null,
        id: '',
        index: 9,
        isComplete: false,
        completedTimestamp: null,
        name: 'ccccc',
      };
      const expected: FirestoreDoc = {
        description: null,
        id: 'TEST',
        index: 9,
        isComplete: false,
        completedTimestamp: null,
        name: 'ccccc',
      };
      const actual = toFirestoreDoc(currentTask);
      expect(actual).toStrictEqual(expected);
    });
  });
});

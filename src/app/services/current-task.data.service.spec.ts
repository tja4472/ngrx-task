import { getCurrentTasksCollectionPath } from './current-task.data.service';

describe('current-task.data.service', () => {
  it('Current tasks collection path should be correct', () => {
    const collectionPath = getCurrentTasksCollectionPath(
      'taskListId',
      'userId'
    );
    const expectedCollectionPath =
      '/users/userId/todo-lists/taskListId/current-todos';

    expect(collectionPath).toBe(expectedCollectionPath);
  });
});

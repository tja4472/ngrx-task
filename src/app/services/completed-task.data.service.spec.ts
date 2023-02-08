import { getCompletedTasksCollectionPath } from './completed-task.data.service';

describe('completed-task.data.service', () => {
  it('Completed tasks collection path should be correct', () => {
    const collectionPath = getCompletedTasksCollectionPath(
      'taskListId',
      'userId'
    );
    const expectedCollectionPath =
      '/users/userId/todo-lists/taskListId/completed-todos';

    expect(collectionPath).toBe(expectedCollectionPath);
  });
});

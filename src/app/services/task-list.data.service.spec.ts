import { getTaskListCollectionPath } from './task-list.data.service';

describe('task-list.data.service', () => {
  it('Task List collection path should be correct', () => {
    const collectionPath = getTaskListCollectionPath('userId');
    const expectedCollectionPath = '/users/userId/todo-lists';

    expect(collectionPath).toBe(expectedCollectionPath);
  });
});

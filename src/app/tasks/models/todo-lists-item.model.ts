export interface TodoListsItem {
  readonly id: string;
  readonly name: string;
}

export function newTodoListsItem(): TodoListsItem {
  return {
    id: '',
    name: '',
  };
}

/*
export class TodoListsItem {
  id = '';
  name = '';

  public constructor(fields?: { id?: string; name?: string }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

  public isNew(): boolean {
    return this.id === '';
  }
}
*/

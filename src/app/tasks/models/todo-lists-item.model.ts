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

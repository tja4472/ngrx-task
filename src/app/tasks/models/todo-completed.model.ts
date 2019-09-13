export interface TodoCompleted {
  readonly id: string;
  readonly description?: string;
  readonly isComplete: boolean;
  readonly name: string;
}

export function newTodoCompleted(): TodoCompleted {
  return {
    description: '',
    id: '',
    isComplete: true,
    name: '',
  };
}

export interface CompletedTask {
  readonly id: string;
  readonly description?: string;
  readonly isComplete: boolean;
  readonly name: string;
}

export function newCompletedTask(): CompletedTask {
  return {
    description: '',
    id: '',
    isComplete: true,
    name: '',
  };
}

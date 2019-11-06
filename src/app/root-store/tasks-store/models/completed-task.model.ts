export interface CompletedTask {
  readonly id: string;
  readonly description?: string;
  readonly isComplete: boolean;
  readonly name: string;
  readonly updatedTimestamp: number;
}

export function newCompletedTask(): CompletedTask {
  return {
    description: '',
    id: '',
    isComplete: true,
    name: '',
    updatedTimestamp: Date.now(),
  };
}

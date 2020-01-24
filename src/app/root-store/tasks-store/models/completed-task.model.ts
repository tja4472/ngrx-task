export interface CompletedTask {
  readonly id: string;
  readonly description?: string;
  readonly isComplete: boolean;
  readonly completedTimestamp: number;
  readonly name: string;
  readonly updatedTimestamp: number;
}

export function newCompletedTask(): CompletedTask {
  return {
    description: '',
    id: '',
    isComplete: true,
    completedTimestamp: Date.now(),
    name: '',
    updatedTimestamp: Date.now(),
  };
}

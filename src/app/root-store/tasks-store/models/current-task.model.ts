export interface CurrentTask {
  readonly description?: string;
  readonly id: string;
  readonly index: number;
  readonly isComplete: boolean;
  readonly completedTimestamp: number;
  readonly name: string;
}

export function newCurrentTask(): CurrentTask {
  return {
    description: '',
    id: '',
    index: 0,
    isComplete: false,
    completedTimestamp: null,
    name: '',
  };
}

export function toggleIsComplete(
  task: CurrentTask,
  newIsCompleteValue: boolean
): CurrentTask {
  let isComplete: boolean;
  let completedTimestamp: number;

  if (newIsCompleteValue) {
    isComplete = true;
    completedTimestamp = Date.now();
  } else {
    isComplete = false;
    completedTimestamp = null;
  }

  const updatedTask: CurrentTask = { ...task, isComplete, completedTimestamp };

  return updatedTask;
}

export function getCompletedTimestamp(isComplete: boolean): number {
  //
  let completedTimestamp: number = null;

  if (isComplete) {
    completedTimestamp = Date.now();
  }

  return completedTimestamp;
}

import { DataTestIds } from './types';

export const user = {
  email: 'c.c@c.com',
  password: 'password',
} as const;

export interface CurrentTask {
  name: string;
  description: string;
}

export const currentTask1: Readonly<CurrentTask> = {
  name: 'Name1111',
  description: 'Description1111',
};

export const currentTask2: Readonly<CurrentTask> = {
  name: 'Name2222',
  description: 'Description2222',
};

export const currentTask3: Readonly<CurrentTask> = {
  name: 'Name3333',
  description: 'Description3333',
};

export const currentTask4: Readonly<CurrentTask> = {
  name: 'Na1111',
  description: 'Description3333',
};

export const currentTask5: Readonly<CurrentTask> = {
  name: 'Na2222',
  description: 'Description3333',
};

type DataTestIdNames =
  | 'cancelButton'
  | 'descriptionTextarea'
  | 'isCompleteCheckbox'
  | 'nameInput'
  | 'nameInputError'
  | 'submitButton';

const dataTestIds: DataTestIds<DataTestIdNames> = {
  cancelButton: 'cancelButton',
  descriptionTextarea: 'descriptionTextarea',
  isCompleteCheckbox: 'isCompleteCheckbox',
  nameInput: 'nameInput',
  nameInputError: 'nameInputError',
  submitButton: 'submitButton',
} as const;

export function newCurrentTask(task: CurrentTask, isComplete = false) {
  cy.getBySel('new-current-task-button').click();
  cy.location('pathname').should('eq', '/tasks/current/new');
  cy.getBySel(dataTestIds.submitButton).should('be.disabled');
  cy.getBySel(dataTestIds.cancelButton).should('be.enabled');
  cy.getBySel(dataTestIds.nameInput).type(task.name);
  cy.getBySel(dataTestIds.descriptionTextarea).type(task.description);

  if (isComplete) {
    cy.getBySel(dataTestIds.isCompleteCheckbox).click();
  }

  cy.getBySel(dataTestIds.submitButton).should('be.enabled').click();
  cy.location('pathname').should('eq', '/tasks/current');
}

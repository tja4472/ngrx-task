export const user = {
  email: 'c.c@c.com',
  password: 'password',
} as const;

export type CurrentTask = {
  name: string;
  description: string;
};

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

export function newCurrentTask(task: CurrentTask, isComplete = false) {
  cy.getBySel('new-current-task-button').click();
  cy.location('pathname').should('eq', '/tasks/current/new');
  cy.getBySel('submit-button').should('be.disabled');
  cy.getBySel('cancel-button').should('be.enabled');
  cy.getBySel('name-input').type(task.name);
  cy.getBySel('description-textarea').type(task.description);

  if (isComplete) {
    cy.getBySel('is-complete-checkbox').click();
  }

  cy.getBySel('submit-button').should('be.enabled').click();
  cy.location('pathname').should('eq', '/tasks/current');
}

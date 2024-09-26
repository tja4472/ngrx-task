/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { createOutputSpy, MountConfig } from 'cypress/angular-signals';

import { DataTestIds, SpyAliases, SpyIds } from '../types';

// Component to test.
import { TaskListDetailEditComponent } from '@app/task-lists/components/task-list-detail-edit/task-list-detail-edit.component';

import { TaskListListItem } from '@app/models/task-list-list-item.model';

// https://docs.cypress.io/guides/component-testing/angular/overview

/* TaskListDetailEditComponent
  completedTask = input.required<TaskListListItem>();
  cancel = output<TaskListListItem>();
  remove = output<TaskListListItem>();
  checkout = output<TaskListListItem>();
*/

type EventEmitters = 'cancel' | 'checkout' | 'remove';

type DataTestIdNames =
  | 'cancelButton'
  | 'nameInput'
  | 'nameInputError'
  | 'removeButton'
  | 'submitButton';

const spyAliases: SpyAliases<EventEmitters> = {
  cancel: 'cancelSpy',
  checkout: 'checkoutSpy',
  remove: 'removeSpy',
} as const;

const spyIds: SpyIds<EventEmitters> = {
  cancel: '@cancelSpy',
  checkout: '@checkoutSpy',
  remove: '@removeSpy',
} as const;

const dataTestIds: DataTestIds<DataTestIdNames> = {
  cancelButton: 'cancelButton',
  nameInput: 'nameInput',
  nameInputError: 'nameInputError',
  removeButton: 'removeButton',
  submitButton: 'submitButton',
} as const;

const defaultItem: TaskListListItem = {
  id: 'task1',
  name: 'Task1 name',
};

function getConfig(
  completedTask: TaskListListItem
): MountConfig<TaskListDetailEditComponent> {
  const config: MountConfig<TaskListDetailEditComponent> = {
    imports: [BrowserAnimationsModule, CommonModule, ReactiveFormsModule],
    componentProperties: {
      completedTask: completedTask,
      cancel: createOutputSpy<TaskListListItem>(spyAliases.cancel),
      remove: createOutputSpy<TaskListListItem>(spyAliases.remove),
      checkout: createOutputSpy<TaskListListItem>(spyAliases.checkout),
    },
  };

  return config;
}

function mountComponent(todoTask: TaskListListItem) {
  return cy.mount(TaskListDetailEditComponent, getConfig(todoTask));
}

describe('CurrentTaskDetailEditComponent', () => {
  const baseConfig: MountConfig<TaskListDetailEditComponent> = {
    imports: [BrowserAnimationsModule, CommonModule, ReactiveFormsModule],
  };

  it('mounts', () => {
    mountComponent(defaultItem);
  });

  it('unedited item', () => {
    // cy.mount(CurrentTaskDetailEditComponent, getConfig(defaultTask));
    mountComponent(defaultItem);

    cy.getBySel(dataTestIds.cancelButton).should('be.enabled');
    cy.getBySel(dataTestIds.removeButton).should('be.enabled');
    cy.getBySel(dataTestIds.submitButton).should('be.disabled');

    cy.getBySel(dataTestIds.nameInput).should('have.value', defaultItem.name);
  });

  it('submit button: name edited', () => {
    mountComponent(defaultItem);

    cy.getBySel(dataTestIds.nameInput).type('AAAA');
    cy.getBySel(dataTestIds.submitButton).should('be.enabled').click();

    const expected = { ...defaultItem };
    expected.name = defaultItem.name + 'AAAA';
    cy.get(spyIds.checkout).should('have.been.calledWith', expected);
  });

  it('cancel button', () => {
    mountComponent(defaultItem);

    cy.getBySel(dataTestIds.nameInput).type('AAAA');
    cy.getBySel(dataTestIds.cancelButton).should('be.enabled').click();

    cy.get(spyIds.cancel).should('have.been.calledWith', defaultItem);
  });

  it('remove button', () => {
    mountComponent(defaultItem);

    cy.getBySel(dataTestIds.nameInput).type('AAAA');
    cy.getBySel(dataTestIds.removeButton).should('be.enabled').click();

    cy.get(spyIds.remove).should('have.been.calledWith', defaultItem);
  });

  it('blank name error', () => {
    mountComponent(defaultItem);

    cy.getBySel(dataTestIds.nameInputError).should('not.exist');
    cy.getBySel(dataTestIds.nameInput).clear();
    cy.getBySel(dataTestIds.cancelButton).focus();
    cy.getBySel(dataTestIds.submitButton).should('not.be.enabled');
    cy.getBySel(dataTestIds.nameInputError)
      .should('exist')
      .should('be.visible')
      .should('have.text', ' Name is required');
  });
});

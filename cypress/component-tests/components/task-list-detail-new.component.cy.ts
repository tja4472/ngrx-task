import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material';

import { createOutputSpy, MountConfig } from 'cypress/angular';

import { DataTestIds, SpyAliases, SpyIds } from '../types';

// Component to test.
import { TaskListDetailNewComponent } from '@app/task-lists/components';

import { TaskListListItem } from '@app/root-store/tasks-store/models';

// https://docs.cypress.io/guides/component-testing/angular/overview

/* TaskListDetailNewComponent
  @Input() completedTask!: TaskListListItem;
  @Output() cancel = new EventEmitter<TaskListListItem>();
  @Output() remove = new EventEmitter<TaskListListItem>();
  @Output() checkout = new EventEmitter<TaskListListItem>();
*/

type EventEmitters = 'cancel' | 'checkout';

type DataTestIdNames =
  | 'cancelButton'
  | 'nameInput'
  | 'nameInputError'
  | 'submitButton';

const spyAliases: SpyAliases<EventEmitters> = {
  cancel: 'cancelSpy',
  checkout: 'checkoutSpy',
} as const;

const spyIds: SpyIds<EventEmitters> = {
  cancel: '@cancelSpy',
  checkout: '@checkoutSpy',
} as const;

const dataTestIds: DataTestIds<DataTestIdNames> = {
  cancelButton: 'cancelButton',
  nameInput: 'nameInput',
  nameInputError: 'nameInputError',
  submitButton: 'submitButton',
} as const;

const defaultItem: TaskListListItem = {
  id: '',
  name: '',
};

function getConfig(
  completedTask: TaskListListItem
): MountConfig<TaskListDetailNewComponent> {
  const config: MountConfig<TaskListDetailNewComponent> = {
    imports: [
      BrowserAnimationsModule,
      CommonModule,
      ReactiveFormsModule,
      MaterialModule,
    ],
    componentProperties: {
      completedTask: completedTask,
      cancel: createOutputSpy<TaskListListItem>(spyAliases.cancel),
      checkout: createOutputSpy<TaskListListItem>(spyAliases.checkout),
    },
  };

  return config;
}

function mountComponent(todoTask: TaskListListItem) {
  return cy.mount(TaskListDetailNewComponent, getConfig(todoTask));
}

describe('CurrentTaskDetailNewComponent', () => {
  it('mounts', () => {
    mountComponent(defaultItem);
  });

  it('unedited item', () => {
    mountComponent(defaultItem);

    cy.getBySel(dataTestIds.cancelButton).should('be.enabled');
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
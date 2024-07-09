/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material/material.module';

import { createOutputSpy, MountConfig } from 'cypress/angular-signals';

import { DataTestIds, SpyAliases, SpyIds } from '../types';

// Component to test.
import { CurrentTaskDetailEditComponent } from '@app/current-tasks/components/current-task-detail-edit/current-task-detail-edit.component';

import { CurrentTask } from '@app/root-store/tasks-store/models/current-task.model';

// https://docs.cypress.io/guides/component-testing/angular/overview

/* CurrentTaskDetailEditComponent
  @Input() todo!: CurrentTask;
  @Output() cancel = new EventEmitter<CurrentTask>();
  @Output() remove = new EventEmitter<CurrentTask>();
  @Output() checkout = new EventEmitter<CurrentTask>();
*/

type EventEmitters = 'cancel' | 'checkout' | 'remove';

type DataTestIdNames =
  | 'cancelButton'
  | 'descriptionTextarea'
  | 'isCompleteCheckbox'
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
  descriptionTextarea: 'descriptionTextarea',
  isCompleteCheckbox: 'isCompleteCheckbox',
  nameInput: 'nameInput',
  nameInputError: 'nameInputError',
  removeButton: 'removeButton',
  submitButton: 'submitButton',
} as const;

const nowTimestamp = 1618354800000;

const defaultTask: CurrentTask = {
  description: 'Task1 description',
  id: 'task1',
  index: 1,
  isComplete: false,
  completedTimestamp: null,
  name: 'Task1 name',
};

function getConfig(
  todoTask: CurrentTask
): MountConfig<CurrentTaskDetailEditComponent> {
  const config: MountConfig<CurrentTaskDetailEditComponent> = {
    imports: [
      BrowserAnimationsModule,
      CommonModule,
      ReactiveFormsModule,
      MaterialModule,
    ],
    componentProperties: {
      todo: todoTask,
      cancel: createOutputSpy<CurrentTask>(spyAliases.cancel),
      remove: createOutputSpy<CurrentTask>(spyAliases.remove),
      checkout: createOutputSpy<CurrentTask>(spyAliases.checkout),
    },
  };

  return config;
}

function mountComponent(todoTask: CurrentTask) {
  return cy.mount(CurrentTaskDetailEditComponent, getConfig(todoTask));
}

describe('CurrentTaskDetailEditComponent', () => {
  const baseConfig: MountConfig<CurrentTaskDetailEditComponent> = {
    imports: [
      BrowserAnimationsModule,
      CommonModule,
      ReactiveFormsModule,
      MaterialModule,
    ],
  };

  it('mounts', () => {
    mountComponent(defaultTask);
  });

  it('uncompleted task', () => {
    mountComponent(defaultTask);

    cy.getBySel(dataTestIds.cancelButton).should('be.enabled');
    cy.getBySel(dataTestIds.removeButton).should('be.enabled');
    cy.getBySel(dataTestIds.submitButton).should('be.disabled');

    cy.getBySel(dataTestIds.isCompleteCheckbox)
      .find('[type="checkbox"]')
      .should('not.be.checked');
    cy.getBySel(dataTestIds.nameInput).should('have.value', defaultTask.name);
    cy.getBySel(dataTestIds.descriptionTextarea).should(
      'have.value',
      defaultTask.description
    );
  });

  it('completed task', () => {
    const sourceTask: CurrentTask = {
      description: 'Task1 description',
      id: 'task1',
      index: 1,
      isComplete: true,
      completedTimestamp: nowTimestamp,
      name: 'Task1 name',
    };

    mountComponent(sourceTask);
    cy.getBySel(dataTestIds.cancelButton).should('be.enabled');
    cy.getBySel(dataTestIds.removeButton).should('be.enabled');
    cy.getBySel(dataTestIds.submitButton).should('be.disabled');

    cy.getBySel(dataTestIds.isCompleteCheckbox)
      .find('[type="checkbox"]')
      .should('be.checked');
    cy.getBySel(dataTestIds.nameInput).should('have.value', sourceTask.name);
    cy.getBySel(dataTestIds.descriptionTextarea).should(
      'have.value',
      sourceTask.description
    );
  });

  it('edit task', () => {
    mountComponent(defaultTask);

    cy.getBySel(dataTestIds.cancelButton).should('be.enabled');
    cy.getBySel(dataTestIds.removeButton).should('be.enabled');
    cy.getBySel(dataTestIds.submitButton).should('be.disabled');

    cy.getBySel(dataTestIds.isCompleteCheckbox)
      .find('[type="checkbox"]')
      .should('not.be.checked');
    cy.getBySel(dataTestIds.nameInput).type('AAAA');
    cy.getBySel(dataTestIds.submitButton).should('be.enabled');
  });

  it('submit button: name edited', () => {
    mountComponent(defaultTask);

    cy.getBySel(dataTestIds.nameInput).type('AAAA');
    cy.getBySel(dataTestIds.submitButton).should('be.enabled').click();

    const expected = { ...defaultTask };
    expected.name = defaultTask.name + 'AAAA';
    cy.get(spyIds.checkout).should('have.been.calledWith', expected);
  });

  it('submit button: Toggled complete', () => {
    const expected = { ...defaultTask };
    expected.isComplete = true;
    expected.completedTimestamp = nowTimestamp;

    cy.clock(nowTimestamp);
    mountComponent(defaultTask);

    cy.getBySel(dataTestIds.isCompleteCheckbox).click();
    cy.getBySel(dataTestIds.isCompleteCheckbox)
      .find('[type="checkbox"]')
      .should('be.checked');
    cy.getBySel(dataTestIds.submitButton).should('be.enabled').click();

    cy.get(spyIds.checkout).should('have.been.calledWith', expected);
  });

  it('submit button: Toggled uncomplete', () => {
    const source = { ...defaultTask };
    source.isComplete = true;
    source.completedTimestamp = nowTimestamp;

    cy.clock(nowTimestamp);
    mountComponent(source);

    cy.getBySel(dataTestIds.isCompleteCheckbox).click();
    cy.getBySel(dataTestIds.isCompleteCheckbox)
      .find('[type="checkbox"]')
      .should('not.be.checked');
    cy.getBySel(dataTestIds.submitButton).should('be.enabled').click();

    cy.get(spyIds.checkout).should('have.been.calledWith', defaultTask);
  });

  it('blank name error', () => {
    mountComponent(defaultTask);

    cy.getBySel(dataTestIds.nameInputError).should('not.exist');
    cy.getBySel(dataTestIds.nameInput).clear();
    cy.getBySel(dataTestIds.descriptionTextarea).focus();
    cy.getBySel(dataTestIds.submitButton).should('not.be.enabled');
    cy.getBySel(dataTestIds.nameInputError)
      .should('exist')
      .should('be.visible')
      .should('have.text', ' Name is required');
  });

  it('cancel button', () => {
    mountComponent(defaultTask);

    cy.getBySel(dataTestIds.nameInput).type('AAAA');
    cy.getBySel(dataTestIds.descriptionTextarea).type('BBBB');
    cy.getBySel(dataTestIds.cancelButton).should('be.enabled').click();

    cy.get(spyIds.cancel).should('have.been.calledWith', defaultTask);
  });

  it('remove button', () => {
    mountComponent(defaultTask);

    cy.getBySel(dataTestIds.nameInput).type('AAAA');
    cy.getBySel(dataTestIds.descriptionTextarea).type('BBBB');
    cy.getBySel(dataTestIds.removeButton).should('be.enabled').click();

    cy.get(spyIds.remove).should('have.been.calledWith', defaultTask);
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material/material.module';

import { createOutputSpy, MountConfig } from 'cypress/angular';

import { DataTestIds, SpyAliases, SpyIds } from '../types';

// Component to test.
import { CurrentTaskDetailNewComponent } from '@app/current-tasks/components/current-task-detail-new/current-task-detail-new.component';

import { CurrentTask } from '@app/root-store/tasks-store/models/current-task.model';

// https://docs.cypress.io/guides/component-testing/angular/overview

/* CurrentTaskDetailEditComponent
  @Input() todo!: CurrentTask;
  @Output() cancel = new EventEmitter<CurrentTask>();
  @Output() checkout = new EventEmitter<CurrentTask>();
*/

type EventEmitters = 'cancel' | 'checkout';

type DataTestIdNames =
  | 'cancelButton'
  | 'descriptionTextarea'
  | 'isCompleteCheckbox'
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
  descriptionTextarea: 'descriptionTextarea',
  isCompleteCheckbox: 'isCompleteCheckbox',
  nameInput: 'nameInput',
  nameInputError: 'nameInputError',
  submitButton: 'submitButton',
} as const;

const nowTimestamp = 1618354800000;

const inputTask: CurrentTask = {
  description: null,
  id: '',
  index: 0,
  isComplete: false,
  completedTimestamp: null,
  name: '',
};

function getConfig(
  todoTask: CurrentTask
): MountConfig<CurrentTaskDetailNewComponent> {
  const config: MountConfig<CurrentTaskDetailNewComponent> = {
    imports: [
      BrowserAnimationsModule,
      CommonModule,
      ReactiveFormsModule,
      MaterialModule,
    ],
    componentProperties: {
      todo: todoTask,
      cancel: createOutputSpy<CurrentTask>(spyAliases.cancel),
      checkout: createOutputSpy<CurrentTask>(spyAliases.checkout),
    },
  };

  return config;
}

function mountComponent(todoTask: CurrentTask) {
  return cy.mount(CurrentTaskDetailNewComponent, getConfig(todoTask));
}

describe('CurrentTaskDetailEditComponent', () => {
  const baseConfig: MountConfig<CurrentTaskDetailNewComponent> = {
    imports: [
      BrowserAnimationsModule,
      CommonModule,
      ReactiveFormsModule,
      MaterialModule,
    ],
  };

  it('mounts', () => {
    mountComponent(inputTask);
  });

  it('uncompleted task', () => {
    mountComponent(inputTask);

    cy.getBySel(dataTestIds.cancelButton).should('be.enabled');
    cy.getBySel(dataTestIds.submitButton).should('be.disabled');

    cy.getBySel(dataTestIds.isCompleteCheckbox)
      .find('[type="checkbox"]')
      .should('not.be.checked');
    cy.getBySel(dataTestIds.nameInput).should('have.value', '');
    cy.getBySel(dataTestIds.descriptionTextarea).should('have.value', '');
  });

  it('edit task', () => {
    cy.mount(CurrentTaskDetailNewComponent, getConfig(inputTask));

    cy.getBySel(dataTestIds.cancelButton).should('be.enabled');
    cy.getBySel(dataTestIds.submitButton).should('be.disabled');

    cy.getBySel(dataTestIds.isCompleteCheckbox)
      .find('[type="checkbox"]')
      .should('not.be.checked');
    cy.getBySel(dataTestIds.nameInput).type('AAAA');
    cy.getBySel(dataTestIds.submitButton).should('be.enabled');
  });

  it('submit button: name and description edited', () => {
    cy.mount(CurrentTaskDetailNewComponent, getConfig(inputTask));

    cy.getBySel(dataTestIds.nameInput).type('AAAA');
    cy.getBySel(dataTestIds.descriptionTextarea).type('BBBB');
    cy.getBySel(dataTestIds.submitButton).should('be.enabled').click();

    const expected = { ...inputTask };
    expected.name = 'AAAA';
    expected.description = 'BBBB';
    cy.get(spyIds.checkout).should('have.been.calledWith', expected);
  });

  it('submit button: Toggled complete', () => {
    const expected = { ...inputTask };
    expected.name = 'AAAA';
    expected.description = 'BBBB';
    expected.isComplete = true;
    expected.completedTimestamp = nowTimestamp;

    cy.clock(nowTimestamp);
    cy.mount(CurrentTaskDetailNewComponent, getConfig(inputTask));

    cy.getBySel(dataTestIds.nameInput).type('AAAA');
    cy.getBySel(dataTestIds.descriptionTextarea).type('BBBB');
    cy.getBySel(dataTestIds.isCompleteCheckbox).click();
    cy.getBySel(dataTestIds.isCompleteCheckbox)
      .find('[type="checkbox"]')
      .should('be.checked');
    cy.getBySel(dataTestIds.submitButton).should('be.enabled').click();

    cy.get(spyIds.checkout).should('have.been.calledWith', expected);
  });

  it('blank name error', () => {
    cy.mount(CurrentTaskDetailNewComponent, getConfig(inputTask));

    cy.getBySel(dataTestIds.nameInputError).should('not.exist');
    cy.getBySel(dataTestIds.nameInput).focus();
    cy.getBySel(dataTestIds.descriptionTextarea).type('BBBB');
    cy.getBySel(dataTestIds.submitButton).should('not.be.enabled');
    cy.getBySel(dataTestIds.nameInputError)
      .should('exist')
      .should('be.visible')
      .should('have.text', ' Name is required');
  });

  it('cancel button', () => {
    mountComponent(inputTask);

    cy.getBySel(dataTestIds.nameInput).type('AAAA');
    cy.getBySel(dataTestIds.descriptionTextarea).type('BBBB');
    cy.getBySel(dataTestIds.cancelButton).should('be.enabled').click();

    cy.get(spyIds.cancel).should('have.been.calledWith', inputTask);
  });
});

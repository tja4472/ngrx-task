import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material';

import { createOutputSpy, MountConfig } from 'cypress/angular';

import { CurrentTaskDetailNewComponent } from '@app/current-tasks/components';

import { CurrentTask } from '@app/root-store/tasks-store/models';

// https://docs.cypress.io/guides/component-testing/angular/overview

/* CurrentTaskDetailEditComponent
  @Input() todo!: CurrentTask;
  @Output() cancel = new EventEmitter<CurrentTask>();
  @Output() checkout = new EventEmitter<CurrentTask>();
*/

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
      cancel: createOutputSpy('cancelSpy'),
      checkout: createOutputSpy('checkoutSpy'),
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

    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('submit-button').should('be.disabled');

    cy.getBySel('is-complete-checkbox')
      .find('[type="checkbox"]')
      .should('not.be.checked');
    cy.getBySel('name-input').should('have.value', '');
    cy.getBySel('description-textarea').should('have.value', '');
  });

  it('edit task', () => {
    cy.mount(CurrentTaskDetailNewComponent, getConfig(inputTask));

    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('submit-button').should('be.disabled');

    cy.getBySel('is-complete-checkbox')
      .find('[type="checkbox"]')
      .should('not.be.checked');
    cy.getBySel('name-input').type('AAAA');
    cy.getBySel('submit-button').should('be.enabled');
  });

  it('submit button: name and description edited', () => {
    cy.mount(CurrentTaskDetailNewComponent, getConfig(inputTask));

    cy.getBySel('name-input').type('AAAA');
    cy.getBySel('description-textarea').type('BBBB');
    cy.getBySel('submit-button').should('be.enabled').click();

    const expected = { ...inputTask };
    expected.name = 'AAAA';
    expected.description = 'BBBB';
    cy.get('@checkoutSpy').should('have.been.calledWith', expected);
  });

  it('submit button: Toggled complete', () => {
    const expected = { ...inputTask };
    expected.name = 'AAAA';
    expected.description = 'BBBB';
    expected.isComplete = true;
    expected.completedTimestamp = nowTimestamp;

    cy.clock(nowTimestamp);
    cy.mount(CurrentTaskDetailNewComponent, getConfig(inputTask));

    cy.getBySel('name-input').type('AAAA');
    cy.getBySel('description-textarea').type('BBBB');
    cy.getBySel('is-complete-checkbox').click();
    cy.getBySel('is-complete-checkbox')
      .find('[type="checkbox"]')
      .should('be.checked');
    cy.getBySel('submit-button').should('be.enabled').click();

    cy.get('@checkoutSpy').should('have.been.calledWith', expected);
  });

  it('blank name error', () => {
    cy.mount(CurrentTaskDetailNewComponent, getConfig(inputTask));

    cy.getBySel('name-input-error').should('not.exist');
    cy.getBySel('name-input').focus();
    cy.getBySel('description-textarea').type('BBBB');
    cy.getBySel('submit-button').should('not.be.enabled');
    cy.getBySel('name-input-error')
      .should('exist')
      .should('be.visible')
      .should('have.text', ' Name is required');
  });

  it('cancel button', () => {
    mountComponent(inputTask);

    cy.getBySel('name-input').type('AAAA');
    cy.getBySel('description-textarea').type('BBBB');
    cy.getBySel('cancel-button').should('be.enabled').click();

    cy.get('@cancelSpy').should('have.been.calledWith', inputTask);
  });
});

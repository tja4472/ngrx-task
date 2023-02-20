import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material';

import { createOutputSpy, MountConfig } from 'cypress/angular';

import { CurrentTaskDetailEditComponent } from '@app/current-tasks/components';

import { CurrentTask } from '@app/root-store/tasks-store/models';

// https://docs.cypress.io/guides/component-testing/angular/overview

/* CurrentTaskDetailEditComponent
  @Input() todo!: CurrentTask;
  @Output() cancel = new EventEmitter<CurrentTask>();
  @Output() remove = new EventEmitter<CurrentTask>();
  @Output() checkout = new EventEmitter<CurrentTask>();
*/

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
      cancel: createOutputSpy('cancelSpy'),
      remove: createOutputSpy('removeSpy'),
      checkout: createOutputSpy('checkoutSpy'),
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
    // cy.mount(CurrentTaskDetailEditComponent, getConfig(defaultTask));
    mountComponent(defaultTask);

    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('remove-button').should('be.enabled');
    cy.getBySel('submit-button').should('be.disabled');

    cy.getBySel('is-complete-checkbox')
      .find('[type="checkbox"]')
      .should('not.be.checked');
    cy.getBySel('name-input').should('have.value', defaultTask.name);
    cy.getBySel('description-textarea').should(
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

    cy.mount(CurrentTaskDetailEditComponent, getConfig(sourceTask));

    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('remove-button').should('be.enabled');
    cy.getBySel('submit-button').should('be.disabled');

    cy.getBySel('is-complete-checkbox')
      .find('[type="checkbox"]')
      .should('be.checked');
    cy.getBySel('name-input').should('have.value', sourceTask.name);
    cy.getBySel('description-textarea').should(
      'have.value',
      sourceTask.description
    );
  });

  it('edit task', () => {
    cy.mount(CurrentTaskDetailEditComponent, getConfig(defaultTask));

    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('remove-button').should('be.enabled');
    cy.getBySel('submit-button').should('be.disabled');

    cy.getBySel('is-complete-checkbox')
      .find('[type="checkbox"]')
      .should('not.be.checked');
    cy.getBySel('name-input').type('AAAA');
    cy.getBySel('submit-button').should('be.enabled');
  });

  it('submit button: name edited', () => {
    cy.mount(CurrentTaskDetailEditComponent, getConfig(defaultTask));

    cy.getBySel('name-input').type('AAAA');
    cy.getBySel('submit-button').should('be.enabled').click();

    const expected = { ...defaultTask };
    expected.name = defaultTask.name + 'AAAA';
    cy.get('@checkoutSpy').should('have.been.calledWith', expected);
  });

  it('submit button: Toggled complete', () => {
    const expected = { ...defaultTask };
    expected.isComplete = true;
    expected.completedTimestamp = nowTimestamp;

    cy.clock(nowTimestamp);
    cy.mount(CurrentTaskDetailEditComponent, getConfig(defaultTask));

    cy.getBySel('is-complete-checkbox').click();
    cy.getBySel('is-complete-checkbox')
      .find('[type="checkbox"]')
      .should('be.checked');
    cy.getBySel('submit-button').should('be.enabled').click();

    cy.get('@checkoutSpy').should('have.been.calledWith', expected);
  });

  it('submit button: Toggled uncomplete', () => {
    const source = { ...defaultTask };
    source.isComplete = true;
    source.completedTimestamp = nowTimestamp;

    cy.clock(nowTimestamp);
    cy.mount(CurrentTaskDetailEditComponent, getConfig(source));

    cy.getBySel('is-complete-checkbox').click();
    cy.getBySel('is-complete-checkbox')
      .find('[type="checkbox"]')
      .should('not.be.checked');
    cy.getBySel('submit-button').should('be.enabled').click();

    cy.get('@checkoutSpy').should('have.been.calledWith', defaultTask);
  });

  it('blank name error', () => {
    cy.mount(CurrentTaskDetailEditComponent, getConfig(defaultTask));

    cy.getBySel('name-input-error').should('not.exist');
    cy.getBySel('name-input').clear();
    cy.getBySel('description-textarea').focus();
    cy.getBySel('submit-button').should('not.be.enabled');
    cy.getBySel('name-input-error')
      .should('exist')
      .should('be.visible')
      .should('have.text', ' Name is required');
  });

  it('cancel button', () => {
    mountComponent(defaultTask);

    cy.getBySel('name-input').type('AAAA');
    cy.getBySel('description-textarea').type('BBBB');
    cy.getBySel('cancel-button').should('be.enabled').click();

    cy.get('@cancelSpy').should('have.been.calledWith', defaultTask);
  });

  it('remove button', () => {
    mountComponent(defaultTask);

    cy.getBySel('name-input').type('AAAA');
    cy.getBySel('description-textarea').type('BBBB');
    cy.getBySel('remove-button').should('be.enabled').click();

    cy.get('@removeSpy').should('have.been.calledWith', defaultTask);
  });
});

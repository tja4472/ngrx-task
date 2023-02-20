import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material';

import { MountConfig } from 'cypress/angular';

import { CurrentTaskDetailEditComponent } from '@app/current-tasks/components';
import { CurrentTaskDetailEditPageComponent } from '@app/current-tasks/containers';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CurrentTaskDetailEditPageActions } from '@app/root-store/tasks-store/actions';
import { CurrentTask } from '@app/root-store/tasks-store/models';
import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

// https://docs.cypress.io/guides/component-testing/angular/overview

const defaultTask: CurrentTask = {
  description: 'Task1 description',
  id: 'task1',
  index: 1,
  isComplete: false,
  completedTimestamp: null,
  name: 'Task1 name',
};

function getConfig(
  sourceTask: CurrentTask
): MountConfig<CurrentTaskDetailEditPageComponent> {
  const config: MountConfig<CurrentTaskDetailEditPageComponent> = {
    imports: [
      BrowserAnimationsModule,
      CommonModule,
      ReactiveFormsModule,
      MaterialModule,
    ],
    declarations: [CurrentTaskDetailEditComponent],
    providers: [
      provideMockStore({
        selectors: [
          {
            selector: TaskSelectors.selectCurrentTaskFromRoute,
            value: sourceTask,
          },
        ],
      }),
    ],
  };

  return config;
}

function mountComponent(sourceTask: CurrentTask) {
  return cy.mount(CurrentTaskDetailEditPageComponent, getConfig(sourceTask));
}

describe('CurrentTaskDetailEditComponent', () => {
  it('mounts', () => {
    mountComponent(defaultTask).then(() => {
      const store = TestBed.inject(MockStore);
      expect(store).to.be.an('object');
    });
  });

  it('Cancel button', () => {
    mountComponent(defaultTask).then(() => {
      const store = TestBed.inject(MockStore);
      cy.spy(store, 'dispatch');

      cy.getBySel('name-input').should('be.visible').type('aa');
      cy.getBySel('description-textarea').should('be.visible').type('bb');
      cy.getBySel('cancel-button')
        .click()
        .then(() => {
          expect(store.dispatch).to.have.been.called;

          const action = CurrentTaskDetailEditPageActions.cancelled({
            currentTask: defaultTask,
          });
          expect(store.dispatch).to.have.been.calledOnceWith(action);
        });
    });
  });

  it('Remove button', () => {
    mountComponent(defaultTask).then(() => {
      const store = TestBed.inject(MockStore);
      cy.spy(store, 'dispatch');

      cy.getBySel('name-input').should('be.visible').type('aa');
      cy.getBySel('description-textarea').should('be.visible').type('bb');
      cy.getBySel('remove-button')
        .click()
        .then(() => {
          expect(store.dispatch).to.have.been.called;

          const action = CurrentTaskDetailEditPageActions.removed({
            currentTask: defaultTask,
          });
          expect(store.dispatch).to.have.been.calledOnceWith(action);
        });
    });
  });

  it('Submit button', () => {
    mountComponent(defaultTask).then(() => {
      const store = TestBed.inject(MockStore);
      cy.spy(store, 'dispatch');

      cy.getBySel('name-input').should('be.visible').type('aa');
      cy.getBySel('description-textarea').should('be.visible').type('bb');

      cy.getBySel('submit-button')
        .click()
        .then(() => {
          const expectedCompletedTask: CurrentTask = {
            ...defaultTask,
            description: 'Task1 descriptionbb',
            name: 'Task1 nameaa',
          };

          expect(store.dispatch).to.have.been.called;

          const action = CurrentTaskDetailEditPageActions.saved({
            currentTask: expectedCompletedTask,
          });
          expect(store.dispatch).to.have.been.calledOnceWith(action);
        });
    });
  });
});

/* eslint-disable @typescript-eslint/unbound-method */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material/material.module';

import { MountConfig } from 'cypress/angular-signals';

import { CurrentTaskDetailEditComponent } from '@app/current-tasks/components/current-task-detail-edit/current-task-detail-edit.component';
import { CurrentTaskDetailEditPageComponent } from '@app/current-tasks/containers/current-task-detail-edit-page/current-task-detail-edit-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as CurrentTaskDetailEditPageActions from '@app/root-store/tasks-store/actions/current-task-detail-edit-page.actions';

import { CurrentTask } from '@app/root-store/tasks-store/models/current-task.model';
import * as TaskSelectors from '@app/root-store/tasks-store/selectors/task.selectors';

import { DataTestIds } from '../types';

type DataTestIdNames =
  | 'cancelButton'
  | 'descriptionTextarea'
  | 'isCompleteCheckbox'
  | 'nameInput'
  | 'nameInputError'
  | 'removeButton'
  | 'submitButton';

const dataTestIds: DataTestIds<DataTestIdNames> = {
  cancelButton: 'cancelButton',
  descriptionTextarea: 'descriptionTextarea',
  isCompleteCheckbox: 'isCompleteCheckbox',
  nameInput: 'nameInput',
  nameInputError: 'nameInputError',
  removeButton: 'removeButton',
  submitButton: 'submitButton',
} as const;

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

      cy.getBySel(dataTestIds.nameInput).should('be.visible').type('aa');
      cy.getBySel(dataTestIds.descriptionTextarea)
        .should('be.visible')
        .type('bb');
      cy.getBySel(dataTestIds.cancelButton).click();
      cy.getBySel(dataTestIds.cancelButton).then(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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

      cy.getBySel(dataTestIds.nameInput).should('be.visible').type('aa');
      cy.getBySel(dataTestIds.descriptionTextarea)
        .should('be.visible')
        .type('bb');
      cy.getBySel(dataTestIds.removeButton).click();
      cy.getBySel(dataTestIds.removeButton).then(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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

      cy.getBySel(dataTestIds.nameInput).should('be.visible').type('aa');
      cy.getBySel(dataTestIds.descriptionTextarea)
        .should('be.visible')
        .type('bb');

      cy.getBySel(dataTestIds.submitButton).click();
      cy.getBySel(dataTestIds.submitButton).then(() => {
        const expectedCompletedTask: CurrentTask = {
          ...defaultTask,
          description: 'Task1 descriptionbb',
          name: 'Task1 nameaa',
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(store.dispatch).to.have.been.called;

        const action = CurrentTaskDetailEditPageActions.saved({
          currentTask: expectedCompletedTask,
        });
        expect(store.dispatch).to.have.been.calledOnceWith(action);
      });
    });
  });
});

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompletedTaskDetailEditComponent } from '@app/completed-tasks/components/completed-task-detail-edit/completed-task-detail-edit.component';
import { CompletedTaskDetailEditPageComponent } from '@app/completed-tasks/containers/completed-task-detail-edit-page/completed-task-detail-edit-page.component';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as CompletedTaskDetailEditPageActions from '@app/root-store/tasks-store/actions/completed-task-detail-edit-page.actions';

import { CompletedTask } from '@app/root-store/tasks-store/models/completed-task.model';
import * as TaskSelectors from '@app/root-store/tasks-store/selectors/task.selectors';

const originalCompletedTask: CompletedTask = {
  description: 'Task1 description',
  id: 'task1',
  isComplete: true,
  completedTimestamp: 456,
  name: 'Task1 name',
  updatedTimestamp: 567,
};

describe('CompletedTaskDetailEditPageComponent - mounts', () => {
  it('mounts', () => {
    let store: MockStore;

    cy.mount(
      `<app-completed-task-detail-edit-page></app-completed-task-detail-edit-page>`,
      {
        imports: [
          BrowserAnimationsModule,
          CommonModule,
          ReactiveFormsModule,

          CompletedTaskDetailEditComponent,
          CompletedTaskDetailEditPageComponent,
        ],
        declarations: [],
        providers: [
          provideMockStore({
            selectors: [
              {
                selector: TaskSelectors.selectCompletedTaskFromRoute,
                value: originalCompletedTask,
              },
            ],
          }),
        ],
      }
    ).then(() => {
      store = TestBed.inject(MockStore);
      expect(store).to.be.an('object');
    });
  });
});

describe('CompletedTaskDetailEditPageComponent - main', () => {
  let store: MockStore;

  beforeEach(() => {
    cy.mount(
      `<app-completed-task-detail-edit-page></app-completed-task-detail-edit-page>`,
      {
        imports: [
          BrowserAnimationsModule,
          CommonModule,
          ReactiveFormsModule,
          CompletedTaskDetailEditComponent,
          CompletedTaskDetailEditPageComponent,
        ],
        declarations: [],
        providers: [
          provideMockStore({
            selectors: [
              {
                selector: TaskSelectors.selectCompletedTaskFromRoute,
                value: originalCompletedTask,
              },
            ],
          }),
        ],
      }
    ).then(() => {
      store = TestBed.inject(MockStore);
      expect(store).to.be.an('object');
    });
  });

  it('CompletedTaskDetailEditPageActions.cancelled action', () => {
    cy.spy(store, 'dispatch');

    cy.getBySel('name-input').should('be.visible').type('aa');
    cy.getBySel('description-textarea').should('be.visible').type('bb');
    cy.getBySel('cancel-button').click();
    cy.getBySel('cancel-button').then(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(store.dispatch).to.have.been.called;

      const action = CompletedTaskDetailEditPageActions.cancelled({
        completedTask: originalCompletedTask,
      });
      expect(store.dispatch).to.have.been.calledOnceWith(action);
    });
  });

  it('CompletedTaskDetailEditPageActions.removed action', () => {
    cy.spy(store, 'dispatch');

    cy.getBySel('name-input').should('be.visible').type('aa');
    cy.getBySel('description-textarea').should('be.visible').type('bb');
    cy.getBySel('remove-button').click();
    cy.getBySel('remove-button').then(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(store.dispatch).to.have.been.called;

      const action = CompletedTaskDetailEditPageActions.removed({
        completedTask: originalCompletedTask,
      });
      expect(store.dispatch).to.have.been.calledOnceWith(action);
    });
  });

  it('CompletedTaskDetailEditPageActions.saved action', () => {
    cy.spy(store, 'dispatch');

    cy.getBySel('name-input').should('be.visible').type('aa');
    cy.getBySel('description-textarea').should('be.visible').type('bb');
    cy.getBySel('submit-button').click();
    cy.getBySel('submit-button').then(() => {
      const expectedCompletedTask: CompletedTask = {
        ...originalCompletedTask,
        description: 'Task1 descriptionbb',
        name: 'Task1 nameaa',
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(store.dispatch).to.have.been.called;

      const action = CompletedTaskDetailEditPageActions.saved({
        completedTask: expectedCompletedTask,
      });
      expect(store.dispatch).to.have.been.calledOnceWith(action);
    });
  });
});

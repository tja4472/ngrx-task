/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { createOutputSpy, MountConfig } from 'cypress/angular-signals';
import Sinon from 'cypress/types/sinon';

import { DataTestIds, SpyAliases, SpyIds } from '../types';

// Component to test.
import { SearchComponent } from '@app/completed-tasks/components/search/search.component';

// https://docs.cypress.io/guides/component-testing/angular/overview

/* SearchComponent
  searchText = input.required<string>();
  search = output<string>();
*/

type EventEmitters = 'search';

type DataTestIdNames = 'clearButton' | 'searchInput';

const spyAliases: SpyAliases<EventEmitters> = {
  search: 'searchSpy',
} as const;

const spyIds: SpyIds<EventEmitters> = {
  search: '@searchSpy',
} as const;

const dataTestIds: DataTestIds<DataTestIdNames> = {
  clearButton: 'clearButton',
  searchInput: 'searchInput',
} as const;

function getConfig(searchText: string): MountConfig<SearchComponent> {
  const config: MountConfig<SearchComponent> = {
    imports: [BrowserAnimationsModule, CommonModule, ReactiveFormsModule],
    componentProperties: {
      searchText,
      search: createOutputSpy<string>(spyAliases.search),
    },
  };

  return config;
}

function mountComponent(searchText: string) {
  return cy.mount(SearchComponent, getConfig(searchText));
}

describe('SearchComponent', () => {
  it('mounts', () => {
    mountComponent('');
  });

  it('correct search text', () => {
    const inputText = 'AB';

    mountComponent(inputText);

    cy.getBySel(dataTestIds.searchInput).should('have.value', inputText);
  });

  it('clears search text', () => {
    const inputText = 'AB';

    mountComponent(inputText);

    cy.getBySel(dataTestIds.clearButton).should('be.enabled').click();
    cy.getBySel(dataTestIds.searchInput).should('have.value', '');
  });

  it('should not emit', () => {
    const inputText = 'AB';

    mountComponent(inputText);

    cy.getBySel(dataTestIds.searchInput).should('have.value', inputText);
    cy.get(spyIds.search).should('not.have.been.called');
  });

  it('should emit once', () => {
    const inputText = 'ABCDE';

    mountComponent(inputText);

    cy.getBySel(dataTestIds.searchInput).should('have.value', inputText);
    cy.get(spyIds.search).should('have.been.calledOnceWith', inputText);
  });

  it('should emit 4 times(A)', () => {
    const inputText = 'ABCDE';

    mountComponent('');

    cy.getBySel(dataTestIds.searchInput).type(inputText, { delay: 1000 });
    cy.get(spyIds.search).should('have.callCount', 4);
    cy.get(spyIds.search).should('have.been.calledWithExactly', '');
    cy.get(spyIds.search).should('have.been.calledWithExactly', 'ABC');
    cy.get(spyIds.search).should('have.been.calledWithExactly', 'ABCD');
    cy.get(spyIds.search).should('have.been.calledWithExactly', 'ABCDE');
  });

  it('should emit 4 times(B)', () => {
    const inputText = 'ABCDE';

    mountComponent('');

    cy.getBySel(dataTestIds.searchInput).type(inputText, { delay: 1000 });

    cy.get(spyIds.search).should((a) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const spy = a as unknown as Sinon.SinonSpy;
      expect(spy.callCount).to.be.equal(4);
      expect(spy.getCall(0).args[0]).to.be.equal('');
      expect(spy.getCall(1).args[0]).to.be.equal('ABC');
      expect(spy.getCall(2).args[0]).to.be.equal('ABCD');
      expect(spy.getCall(3).args[0]).to.be.equal('ABCDE');
    });
  });
});

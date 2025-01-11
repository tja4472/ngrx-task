import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import * as HomePageActions from '../actions/home-page.actions';

@Component({
  selector: 'app-home-page',
  template: `
    Home Page - Latest

    <button data-test="sign-out-button" (click)="viewSignOutClicked()">
      Sign Out
    </button>
  `,
  styles: [],
  standalone: true,
})
export class HomePageComponent {
  private readonly store = inject(Store);

  viewSignOutClicked() {
    this.store.dispatch(HomePageActions.signOut());
  }
}

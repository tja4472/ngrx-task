import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import * as HomePageActions from '../actions/home-page.actions';

@Component({
  selector: 'app-home-page',
  template: `
    Home Page

    <button data-test="sign-out-button" (click)="viewSignOutClicked()">
      Sign Out
    </button>
  `,
  styles: [],
  standalone: true,
})
export class HomePageComponent {
  constructor(private readonly store: Store) {}

  viewSignOutClicked() {
    this.store.dispatch(HomePageActions.signOut());
  }
}

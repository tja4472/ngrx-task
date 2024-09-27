import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sign-in-page-component-store.component').then(
        (m) => m.SignInPageComponentStoreComponent
      ),
  },
];

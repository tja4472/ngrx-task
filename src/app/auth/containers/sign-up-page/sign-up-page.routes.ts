import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sign-up-page.component').then((m) => m.SignUpPageComponent),
  },
];

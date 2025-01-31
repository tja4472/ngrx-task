import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./signals-page.component').then((m) => m.SignalsPageComponent),
  },
];

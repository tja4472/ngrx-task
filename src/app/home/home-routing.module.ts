/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routeNames } from '@app/app-route-names';

const routes: Routes = [
  {
    path: routeNames.home.path,
    loadComponent: () =>
      import('./containers/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

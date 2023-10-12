/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routeNames } from '@app/app-route-names';

const routes: Routes = [
  {
    path: routeNames.signIn.path,
    loadChildren: () =>
      import('./containers/sign-in-page/sign-in-page.module').then(
        (m) => m.SignInPageComponentModule
      ),
  },
  {
    path: routeNames.signInComponentStore.path,
    loadChildren: () =>
      import(
        './containers/sign-in-page-component-store/sign-in-page-component-store.module'
      ).then((m) => m.SignInPageComponentStoreComponentModule),
  },
  {
    path: routeNames.signUp.path,
    loadChildren: () =>
      import('./containers/sign-up-page/sign-up-page.module').then(
        (m) => m.SignUpPageComponentModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

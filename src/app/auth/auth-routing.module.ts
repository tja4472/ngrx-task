import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./containers/sign-in-page').then(
        (m) => m.SignInPageComponentModule
      ),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./containers/sign-up-page').then(
        (m) => m.SignUpPageComponentModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

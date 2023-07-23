/* eslint-disable @typescript-eslint/no-extraneous-class */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignInPageComponentStoreRoutingModule } from './sign-in-page-component-store-routing.module';
import { SignInPageComponentStoreComponent } from './sign-in-page-component-store.component';

import { CredentialsFormComponent } from '@app/auth/components/credentials-form/credentials-form.component';

@NgModule({
  imports: [
    CommonModule,
    CredentialsFormComponent,
    SignInPageComponentStoreRoutingModule,
  ],
  declarations: [SignInPageComponentStoreComponent],
})
export class SignInPageComponentStoreComponentModule {}

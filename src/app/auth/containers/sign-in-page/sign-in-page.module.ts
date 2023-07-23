/* eslint-disable @typescript-eslint/no-extraneous-class */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignInPageRoutingModule } from './sign-in-page-routing.module';
import { SignInPageComponent } from './sign-in-page.component';

import { CredentialsFormComponent } from '@app/auth/components/credentials-form/credentials-form.component';

@NgModule({
  imports: [CommonModule, CredentialsFormComponent, SignInPageRoutingModule],
  declarations: [SignInPageComponent],
})
export class SignInPageComponentModule {}

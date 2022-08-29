import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignUpPageRoutingModule } from './sign-up-page-routing.module';
import { SignUpPageComponent } from './sign-up-page.component';

import { CredentialsFormComponent } from '@app/auth/components/credentials-form/credentials-form.component';

@NgModule({
  imports: [CommonModule, CredentialsFormComponent, SignUpPageRoutingModule],
  declarations: [SignUpPageComponent],
})
export class SignUpPageComponentModule {}

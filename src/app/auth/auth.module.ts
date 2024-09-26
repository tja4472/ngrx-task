/* eslint-disable @typescript-eslint/no-extraneous-class */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthRoutingModule } from '@app/auth/auth-routing.module';
import { AuthEffects } from '@app/auth/effects/auth.effects';
import { authFeatureKey, authReducers } from '@app/auth/reducers';

import { SignoutConfirmationDialogComponent } from './components/signout-confirmation-dialog/signout-confirmation-dialog.component';

export const COMPONENTS = [SignoutConfirmationDialogComponent];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    StoreModule.forFeature(authFeatureKey, authReducers),
    EffectsModule.forFeature([AuthEffects]),
    ...COMPONENTS,
  ],
})
export class AuthModule {}

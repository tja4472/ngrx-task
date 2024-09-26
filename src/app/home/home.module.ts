/* eslint-disable @typescript-eslint/no-extraneous-class */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HomePageComponent } from './containers/home-page.component';
import { HomeEffects } from './effects/home.effects';
import { HomeRoutingModule } from './home-routing.module';
import * as fromHome from './reducers/home.reducer';

export const COMPONENTS = [HomePageComponent];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    StoreModule.forFeature(fromHome.homeFeatureKey, fromHome.reducer),
    EffectsModule.forFeature([HomeEffects]),
    ...COMPONENTS,
  ],
})
export class HomeModule {}

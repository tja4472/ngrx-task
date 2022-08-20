import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserStoreEffects } from './effects';
import { userStoreFeatureKey, reducer } from './user-store.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(userStoreFeatureKey, reducer),
    EffectsModule.forFeature([UserStoreEffects]),
  ],
  providers: [],
})
export class UserStoreModule {}

/* eslint-disable @typescript-eslint/no-extraneous-class */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidenavComponent } from '@app/core/components/sidenav/sidenav.component';
import { AppComponent } from '@app/core/containers/app.component';
import { NotFoundPageComponent } from '@app/core/containers/not-found-page.component';
import { MaterialModule } from '@app/material/material.module';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  SidenavComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {}

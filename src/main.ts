import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

import { AppComponent } from '@app/core/containers/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => {
    // For Cypress app actions
    if (window.Cypress) {
      // and save the application reference
      window.appRef = appRef;
    }
  })
  .catch((e: unknown) => {
    console.error(e);
  });

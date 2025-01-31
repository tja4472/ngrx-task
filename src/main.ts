import { inject, runInInjectionContext } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

import { AppComponent } from '@app/core/containers/app.component';

import { AppActionsService } from '@app/services/app-actions.service';

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => {
    // tree shakeable when it's false
    // https://medium.com/netanelbasal/explore-angular-clis-define-option-effortless-global-identifier-replacement-f08fec7d9243
    if (DEBUG) {
      console.log('Debug mode enabled');
      // For Cypress app actions
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (window.Cypress) {
        // and save the application reference
        window.appRef = appRef;

        runInInjectionContext(appRef.injector, () => {
          //
          const x = inject(AppActionsService);
          console.log('HHHAAAAA>', x.property);
          window.AppActionsService = x;
        });
      }
    }
  })
  .catch((e: unknown) => {
    console.error(e);
  });

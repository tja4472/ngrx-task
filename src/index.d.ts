import { ApplicationRef } from '@angular/core';

import { AppActionsService } from '@app/services/app-actions.service';

declare global {
  // angular.json define option
  declare const DEBUG: boolean;

  // For Cypress app actions
  interface Window {
    Cypress?: unknown;
    appRef?: ApplicationRef;
    AppActionsService?: AppActionsService;
  }
}

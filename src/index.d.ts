import { ApplicationRef } from '@angular/core';

import { AppActionsService } from '@app/services/app-actions.service';

// For Cypress app actions
declare global {
  interface Window {
    Cypress?: unknown;
    appRef?: ApplicationRef;
    AppActionsService?: AppActionsService;
  }
}

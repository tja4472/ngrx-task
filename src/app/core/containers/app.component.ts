import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  OnInit,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

import { AppActionsService } from '@app/services/app-actions.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <app-sidenav></app-sidenav> `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    // analytics: AngularFireAnalytics,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    // For Cypress app actions
    private appActionsService: AppActionsService
  ) // logUpdateService: LogUpdateService
  {
    // const dummy = appActionsService.property;
    // analytics.logEvent('start_game', { level: '10', difficulty: 'expert' });
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then((updateAvailable) => {
        if (updateAvailable) {
          this.snackBar
            .open('New update is available', 'Refresh page')
            .onAction()
            .subscribe(() => {
              window.location.reload();
            });
        }
      });
    }
    /*      
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        const snack = this.snackBar.open('Update Available', 'Reload', {
          duration: 6000,
        });

        snack.onAction().subscribe(() => {
          window.location.reload();
        });
      });
    }
*/
  }
}

@Injectable({
  providedIn: 'root',
})
export class LogUpdateService {
  constructor(updates: SwUpdate) {
    updates.versionUpdates.subscribe((evt) => {
      console.log('LogUpdateService>', evt.type);
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(
            `New app version ready for use: ${evt.latestVersion.hash}`
          );
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(
            `Failed to install app version '${evt.version.hash}': ${evt.error}`
          );
          break;
      }
    });
  }
}

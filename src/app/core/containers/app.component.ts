import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-sidenav></app-sidenav>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        const snack = this.snackbar.open('Update Available', 'Reload', {
          duration: 6000,
        });

        snack.onAction().subscribe(() => {
          window.location.reload();
        });
      });
    }
  }
}

import { Component } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

/**
 * The dialog will close with true if user clicks the ok button,
 * otherwise it will close with undefined.
 */
@Component({
  template: `
    <h2 mat-dialog-title>Signout</h2>
    <mat-dialog-content>Are you sure you want to signout?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button data-test="cancel-button" [mat-dialog-close]="false">
        Cancel
      </button>
      <button mat-button data-test="ok-button" [mat-dialog-close]="true">
        OK
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        max-width: 300px;
      }

      /* TODO(mdc-migration): The following rule targets internal classes of dialog that may no longer apply for the MDC version. */
      mat-dialog-actions {
        display: flex;
        justify-content: flex-end;
      }

      [mat-button] {
        padding: 0;
      }
    `,
  ],
  imports: [
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class SignoutConfirmationDialogComponent {}

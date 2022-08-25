import {
  SignInFormComponent,
  SignInFormComponentModule,
} from '@app/auth/components/sign-in-form';

import { Credentials } from '@app/auth/models/credentials.model';

import { createOutputSpy } from 'cypress/angular';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignInFormComponent', () => {
  it('mounts', () => {
    cy.mount(`<app-sign-in-form></app-sign-in-form>`, {
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
      ],
      declarations: [SignInFormComponent],
    });
  });

  it('pending false', () => {
    cy.mount(`<app-sign-in-form [pending]="false"></app-sign-in-form>`, {
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
      ],
      declarations: [SignInFormComponent],
    });

    cy.getBySel('sign-in-button').should('be.visible').should('be.disabled');
    cy.getBySel('sign-up-button').should('be.visible').should('be.enabled');
    cy.getBySel('username-field').should('be.visible').should('be.enabled');
    /*
<input 
  _ngcontent-ygr-c152="" 
  data-test="username-field" 
  matinput="" 
  id="username" 
  data-testid="username" 
  formcontrolname="username" 
  required="" 
  class="mat-input-element mat-form-field-autofill-control ng-tns-c116-1 cdk-text-field-autofill-monitored ng-dirty ng-valid ng-touched cdk-text-field-autofilled"
  ng-reflect-id="username" 
  ng-reflect-placeholder="User Name"
  ng-reflect-required="" 
  ng-reflect-name="username" 
  data-placeholder="User Name" 
  aria-required="true" 
  aria-invalid="false">      
*/
    // angular material
    cy.getBySel('username-field').should(
      'have.attr',
      'ng-reflect-placeholder',
      'User Name'
    );
  });

  it('submitted output', () => {
    cy.mount(
      `<app-sign-in-form [pending]="false" (submitted)="submitted.emit($event)"></app-sign-in-form>`,
      {
        imports: [
          BrowserModule,
          BrowserAnimationsModule,
          CommonModule,
          MatCardModule,
          MatInputModule,
          MatButtonModule,
          ReactiveFormsModule,
        ],
        declarations: [SignInFormComponent],
        componentProperties: {
          submitted: createOutputSpy<Credentials>('submittedSpy'),
        },
      }
    );

    const expectedSubmiitedResponse: Credentials = {
      username: 'Fred',
      password: 'passwordAA',
    };

    cy.getBySel('username-field')
      .should('be.visible')
      .type(expectedSubmiitedResponse.username);
    cy.getBySel('password-field')
      .should('be.visible')
      .type(expectedSubmiitedResponse.password);
    cy.getBySel('sign-in-button').click();

    cy.get('@submittedSpy').should('have.been.called');
    cy.get('@submittedSpy').should(
      'have.been.calledWith',
      expectedSubmiitedResponse
    );
  });

  it('SignUpClicked output', () => {
    cy.mount(
      `<app-sign-in-form [pending]="false" (SignUpClicked)="SignUpClicked.emit($event)"></app-sign-in-form>`,
      {
        imports: [
          BrowserModule,
          BrowserAnimationsModule,
          SignInFormComponentModule,
        ],
        // declarations: [SignInFormComponent],
        componentProperties: {
          SignUpClicked: createOutputSpy('SignUpClickedSpy'),
        },
      }
    );

    cy.getBySel('sign-up-button').click();

    cy.get('@SignUpClickedSpy').should('have.been.called');
  });
});

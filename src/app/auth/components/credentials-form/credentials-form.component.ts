import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Credentials } from '@app/auth/models/credentials.model';

@Component({
  selector: 'app-credentials-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.css'],
})
export class CredentialsFormComponent {
  @Input()
  set formMode(mode: string) {
    if (mode === 'SignInForm') {
      this.isSignInForm = true;
      this.isSignUpForm = false;
    }

    if (mode === 'SignUpForm') {
      this.isSignInForm = false;
      this.isSignUpForm = true;
    }
  }

  @Input()
  errorMessage: string | null;

  @Output()
  readonly SignUpClicked = new EventEmitter();

  @Output()
  readonly submitted = new EventEmitter<Credentials>();

  get viewForm() {
    return this.form;
  }

  isSignInForm = true;
  isSignUpForm = false;

  get password() {
    return this.form.controls.password;
  }
  get username() {
    return this.form.controls.username;
  }

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  viewSignUpClick() {
    this.SignUpClicked.emit();
  }

  viewOnSubmit() {
    const value: Credentials | null = this.checkout();

    if (value === null) return;

    this.submitted.emit(value);
  }

  // ====

  checkout(): Credentials | null {
    if (
      this.form.value.password === undefined ||
      this.form.value.username === undefined
    ) {
      return null;
    }

    const credentials: Credentials = {
      password: this.form.value.password,
      username: this.form.value.username,
    };

    return credentials;
  }
  // ====
}

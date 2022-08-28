import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Credentials } from '@app/auth/models/credentials.model';

@Injectable()
export class SignInFormPresenter {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  init() {
    /*    
    this.form = this.formBuilder.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
*/
  }

  disable() {
    this.form.disable();
  }

  enable() {
    this.form.enable();
  }

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
}

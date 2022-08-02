import { Injectable } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { Credentials } from '@app/auth/models/credentials.model';

@Injectable()
export class SignUpFormPresenter {
  form: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {}

  init() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  disable() {
    this.form.disable();
  }

  enable() {
    this.form.enable();
  }

  checkout(): Credentials {
    const todoData: Credentials = { ...this.form.value };
    // this.form.reset();

    return todoData;
  }
}

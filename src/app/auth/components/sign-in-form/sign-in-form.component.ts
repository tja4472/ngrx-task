import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Credentials } from '@app/auth/models/credentials.model';

import { SignInFormPresenter } from './sign-in-form.presenter';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css'],
  viewProviders: [SignInFormPresenter],
})
export class SignInFormComponent {
  @Input()
  errorMessage: string | null;

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.presenter.disable();
    } else {
      this.presenter.enable();
    }
  }

  @Output()
  readonly SignUpClicked = new EventEmitter();

  @Output()
  readonly submitted = new EventEmitter<Credentials>();

  get viewForm() {
    return this.presenter.form;
  }

  get password() { return this.presenter.form.controls.password;}
  get username() { return this.presenter.form.controls.username;}

  constructor(private presenter: SignInFormPresenter) {
    this.presenter.init();
  }

  viewSignUpClick() {
    this.SignUpClicked.emit();
  }

  viewOnSubmit() {
    const value: Credentials | null = this.presenter.checkout();

    if (value === null) return;

    this.submitted.emit(value);
  }
}

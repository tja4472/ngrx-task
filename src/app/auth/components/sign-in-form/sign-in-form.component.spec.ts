/**
 * @jest-environment jsdom
 */
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { SignInFormComponent } from './sign-in-form.component';

import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

async function setup({
  errorMessage = null,
  pending = false,
  submittedSpy = jest.fn(),
  signUpClickedSpy = jest.fn(),
}: {
  errorMessage?: null | string | undefined;
  pending?: boolean | undefined;
  submittedSpy?: jest.Mock<any, any> | undefined;
  signUpClickedSpy?: jest.Mock<any, any> | undefined;
}) {
  const view = await render(SignInFormComponent, {
    imports: [
      MatCardModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
    ],
    componentProperties: {
      errorMessage,
      pending,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      SignUpClicked: {
        emit: signUpClickedSpy,
      } as any,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      submitted: {
        emit: submittedSpy,
      } as any,
    },
  });

  const userNameControl = screen.getByTestId('username');
  const passwordControl = screen.getByTestId('password');

  const signInButtonControl = screen.getByRole('button', {
    name: /sign in/i,
  });
  const signUpButtonControl = screen.getByRole('button', {
    name: /sign up/i,
  });

  return {
    view,
    submittedSpy,
    signUpClickedSpy,
    userNameControl,
    passwordControl,
    signInButtonControl,
    signUpButtonControl,
  };
}

describe('@testing-library/angular', () => {
  it('show validation error', async () => {
    const user = userEvent.setup();
    const { view, userNameControl } = await setup({});

    const componentInstance = view.fixture.componentInstance;

    expect(componentInstance.viewForm.dirty).toBeFalsy();
    expect(componentInstance.viewForm.pristine).toBeTruthy();
    expect(componentInstance.viewForm.touched).toBeFalsy();
    expect(componentInstance.viewForm.valid).toBeFalsy();

    // touch control to show validation error.
    fireEvent.blur(userNameControl);

    expect(componentInstance.viewForm.dirty).toBeFalsy();
    expect(componentInstance.viewForm.pristine).toBeTruthy();
    expect(componentInstance.viewForm.touched).toBeTruthy();
    expect(componentInstance.viewForm.valid).toBeFalsy();

    expect(screen.getByText('User Name is required')).toBeInTheDocument();

    await user.type(userNameControl, 'tim');

    expect(componentInstance.viewForm.dirty).toBeTruthy();
    expect(componentInstance.viewForm.pristine).toBeFalsy();
    expect(componentInstance.viewForm.touched).toBeTruthy();
    expect(componentInstance.viewForm.valid).toBeFalsy();

    expect(screen.queryByText('User Name is required')).not.toBeInTheDocument();

    // Clear user name.
    fireEvent.input(userNameControl, {
      target: {
        value: '',
      },
    });

    expect(componentInstance.viewForm.valid).toBeFalsy();
    expect(screen.getByText('User Name is required')).toBeInTheDocument();
  });
});

describe('SignInFormComponent', () => {
  it('shows error message', async () => {
    const errorMessage = 'abcdefghi';
    const { view } = await setup({ errorMessage });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('is disabled when pending', async () => {
    const {
      passwordControl,
      signInButtonControl,
      signUpButtonControl,
      userNameControl,
    } = await setup({ pending: true });

    expect(userNameControl).toHaveAttribute('disabled', '');
    expect(passwordControl).toHaveAttribute('disabled', '');
    expect(signInButtonControl).toHaveAttribute('disabled', 'true');
    expect(signUpButtonControl).toHaveAttribute('disabled', 'true');
  });

  it('should display error messages and submit if valid', async () => {
    const {
      view,
      passwordControl,
      signInButtonControl,
      signUpButtonControl,
      userNameControl,
      signUpClickedSpy,
      submittedSpy,
    } = await setup({});

    expect(signInButtonControl).toHaveAttribute('disabled', 'true');
    expect(signUpButtonControl).toBeEnabled();

    // touch control to show validation error.
    fireEvent.blur(userNameControl);

    expect(screen.getByText('User Name is required')).toBeInTheDocument();

    // touch control to show validation error.
    fireEvent.blur(passwordControl);

    expect(screen.getByText('Password is required')).toBeInTheDocument();

    fireEvent.input(userNameControl, {
      target: {
        value: 'dfdf',
      },
    });

    expect(screen.queryByText('User Name is required')).not.toBeInTheDocument();

    fireEvent.input(passwordControl, {
      target: {
        value: 'PASSWORD',
      },
    });

    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();

    // Form valid.
    expect(signInButtonControl).toBeEnabled();
    expect(signUpButtonControl).toBeEnabled();

    // Clear user name.
    fireEvent.input(userNameControl, {
      target: {
        value: '',
      },
    });

    expect(screen.getByText('User Name is required')).toBeInTheDocument();

    // Clear password
    fireEvent.input(passwordControl, {
      target: {
        value: '',
      },
    });

    expect(screen.getByText('Password is required')).toBeInTheDocument();

    // Enter username and password
    const inputValues = {
      username: 'fred',
      password: 'apassword',
    };

    fireEvent.input(userNameControl, {
      target: {
        value: inputValues.username,
      },
    });

    fireEvent.input(passwordControl, {
      target: {
        value: inputValues.password,
      },
    });

    // check submit
    fireEvent.click(signInButtonControl);
    expect(submittedSpy).toHaveBeenCalledTimes(1);
    expect(submittedSpy).toHaveBeenCalledWith({
      ...inputValues,
    });

    fireEvent.click(signUpButtonControl);
    expect(signUpClickedSpy).toHaveBeenCalledTimes(1);
  });
});

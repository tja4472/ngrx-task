import { Injectable } from '@angular/core';

import { AuthService } from '@app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppActionsService {
  public property: string;

  constructor(private authService: AuthService) {
    // For Cypress app actions
    /*
    if (window.Cypress) {
      window.AppActionsService = this;
    }
*/
    this.property = 'appActionsTestServiceProperty';
  }

  method1(text: string): string {
    const result = text + 'A';
    this.property = result;
    return result;
  }

  promise1(text: string) {
    return Promise.resolve(text + 'B');
  }

  async signUp(email: string, password: string) {
    await this.authService.signUp(email, password);
  }
}

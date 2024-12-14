import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ngMocks } from 'ng-mocks';

setupZonelessTestEnv();

configure({
  defaultImports: [ReactiveFormsModule],
});

ngMocks.autoSpy('jest');

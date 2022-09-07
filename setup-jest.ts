import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MockInstance, ngMocks } from 'ng-mocks';

configure({
  defaultImports: [ReactiveFormsModule],
});

ngMocks.autoSpy('jest');

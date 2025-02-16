- TODO: Convert cypress component tests to standalone
- TODO: Added for use by cypress, @angular-devkit/build-angular. https://github.com/cypress-io/cypress/issues/30903. Use vite?

https://blog.nrwl.io/ngrx-patterns-and-techniques-f46126e2b1e5

- [ngx-forms-typed](https://github.com/gparlakov/forms-typed/tree/master/projects/forms)
- Remove barrel files.
  - [Speeding up the JavaScript ecosystem - The barrel file debacle](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/)

# NgrxTask

https://tja4472.github.io/ngrx-task/

# Test service worker

```bash
npx http-server -p 8070 -c-1 dist/ng-task
```

http://localhost:8070

## Configure Firebase

Requires a file, `firebase-config.ts`

```ts
// This file should be added to .gitignore.
export const firebaseConfig = {
  apiKey: 'XXXXXX',
  authDomain: 'XXXXXX',
  databaseURL: 'XXXXXX',
  projectId: 'XXXXXX',
  storageBucket: 'XXXXXX',
  messagingSenderId: 'XXXXXX',
};

export const firebaseProdConfig = firebaseConfig;
```

```sh
ng generate module Tasks --flat false --routing
ng generate feature tasks/Task --module tasks/tasks.module.ts --group --spec false
ng generate container tasks/containers/CurrentTasksPage --spec false --changeDetection OnPush
ng generate container tasks/containers/CompletedTasksPage --spec false --changeDetection OnPush
ng generate container tasks/containers/TaskListsPage --spec false --changeDetection OnPush

ng generate component tasks/components/CurrentTaskList --skipTests
```

```sh
ng generate module Tasks --flat false --routing
# CREATE src/app/tasks/tasks-routing.module.ts (249 bytes)
# CREATE src/app/tasks/tasks.module.ts (276 bytes)

ng generate feature tasks/Task --module tasks/tasks.module.ts --group --spec false --creators
# CREATE src/app/tasks/actions/task.actions.ts (242 bytes)
# CREATE src/app/tasks/reducers/task.reducer.ts (382 bytes)
# CREATE src/app/tasks/effects/task.effects.ts (573 bytes)
# UPDATE src/app/tasks/tasks.module.ts (589 bytes)

ng generate container tasks/containers/CurrentTasksPage --spec false --changeDetection OnPush
# CREATE src/app/tasks/containers/current-tasks-page/current-tasks-page.component.html (33 bytes)
# CREATE src/app/tasks/containers/current-tasks-page/current-tasks-page.component.ts (377 bytes)
# CREATE src/app/tasks/containers/current-tasks-page/current-tasks-page.component.css (0 bytes)
# UPDATE src/app/tasks/tasks.module.ts (720 bytes)

ng generate container tasks/containers/CompletedTasksPage --spec false --changeDetection OnPush
# CREATE src/app/tasks/containers/completed-tasks-page/completed-tasks-page.component.html (35 bytes)
# CREATE src/app/tasks/containers/completed-tasks-page/completed-tasks-page.component.ts (461 bytes)
# CREATE src/app/tasks/containers/completed-tasks-page/completed-tasks-page.component.css (0 bytes)
# UPDATE src/app/tasks/tasks.module.ts (862 bytes)
```

# Sign in redirects

## Auto Sign In

### Signed In

http://localhost:4200/tasks/current -> http://localhost:4200/tasks/current
returnUrl: undefined
isAutoSignIn: true

### Signed Out

http://localhost:4200/tasks/current -> http://localhost:4200/sign-in?return=%2Ftasks%2Fcurrent
After Sign In
returnUrl: /tasks/current
isAutoSignIn: true

## Manual Sign In

### http://localhost:4200/sign-in

After Sign In
returnUrl: undefined
isAutoSignIn: false

result: http://localhost:4200/home

### http://localhost:4200/sign-in?return=%2Ftasks%2Fcurrent

After Sign In
returnUrl: /tasks/current
isAutoSignIn: false

result: http://localhost:4200/tasks/current

# Questions

Load user profile as part of authService or independently using effects?

Replace `ng-core-template` with new repostory name.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

1. Fix versions.
2. Install Prettier.
3. Run Prettier.
4. Install husky & lint-staged.
5. Add Launch Chrome configuration.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

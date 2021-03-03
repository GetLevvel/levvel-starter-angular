# Levvel Starter Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Features:

- Lazy-loaded component modules
- SCSS enabled
- dotenv + yargs for on the fly environment creation
- Husky
- Browserslist
- Commitizen + commitlint
- Asynchronous NPM scripts with [Concurrently](https://github.com/kimmobrunfeldt/concurrently).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run jest | npm run jest:watch | npm run jest:ci` to execute the unit tests via [Jest](https://jestjs.io).

## Running end-to-end tests

Run `npm run cypress:open | npm run cypress:run` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

## Running all tests

Run `npm run test = npm run jest && npm run cypress:run` to execute unit and end-to-end tests with [Jest](https://jestjs.io) and [Cypress](https://www.cypress.io).

## Running linters

Run `npm run lint = npm run eslint && npm run prettier && npm run stylelint` to run linters via [ESLint](https://eslint.org), [Prettier](https://prettier.io), and [Stylelint](https://stylelint.io).

## Committing and Pushing

Run `git add .` to stage all file changes in git.

Run `npm run commit` to enforce writing descriptive commits via [Commitizen](https://commitizen-tools.github.io/commitizen) and [Husky](https://typicode.github.io/husky) runs `npm run lint` pre-commit.

Run `git push` to enforce unit and E2E testing via [Husky](https://typicode.github.io/husky) runs `npm run test` pre-push.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

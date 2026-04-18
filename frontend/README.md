# E-Commerce Frontend (Angular)

This is the storefront and administration frontend for the E-Commerce platform, built with [Angular](https://angular.io/).

## Development Server

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files. 
Note: The project is configured with a proxy (`proxy.conf.json`) to route API calls to the backend.

## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Project Structure

- `src/app/pages/`: Main page components (Home, Login, Register, Dashboards)
- `src/app/services/`: Services for API communication (Auth, Product)
- `src/app/components/`: Reusable UI components
- `proxy.conf.json`: Proxy configuration for development

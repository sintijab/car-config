#Selector of registered cars
- Single page application has responsive layout of car configurator with three main sections with models, versions and vehicles.
- Each section can be reached by navigation.
- Request failures corresponds the following error messages.
- Application has loading states.
- Data has been registered to the service worker cache, application is available offline
- Section of vehicles contains pagination to improve performance

## Getting Started

### Dependencies
Application is built with Webpack configuration to have separate production and development bundles. Components are powered by React, hooks, axios for handling api calls, css-modules, sass preprocessor, react testing libraries. Unit tests are located in /tests directory. Source files are located in /src folder, http server has been modified to access and serve content from target /build directory. The service worker has two strategies set by priorities: cache-first access for succesfully stored api responses (1 day), scripts and styles(3 days) and fonts for available cache period.

### Installing

Install dependencies

```
npm install
```

Starting production build
```
npm run build-all
```
Starting development build
```
npm run watch-all
```

## Running the tests

```
npm run test
```

## Contribution

* **Sintija Birgele**

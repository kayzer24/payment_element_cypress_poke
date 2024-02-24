## E2E Tests

The tests will check:
 - The checkout flow and a test payment.

# How to run:

1. Install dependencies
```
  npm install
```

# Method 1
1. Open Cypress Interface

```
    npx cypress open
```
2. Select E2E Testing option

3. Select Start E2E Testing in Chrome

4. Run "spec.cy.js" file

# Method 2

1. Run all e2e tests on cli
```
  node_modules/.bin/cypress run --headless --browser chrome
```

2. Run e2e tests for a single integration spec on cli
```
  node_modules/.bin/cypress run --headless --browser chrome --spec cypress/integration/lessons_courses.js 
```

3. Run all e2e tests on a browser
```
  node_modules/.bin/cypress run --headed --browser chrome
```

4. Run e2e tests for a single integration spec on a browser
```
  node_modules/.bin/cypress run --headed --browser chrome --spec cypress/integration/lessons_courses.js
```

**Notes**: 

If you are not using the react client, change the base url to point to port `4242` as shown below

```
  node_modules/.bin/cypress run --headless --browser chrome --config baseUrl=http://localhost:4242/
```
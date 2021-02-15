# ATM Demo

### Objective

 A simple react.js application that lets people see their recent transactions and enter a valid amount to withdraw.

Initial designer napkin sketch

![atm wireframe](./atmdemo_ui_wireframe.jpeg)

### App Reqs

- React.js
- Redux
- Display list of names and $ amounts of recent transactions
- Show form for creating a withdrawal transaction against the balance with "withdraw" button
- Include user input validation for withdrawals against rules:
  - Only withdrawal increments of $20 dollars
  - Cannot withdraw more than the remaining balance (available balance minus recent transactions)
  - Cannot withdraw < $0

### User Flow

#### Initial Load of Account

1. Pull recent transaction data from [this](https://app.fakejson.com/q/0Pm3bJKu?token=HbqwPS-BSqOehLpig2ePqg) mock api endpoint.
2. Show the status of the REST request.
3. Populate a redux store with the results of the api call (1).
4. Show the results (transactions and amounts) from the redux store.
5. Store remaining balance value in redux store.
5. Display the remaining account balance at the top (Given a $2,000 initial starting balance minus the sum of the transaction amounts).

#### Withdraw Funds
6. User inputs amount to withdraw.
7. On valid input, clicking withdraw button will reset the form to $0.00 and update the remaining balance in the redux store as well as populate a new transaction in the list of transactions. (Withdraw form has no backend functionality at this time)

#### Visualize Account Activity
- Show a balance bar svg chart with % of remaining balance (available balance minus recent transactions), given a hard coded initial balance of $2,000. 
- Create a way to filter or sort transactions
- Parse the withdrawal form value to show a currency value

###### Any extra additions that show off front end expertise are very welcome

Offline mode supported - block `app.fakejson.com` request url in console to see client-side functionality

-----

##### Service Unit Tests
`yarn test`

##### E2E Integration Tests
`yarn cypress:open`

-----

# [Dev Env](https://github.com/cypress-io/cra-template-cypress-typescript).
Create React App with Cypress TypeScript

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn cypress:open`

Opens the Cypress GUI

### `yarn cypress:run`

Runs Cypress CLI

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

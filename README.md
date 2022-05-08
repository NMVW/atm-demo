# Music Gallery
Your assignment is to implement a music album dashboard using JavaScript and React.

![UI mockup](https://github.com/NMVW/atm-demo/blob/music-gallery/mockup.png)

## Brief
Your customers want to see which popular albums are being streamed, so naturally you roll up your sleeves and get to work. You quickly scribble down some notes and after a few hours of relentless work you have a design in mind.

## Tasks
Implement assignment using:
- Language: JavaScript
- Framework: NextJS (preferred) or plain React
- Connect your application to the Apple Music API at
https://rss.applemarketingtools.com/api/v2/us/music/most-played/50/albums.json
- Parse the API response and display the results as outlined in the design. Group albums by genres.
- Implement a detail view for the movies in the list
- Make sure that linking to detail pages as well as bookmarking works as expected
- Implement search by filtering the list by title

## Deliverables
Make sure to include all source code in the repository.

## Evaluation Criteria
- NextJS (if used), JavaScript and React best practices
- We're looking for you to produce working code, with enough room to demonstrate how to structure components in a small program.
- Show us your work through your commit history
- Completeness: did you complete the features?
- Correctness: does the functionality act in sensible, thought-out ways?
- Maintainability: is it written in a clean, maintainable way?
- Testing: is the system adequately tested?

### Submit
Please organize, design, test and document your code as if it were going into production - then submit by uploading a .zip archive.

All the best and happy coding,

The Filmhub Team



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

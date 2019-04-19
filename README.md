This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It is PWA so in order to take advantage of this you need to run build command. For more information about this check below.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn test -- --coverage`

Launches the test runner and generate coverage reports.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

In order to test offline usage you need to serve this build folder with a static server.
For do this you can add serve globally with this command.<br>
yarn global add serve<br>
and after build process is finished you can serve recently created build folder with this command.<br>
serve -s build
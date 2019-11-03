import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/layouts/App";
import * as serviceWorker from "./serviceWorker";

import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./app/common/utils/ScrollToTop";

import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "./app/redux/store";

import ReduxToastr from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

const store = configureStore();

//Load initial events
/**
 * HOT MODULE REPLACEMENT
 * -Prevent unnecessary re-renders on edit
 */
const appRoot = document.getElementById("root");

const renderer = () =>
  ReactDOM.render(
    <ReduxProvider store={store}>
      <Router>
        <ScrollToTop />
        <ReduxToastr
          position='bottom-right'
          transitionIn='fadeIn'
          transitionOut='fadeOut'
          closeOnToastrClick
        />
        <App />
      </Router>
    </ReduxProvider>,
    appRoot
  );

if (module.hot) {
  module.hot.accept("./app/layouts/App", () => {
    setTimeout(renderer);
  });
}

store.firebaseAuthIsReady.then(() => {
  renderer();
});

serviceWorker.unregister();

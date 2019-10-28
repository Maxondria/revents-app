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
import { fetchEvents } from "./app/redux/actions/eventActions";

const store = configureStore();

//Load initial events
store.dispatch(fetchEvents());

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

renderer();

serviceWorker.unregister();

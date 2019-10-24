import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/layouts/App";
import * as serviceWorker from "./serviceWorker";

import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router } from "react-router-dom";

/**
 * HOT MODULE REPLACEMENT
 * -Prevent unnecessary re-renders on edit
 */
const appRoot = document.getElementById("root");

const renderer = () =>
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    appRoot
  );

if (module.hot) {
  module.hot.accept("./app/layouts/App", () => {
    setTimeout(renderer);
  });
}

renderer();

serviceWorker.unregister();

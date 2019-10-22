import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/layouts/App";
import * as serviceWorker from "./serviceWorker";

/**
 * HOT MODULE REPLACEMENT
 * -Prevent unnecessary re-renders on edit
 */
const appRoot = document.getElementById("root");

const renderer = () => ReactDOM.render(<App />, appRoot);

if (module.hot) {
  module.hot.accept("./app/layouts/App", () => {
    setTimeout(renderer);
  });
}

renderer();

serviceWorker.unregister();

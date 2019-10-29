import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "../reducers";
import thunk from "redux-thunk";

import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import firebase from "../../firebase/config";

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true
};

const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];

const composedEnhancer = composeWithDevTools(
  applyMiddleware(...middlewares),
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
);

export const configureStore = () => createStore(rootReducer, composedEnhancer);

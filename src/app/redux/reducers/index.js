import { combineReducers } from "redux";

import { reducer as formReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import { eventsReducer } from "./eventsReducer";
import { modalReducer } from "./modalReducer";
import { authReducer } from "./authReducer";
import { asyncReducer } from "./asyncReducer";

export const rootReducer = combineReducers({
  form: formReducer,
  toastr: toastrReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  events: eventsReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer
});

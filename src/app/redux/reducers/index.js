import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";

import { eventsReducer } from "./eventsReducer";
import { modalReducer } from "./modalReducer";
import { authReducer } from "./authReducer";
import { asyncReducer } from "./asyncReducer";

export const rootReducer = combineReducers({
  form: formReducer,
  toastr: toastrReducer,
  events: eventsReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer
});

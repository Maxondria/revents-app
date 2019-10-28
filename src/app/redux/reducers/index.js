import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { eventsReducer } from "./eventsReducer";
import { modalReducer } from "./modalReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  form: formReducer,
  events: eventsReducer,
  modals: modalReducer,
  auth: authReducer
});

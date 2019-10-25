import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { eventsReducer } from "./eventsReducer";

export const rootReducer = combineReducers({
  form: formReducer,
  events: eventsReducer
});

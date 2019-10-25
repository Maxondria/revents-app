import { initialState } from "../store/initialState";
import { createReducer } from "../../common/utils/reducer-utils";
import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT
} from "../constants/actionTypes";

export const eventsReducer = createReducer(initialState.events, {
  [CREATE_EVENT]: (state, { event }) => [...state, event],
  [UPDATE_EVENT]: (state, { event }) =>
    state.map(evt => (evt.id === event.id ? { ...event } : evt)),
  [DELETE_EVENT]: (state, { id }) => state.filter(event => event.id !== id)
});

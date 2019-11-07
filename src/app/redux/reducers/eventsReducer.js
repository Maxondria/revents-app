import { initialState } from "../store/initialState";
import { createReducer } from "../../common/utils/reducer-utils";
import { FETCH_EVENTS } from "../constants/actionTypes";

export const eventsReducer = createReducer(initialState.events, {
  [FETCH_EVENTS]: (_state, { events }) => events
});

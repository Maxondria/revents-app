import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS
} from "../constants/actionTypes";
import {
  asynActionStart,
  asyncActionFinish,
  asyncActionError
} from "./asyncActions";
import { mockFetch } from "../../mock-api/api";

export const createEvent = event => ({
  type: CREATE_EVENT,
  payload: { event }
});

export const updateEvent = event => ({
  type: UPDATE_EVENT,
  payload: { event }
});

export const deleteEvent = id => ({
  type: DELETE_EVENT,
  payload: { id }
});

export const fetchEvents = () => {
  return async dispatch => {
    try {
      dispatch(asynActionStart());
      const events = await mockFetch();
      dispatch(asyncActionFinish());
      dispatch({
        type: FETCH_EVENTS,
        payload: {
          events
        }
      });
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

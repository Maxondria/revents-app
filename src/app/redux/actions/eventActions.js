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
import { toastr } from "react-redux-toastr";

export const createEvent = event => async dispatch => {
  try {
    dispatch({ type: CREATE_EVENT, payload: { event } });
    toastr.success("Success!", "Event Created Successfully!");
  } catch (error) {
    toastr.error("Ooops!", "Something Went Wrong!");
  }
};

export const updateEvent = event => async dispatch => {
  try {
    dispatch({ type: UPDATE_EVENT, payload: { event } });
    toastr.success("Success!", "Event Modified Successfully!");
  } catch (error) {
    toastr.error("Ooops!", "Something Went Wrong!");
  }
};

export const deleteEvent = id => async dispatch => {
  try {
    dispatch({ type: DELETE_EVENT, payload: { id } });
    toastr.success("Success!", "Event Deleted Successfully!");
  } catch (error) {
    toastr.error("Ooops!", "Something Went Wrong!");
  }
};

export const fetchEvents = () => async dispatch => {
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

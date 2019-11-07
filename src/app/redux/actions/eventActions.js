import { FETCH_EVENTS } from "../constants/actionTypes";
import {
  asynActionStart,
  asyncActionFinish,
  asyncActionError
} from "./asyncActions";
import { mockFetch } from "../../mock-api/api";
import { toastr } from "react-redux-toastr";
import { createNewEvent } from "../../common/utils/helpers";

export const createEvent = event => async (
  _dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  const photoURL = getState().firebase.profile.photoURL;
  const newEvent = createNewEvent(user, photoURL, event);

  try {
    const createdEvent = await firestore.add("events", newEvent);

    await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
      eventId: createdEvent.id,
      userId: user.uid,
      eventDate: event.date,
      host: true
    });

    toastr.success("Success!", "Event Created Successfully!");
    return createdEvent;
  } catch (error) {
    toastr.error("Ooops!", "Something Went Wrong!");
  }
};

export const updateEvent = event => async (
  _dispatch,
  _getState,
  { getFirestore }
) => {
  const firestore = getFirestore();

  try {
    await firestore.update(`events/${event.id}`, event);
    toastr.success("Success!", "Event Modified Successfully!");
  } catch (error) {
    toastr.error("Ooops!", "Something Went Wrong!");
  }
};

export const cancelEventToggle = (cancelled, eventId) => async (
  _dispatch,
  _getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? "Continue to cancel this event?"
    : "Continue and Reactivate event?";

  try {
    toastr.confirm(message, {
      onOk: async () => {
        await firestore.update(`events/${eventId}`, { cancelled });
        toastr.success(
          "Success!",
          `Event ${cancelled ? "Cancelled" : "Reactivated"} Successfully!`
        );
      }
    });
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

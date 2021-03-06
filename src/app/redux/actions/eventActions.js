import { toastr } from "react-redux-toastr";
import { createNewEvent } from "../../common/utils/helpers";
import firebase from "../../firebase/config";
import { FETCH_EVENTS } from "../constants/actionTypes";
import {
  asynActionStart,
  asyncActionFinish,
  asyncActionError
} from "./asyncActions";

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

export const attendEvent = event => async (
  _dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;

  const attendee = {
    going: true,
    joinDate: firestore.FieldValue.serverTimestamp(),
    photoURL: profile.photoURL || "/assets/user.png",
    displayName: profile.displayName,
    host: false
  };

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: attendee
    });

    await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
      eventId: event.id,
      userId: user.uid,
      eventDate: event.date,
      host: false
    });

    toastr.success("Success!", "You have signed up to this event!");
  } catch (error) {
    console.log(error);
    toastr.error("Ooops!", "Something Went Wrong!");
  }
};

export const cancelMyPlace = event => async (
  _dispatch,
  _getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete()
    });

    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);

    toastr.success("Success!", "You have removed yourself from this event!");
  } catch (error) {
    console.log(error);
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

export const fetchEventsForDashboard = lastEvent => async dispatch => {
  const today = new Date();
  const firestore = firebase.firestore();

  const eventsRef = firestore.collection("events");

  try {
    dispatch(asynActionStart());
    const startAfter = lastEvent && (await eventsRef.doc(lastEvent.id).get());

    const query = lastEvent
      ? eventsRef
          //.where("date", ">=", today)
          .orderBy("date")
          .startAfter(startAfter)
          .limit(2)
      : eventsRef
          //.where("date", ">=", today)
          .orderBy("date")
          .limit(2);

    const snapshot = await query.get();

    if (snapshot.docs.length === 0) {
      dispatch(asyncActionFinish());
      return snapshot;
    }
    const events = snapshot.docs.reduce((acc, val) => {
      acc.push({ id: val.id, ...val.data() });
      return acc;
    }, []);

    dispatch({ type: FETCH_EVENTS, payload: { events } });
    dispatch(asyncActionFinish());
    return snapshot;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

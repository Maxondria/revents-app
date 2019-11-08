import React, { useEffect, useCallback, useState } from "react";
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import {
  attendEvent,
  cancelMyPlace
} from "../../../app/redux/actions/eventActions";
import LoadingSpinner from "../../../app/layouts/LoadingSpinner";

const EventsDetailed = ({
  event,
  firestore,
  match,
  auth,
  attendEvent,
  cancelMyPlace
}) => {
  const [loadingEvent, setLoadingEvent] = useState(true);

  const fetchEventCallback = useCallback(async () => {
    if (match && match.params && match.params.id) {
      await firestore.setListener({
        collection: "events",
        doc: match.params.id
      });
      setLoadingEvent(false);
    }
  }, [firestore, match]);

  useEffect(() => {
    fetchEventCallback();
    return () =>
      firestore.unsetListener({ collection: "events", doc: match.params.id });
  }, [fetchEventCallback, firestore, match]);

  return event && !loadingEvent ? (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader
          event={event}
          auth={auth}
          attendEvent={attendEvent}
          cancelMyPlace={cancelMyPlace}
        />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event && event.attendees} />
      </Grid.Column>
    </Grid>
  ) : (
    <LoadingSpinner />
  );
};

const mapStateToProps = ({ firestore, firebase: { auth } }, props) => ({
  event: props.match.params.id
    ? firestore.ordered.events &&
      firestore.ordered.events.length > 0 &&
      firestore.ordered.events.find(event => event.id === props.match.params.id)
    : undefined,
  auth
});

export default withFirestore(
  connect(
    mapStateToProps,
    { attendEvent, cancelMyPlace }
  )(EventsDetailed)
);

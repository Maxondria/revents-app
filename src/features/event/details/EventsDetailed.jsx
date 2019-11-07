import React, { useEffect, useCallback } from "react";
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

const EventsDetailed = ({
  event,
  firestore,
  match,
  auth,
  attendEvent,
  cancelMyPlace
}) => {
  const fetchEventCallback = useCallback(async () => {
    if (match && match.params && match.params.id) {
      await firestore.setListener({
        collection: "events",
        doc: match.params.id
      });
    }
  }, [firestore, match]);

  useEffect(() => {
    fetchEventCallback();
    return () =>
      firestore.unsetListener({ collection: "events", doc: match.params.id });
  }, [fetchEventCallback, firestore, match]);

  return event ? (
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
    ""
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

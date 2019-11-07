import React, { useEffect, useCallback } from "react";
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";

const EventsDetailed = ({ event, firestore, match, history, auth }) => {
  const fetchEventCallback = useCallback(async () => {
    const event = await firestore.get(`events/${match.params.id}`);
    if (!event.exists) {
      history.push("/events");
      toastr.error("Not Found", "Sorry, Looks like this event doesn't exist!");
    }
  }, [firestore, history, match.params.id]);

  useEffect(() => {
    fetchEventCallback();
  }, [fetchEventCallback]);

  return event ? (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} auth={auth} />
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

export default withFirestore(connect(mapStateToProps)(EventsDetailed));

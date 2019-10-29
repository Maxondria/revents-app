import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";

import { connect } from "react-redux";
import { deleteEvent } from "../../app/redux/actions/eventActions";
import LoadingSpinner from "../../app/layouts/LoadingSpinner";
import EventActivity from "./EventActivity";

import { firestoreConnect } from "react-redux-firebase";

const EventsDashboard = ({ events, deleteEvent, loading }) => {
  const handleDeleteEvent = id => {
    deleteEvent(id);
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <Grid>
      <Grid.Column width={10}>
        <EventList deleteEvent={handleDeleteEvent} events={events} />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventActivity />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = ({ firestore, async: { loading } }) => ({
  events: firestore.ordered.events,
  loading
});

export default connect(
  mapStateToProps,
  { deleteEvent }
)(firestoreConnect([{ collection: "events" }])(EventsDashboard));

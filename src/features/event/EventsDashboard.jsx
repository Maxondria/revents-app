import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";

import { connect } from "react-redux";
import LoadingSpinner from "../../app/layouts/LoadingSpinner";
import EventActivity from "./EventActivity";

import { firestoreConnect, isLoaded } from "react-redux-firebase";

const EventsDashboard = ({ events }) => {
  return !isLoaded(events) ? (
    <LoadingSpinner />
  ) : (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventActivity />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = ({ firestore }) => ({
  events: firestore.ordered.events
});

export default connect(mapStateToProps)(
  firestoreConnect([{ collection: "events" }])(EventsDashboard)
);

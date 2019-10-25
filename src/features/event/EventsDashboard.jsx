import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";

import { connect } from "react-redux";
import { deleteEvent } from "../../app/redux/actions/eventActions";

const EventsDashboard = ({ events, deleteEvent }) => {
  const handleDeleteEvent = id => {
    deleteEvent(id);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList deleteEvent={handleDeleteEvent} events={events} />
      </Grid.Column>

      <Grid.Column width={6}>
        <h2>Activity</h2>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = ({ events }) => ({
  events
});

export default connect(
  mapStateToProps,
  { deleteEvent }
)(EventsDashboard);

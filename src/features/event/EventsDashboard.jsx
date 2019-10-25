import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
//import cuid from "cuid";

import { connect } from "react-redux";
import {
  createEvent,
  deleteEvent,
  updateEvent
} from "../../app/redux/actions/eventActions";

const EventsDashboard = ({ events, createEvent, deleteEvent, updateEvent }) => {
  // const stageEvents = event => {
  //   event.id = cuid();
  //   event.hostPhotoURL = "/assets/user.png";

  //   createEvent(event);
  // };

  // const handleUpdateEvent = modifiedEvent => {
  //   updateEvent(modifiedEvent);
  // };

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
  { createEvent, deleteEvent, updateEvent }
)(EventsDashboard);

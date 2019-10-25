import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "./EventForm";
import cuid from "cuid";

import { connect } from "react-redux";
import {
  createEvent,
  deleteEvent,
  updateEvent
} from "../../app/redux/actions/eventActions";

const EventsDashboard = ({ events, createEvent, deleteEvent, updateEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCreateFormOpen = () => {
    setIsOpen(true);
    setSelectedEvent(null);
  };

  const handleCancelForm = () => setIsOpen(false);

  const handleSelectEvent = event => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  const stageEvents = event => {
    event.id = cuid();
    event.hostPhotoURL = "/assets/user.png";

    createEvent(event);
    handleCancelForm();
  };

  const handleUpdateEvent = modifiedEvent => {
    updateEvent(modifiedEvent);
    setIsOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = id => {
    deleteEvent(id);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          deleteEvent={handleDeleteEvent}
          events={events}
          selectEvent={handleSelectEvent}
        />
      </Grid.Column>

      <Grid.Column width={6}>
        <Button
          positive
          content='Create Event'
          onClick={handleCreateFormOpen}
        />
        {isOpen && (
          <EventForm
            toggleForm={handleCancelForm}
            stageEvents={stageEvents}
            selectedEvent={selectedEvent}
            updateEvent={handleUpdateEvent}
          />
        )}
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

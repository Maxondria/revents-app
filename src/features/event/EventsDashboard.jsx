import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "./EventForm";
import { events as AppEvents } from "../../playground/test-data/events";
import cuid from "cuid";

const EventsDashboard = () => {
  const [events, setEvents] = useState(AppEvents);
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

    setEvents(prevEvents => [...prevEvents, event]);
    handleCancelForm();
  };

  const handleUpdateEvent = modifiedEvent => {
    const updateEvent = event =>
      event.id === modifiedEvent.id ? { ...modifiedEvent } : event;

    setEvents(prevEvents => prevEvents.map(updateEvent));
    setIsOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = id => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
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

export default EventsDashboard;

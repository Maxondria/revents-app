import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "./EventForm";
import { events as AppEvents } from "../../playground/test-data/events";
import cuid from "cuid";

const EventsDashboard = () => {
  const [events, setEvents] = useState(AppEvents);
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => setIsOpen(prevState => !prevState);

  const stageEvents = event => {
    event.id = cuid();
    event.hostPhotoURL = "/assets/user.png";

    setEvents(prevEvents => [...prevEvents, event]);
    toggleForm();
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>

      <Grid.Column width={6}>
        <Button
          positive
          content={isOpen ? "Cancel Create" : "Create Event"}
          onClick={toggleForm}
        />
        {isOpen && (
          <EventForm toggleForm={toggleForm} stageEvents={stageEvents} />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default EventsDashboard;

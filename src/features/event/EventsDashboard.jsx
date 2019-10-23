import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "./EventForm";
import { events as AppEvents } from "../../playground/test-data/events";

const EventsDashboard = () => {
  const [events] = useState(AppEvents);
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => setIsOpen(prevState => !prevState);

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
        {isOpen && <EventForm toggleForm={toggleForm} />}
      </Grid.Column>
    </Grid>
  );
};

export default EventsDashboard;

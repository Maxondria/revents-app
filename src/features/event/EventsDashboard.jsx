import React from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "./EventForm";
import { events } from "../../playground/test-data/events";

const EventsDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>

      <Grid.Column width={6}>
        <Button positive content='Create Event' />
        <EventForm />
      </Grid.Column>
    </Grid>
  );
};

export default EventsDashboard;

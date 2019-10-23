import React from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "./EventForm";

const EventsDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList />
      </Grid.Column>

      <Grid.Column width={6}>
        <Button positive content='Create Event' />
        <EventForm />
      </Grid.Column>
    </Grid>
  );
};

export default EventsDashboard;

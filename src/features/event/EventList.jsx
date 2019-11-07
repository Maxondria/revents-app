import React from "react";
import EventsListItem from "./EventsListItem";

const EventList = ({ events }) => (
  <>
    {events &&
      events.map(event => <EventsListItem key={event.id} event={event} />)}
  </>
);

export default EventList;

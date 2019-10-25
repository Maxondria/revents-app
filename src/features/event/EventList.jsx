import React from "react";
import EventsListItem from "./EventsListItem";

const EventList = ({ events, deleteEvent }) =>
  events.map(event => (
    <EventsListItem key={event.id} event={event} deleteEvent={deleteEvent} />
  ));

export default EventList;

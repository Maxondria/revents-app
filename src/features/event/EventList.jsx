import React from "react";
import EventsListItem from "./EventsListItem";

const EventList = ({ events, selectEvent }) =>
  events.map(event => (
    <EventsListItem key={event.id} event={event} selectEvent={selectEvent} />
  ));

export default EventList;

import React from "react";
import EventsListItem from "./EventsListItem";

const EventList = ({ events, selectEvent, deleteEvent }) =>
  events.map(event => (
    <EventsListItem
      key={event.id}
      event={event}
      selectEvent={selectEvent}
      deleteEvent={deleteEvent}
    />
  ));

export default EventList;

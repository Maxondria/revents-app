import React from "react";
import { List, Image } from "semantic-ui-react";

const EventListAttendee = ({ attendee }) => {
  return (
    <List.Item>
      <Image as='a' src={attendee.photoURL} size='mini' circular />
    </List.Item>
  );
};

export default EventListAttendee;

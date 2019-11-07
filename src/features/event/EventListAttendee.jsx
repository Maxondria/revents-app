import React from "react";
import { List, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const EventListAttendee = ({ attendee }) => {
  return (
    <List.Item>
      <Image
        as={Link}
        to={`/profile/${attendee.id}`}
        src={attendee.photoURL}
        size='mini'
        circular
      />
    </List.Item>
  );
};

export default EventListAttendee;

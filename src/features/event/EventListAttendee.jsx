import React from "react";
import { List, Image } from "semantic-ui-react";

const EventListAttendee = () => {
  return (
    <List.Item>
      <Image
        as='a'
        src='https://randomuser.me/api/portraits/women/42.jpg'
        size='mini'
        circular
      />
    </List.Item>
  );
};

export default EventListAttendee;

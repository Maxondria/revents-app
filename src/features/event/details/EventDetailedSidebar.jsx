import React from "react";
import { Segment, Item, Label, List } from "semantic-ui-react";

const EventDetailedSidebar = ({ attendees }) => {
  const isHost = false;

  const formattedAttendees = Object.values(attendees);

  return (
    <>
      <Segment
        textAlign='center'
        style={{ border: "none" }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {formattedAttendees && formattedAttendees.length}{" "}
        {formattedAttendees && formattedAttendees.length > 0
          ? "People"
          : "Person"}{" "}
        Going
      </Segment>

      <Segment attached>
        <List relaxed>
          <Item.Group divided>
            {formattedAttendees &&
              Object.values(formattedAttendees).map((attendee, i) => (
                <Item key={i} style={{ position: "relative" }}>
                  {isHost && (
                    <Label
                      style={{ position: "absolute" }}
                      color='orange'
                      ribbon='right'
                    >
                      Host
                    </Label>
                  )}
                  <Item.Image size='tiny' src={attendee.photoURL} />
                  <Item.Content verticalAlign='middle'>
                    <Item.Header as='h3'>{attendee.name}</Item.Header>
                  </Item.Content>
                </Item>
              ))}
          </Item.Group>
        </List>
      </Segment>
    </>
  );
};

export default EventDetailedSidebar;

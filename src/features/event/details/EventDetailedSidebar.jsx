import React from "react";
import { Segment, Item, Label, List } from "semantic-ui-react";
import { ObjectToArray } from "../../../app/common/utils/helpers";
import { Link } from "react-router-dom";

const EventDetailedSidebar = ({ attendees }) => {
  const formattedAttendees = ObjectToArray(attendees);

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
        {formattedAttendees && formattedAttendees.length > 1
          ? "People"
          : "Person"}{" "}
        Going
      </Segment>

      <Segment attached>
        <List relaxed>
          <Item.Group divided>
            {formattedAttendees &&
              Object.values(formattedAttendees).map(attendee => (
                <Item key={attendee.id} style={{ position: "relative" }}>
                  {attendee.host && (
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
                    <Item.Header as='h3'>
                      <Link to={`/profile/${attendee.id}`}>
                        {attendee.displayName}
                      </Link>
                    </Item.Header>
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

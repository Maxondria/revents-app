import React from "react";
import { Segment, Item, Icon, List, Button, Label } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ObjectToArray } from "../../app/common/utils/helpers";

const EventsListItem = ({ event }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header as={Link} to= {`/events/${event.id}`}>
                {event.title}
              </Item.Header>
              <Item.Description>
                Hosted by:{" "}
                <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
              </Item.Description>

              {event.cancelled && (
                <Label
                  style={{ top: "-40px" }}
                  ribbon='right'
                  color='red'
                  content='Event Cancelled By Host'
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <span>
          <Icon name='clock' /> {format(event.date.toDate(), "EEEE do LLL")} at{" "}
          {format(event.date.toDate(), "h:mm a")} |
          <Icon name='marker' /> {event.venue}
        </span>
      </Segment>

      <Segment secondary>
        <List horizontal>
          {event.attendees &&
            ObjectToArray(event.attendees).map((attendee, i) => (
              <EventListAttendee key={i} attendee={attendee} />
            ))}
        </List>
      </Segment>

      <Segment clearing>
        <span>{event.description}</span>

        <Button
          as={Link}
          to={`/events/${event.id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </Segment.Group>
  );
};

export default EventsListItem;

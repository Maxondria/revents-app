import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { useForm } from "../../hooks/useForm";
import { connect } from "react-redux";
import cuid from "cuid";

import { createEvent, updateEvent } from "../../app/redux/actions/eventActions";

const EventForm = ({ history, eventValues, createEvent, updateEvent }) => {
  const [event, handleChange] = useForm(
    {
      title: "",
      date: "",
      city: "",
      venue: "",
      hostedBy: ""
    },
    eventValues
  );

  const handleSubmit = e => {
    e.preventDefault();

    if (event.id !== undefined) {
      updateEvent(event);
      history.push(`/events/${event.id}`);
    } else {
      createEvent({
        ...event,
        id: cuid(),
        hostPhotoURL: "/assets/user.png"
      });

      history.push("events");
    }
  };

  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Event Title</label>
          <input
            name='title'
            value={event.title}
            onChange={handleChange}
            placeholder='Event Title'
          />
        </Form.Field>
        <Form.Field>
          <label>Event Date</label>
          <input
            type='date'
            name='date'
            value={event.date}
            onChange={handleChange}
            placeholder='Event Date'
          />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <input
            name='city'
            value={event.city}
            onChange={handleChange}
            placeholder='City event is taking place'
          />
        </Form.Field>
        <Form.Field>
          <label>Venue</label>
          <input
            name='venue'
            value={event.venue}
            onChange={handleChange}
            placeholder='Enter the Venue of the event'
          />
        </Form.Field>
        <Form.Field>
          <label>Hosted By</label>
          <input
            name='hostedBy'
            value={event.hostedBy}
            onChange={handleChange}
            placeholder='Enter the name of person hosting'
          />
        </Form.Field>
        <Button positive type='submit'>
          Submit
        </Button>
        <Button type='button' onClick={() => history.push("/events")}>
          Cancel
        </Button>
      </Form>
    </Segment>
  );
};

const mapStateToProps = ({ events }, props) => ({
  eventValues: props.match.params.id
    ? events && events.find(event => event.id === props.match.params.id)
    : null
});

export default connect(
  mapStateToProps,
  { createEvent, updateEvent }
)(EventForm);

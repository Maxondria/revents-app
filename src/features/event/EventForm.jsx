import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { useForm } from "../../hooks/useForm";

const EventForm = ({ toggleForm, stageEvents }) => {
  const [event, handleChange] = useForm({
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    stageEvents(event);
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
            placeholder='First Name'
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
        <Button type='button' onClick={toggleForm}>
          Cancel
        </Button>
      </Form>
    </Segment>
  );
};

export default EventForm;

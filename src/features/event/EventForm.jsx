import React from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
// import cuid from "cuid";

import { reduxForm, Field } from "redux-form";
import { createEvent, updateEvent } from "../../app/redux/actions/eventActions";
import TextInput from "../../app/common/form/TextInput";

const EventForm = ({ history, eventValues, createEvent, updateEvent }) => {
  const handleSubmit = e => {
    e.preventDefault();

    // if (event.id !== undefined) {
    //   updateEvent(event);
    //   history.push(`/events/${event.id}`);
    // } else {
    //   createEvent({
    //     ...event,
    //     id: cuid(),
    //     hostPhotoURL: "/assets/user.png"
    //   });

    //   history.push("events");
    // }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment>
          <Header sub color='teal' content='Content Details' />
          <Form onSubmit={handleSubmit}>
            <Field
              name='title'
              label='Event Title'
              component={TextInput}
              placeholder='Give your event a title'
            />
            <Field
              name='category'
              label='Event Category'
              component={TextInput}
              placeholder='What is your event about?'
            />
            <Field
              name='description'
              label='Event Description'
              component={TextInput}
              placeholder='How would you describe your event?'
            />

            <Header sub color='teal' content='Event Location Details' />

            <Field
              name='city'
              label='City'
              component={TextInput}
              placeholder='Event City?'
            />
            <Field
              name='venue'
              label='Venue'
              component={TextInput}
              placeholder='Real Venue'
            />
            <Field
              name='date'
              label='Event Date'
              component={TextInput}
              placeholder='When will it happen?'
            />
            <Button positive type='submit'>
              Submit
            </Button>
            <Button type='button' onClick={() => history.push("/events")}>
              Cancel
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
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
)(
  reduxForm({
    form: "rxEventForm"
  })(EventForm)
);

import React from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import cuid from "cuid";

import { reduxForm, Field } from "redux-form";
import { createEvent, updateEvent } from "../../app/redux/actions/eventActions";
import TextInput from "../../app/common/form/TextInput";
import TextArea from "../../app/common/form/TextArea";
import SelectInput from "../../app/common/form/SelectInput";
import DateInput from "../../app/common/form/DateInput";

import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";

const EventForm = props => {
  const {
    history,
    handleSubmit,
    initialValues,
    createEvent,
    updateEvent,
    invalid,
    submitting,
    pristine
  } = props;

  const category = [
    { key: "drinks", text: "Drinks", value: "drinks" },
    { key: "culture", text: "Culture", value: "culture" },
    { key: "film", text: "Film", value: "film" },
    { key: "food", text: "Food", value: "food" },
    { key: "music", text: "Music", value: "music" },
    { key: "travel", text: "Travel", value: "travel" }
  ];

  const formSubmitHandler = values => {
    if (initialValues && initialValues.id) {
      updateEvent(values);
      history.push(`/events/${initialValues.id}`);
    } else {
      const id = cuid();
      createEvent({
        ...values,
        id,
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Max BigBudget"
      });
      history.push(`/events/${id}`);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment>
          <Header sub color='teal' content='Content Details' />
          <Form onSubmit={handleSubmit(formSubmitHandler)}>
            <Field
              name='title'
              label='Event Title'
              component={TextInput}
              placeholder='Give your event a title'
            />
            <Field
              name='category'
              label='Event Category'
              component={SelectInput}
              options={category}
              placeholder='What is your event about?'
            />
            <Field
              name='description'
              label='Event Description'
              rows={3}
              component={TextArea}
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
              dateFormat='dd LLL yyyy h:mm a'
              showTimeSelect
              timeFormat='HH:mm'
              component={DateInput}
              placeholder='When will it happen?'
            />
            <Button
              disabled={invalid || submitting || pristine}
              positive
              type='submit'
            >
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
  initialValues: props.match.params.id
    ? events && events.find(event => event.id === props.match.params.id)
    : null
});

const validate = combineValidators({
  title: isRequired({ message: "Event title is required" }),
  category: isRequired({ message: "Category is required" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(4)({
      message: "Description must be atleast 5 letters long"
    })
  )(),
  city: isRequired("City"),
  venue: isRequired("Venue"),
  date: isRequired("Date")
});

export default connect(
  mapStateToProps,
  { createEvent, updateEvent }
)(
  reduxForm({
    form: "rxEventForm",
    validate
  })(EventForm)
);

/*global google*/
import React, { useState, useCallback, useEffect } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";

import { reduxForm, Field } from "redux-form";
import {
  createEvent,
  updateEvent,
  cancelEventToggle
} from "../../app/redux/actions/eventActions";
import TextInput from "../../app/common/form/TextInput";
import TextArea from "../../app/common/form/TextArea";
import SelectInput from "../../app/common/form/SelectInput";
import DateInput from "../../app/common/form/DateInput";
import PlacesInput from "../../app/common/form/PlacesInput";

import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";

import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { withFirestore } from "react-redux-firebase";

const EventForm = props => {
  const {
    history,
    firestore,
    match,
    handleSubmit,
    cancelEventToggle,
    initialValues,
    event,
    createEvent,
    updateEvent,
    invalid,
    change,
    submitting,
    pristine
  } = props;

  const [cityLatLng, setCityLatLng] = useState({});
  const [venueLatLng, setVenueLatLng] = useState({});

  const handleCitySelect = city => {
    geocodeByAddress(city)
      .then(results => getLatLng(results[0]))
      .then(latLng => setCityLatLng(latLng))
      .then(() => change("city", city))
      .catch(error => console.error("Error", error));
  };

  const handleVenueSelect = venue => {
    geocodeByAddress(venue)
      .then(results => getLatLng(results[0]))
      .then(latLng => setVenueLatLng(latLng))
      .then(() => change("venue", venue))
      .catch(error => console.error("Error", error));
  };

  const category = [
    { key: "drinks", text: "Drinks", value: "drinks" },
    { key: "culture", text: "Culture", value: "culture" },
    { key: "film", text: "Film", value: "film" },
    { key: "food", text: "Food", value: "food" },
    { key: "music", text: "Music", value: "music" },
    { key: "travel", text: "Travel", value: "travel" }
  ];

  const formSubmitHandler = async values => {
    values.venueLatLng = venueLatLng;
    try {
      if (initialValues && initialValues.id) {
        if (Object.keys(values.venueLatLng).length === 0) {
          values.venueLatLng = event.venueLatLng;
        }
        await updateEvent(values);
        history.push(`/events/${initialValues.id}`);
      } else {
        await createEvent(values);
        history.push(`/events/`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEventCallback = useCallback(async () => {
    if (match && match.params && match.params.id) {
      await firestore.setListener({
        collection: "events",
        doc: match.params.id
      });
    }
  }, [firestore, match]);

  useEffect(() => {
    fetchEventCallback();
    return () =>
      firestore.unsetListener({ collection: "events", doc: match.params.id });
  }, [fetchEventCallback, firestore, match.params.id]);

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
              component={PlacesInput}
              onSelect={handleCitySelect}
              options={{ types: ["(cities)"] }}
              placeholder='Event City?'
            />
            <Field
              name='venue'
              label='Venue'
              onSelect={handleVenueSelect}
              options={{
                location: new google.maps.LatLng(cityLatLng),
                radius: 1000,
                types: ["establishment"]
              }}
              component={PlacesInput}
              placeholder='Specific Venue?'
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
            {Object.keys(event).length > 0 && (
              <Button
                type='button'
                floated='right'
                color={event.cancelled ? "green" : "red"}
                content={event.cancelled ? "Reactivate Event" : "Cancel Event"}
                onClick={() => cancelEventToggle(!event.cancelled, event.id)}
              />
            )}
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = ({ firestore }, props) => {
  const event = props.match.params.id
    ? firestore.ordered.events &&
      firestore.ordered.events.length > 0 &&
      firestore.ordered.events.find(event => event.id === props.match.params.id)
    : {};
  return {
    initialValues: event,
    event
  };
};

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

export default withFirestore(
  connect(
    mapStateToProps,
    { createEvent, updateEvent, cancelEventToggle }
  )(
    reduxForm({
      form: "rxEventForm",
      validate,
      enableReinitialize: true
    })(EventForm)
  )
);

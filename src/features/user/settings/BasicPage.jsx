import React from "react";
import { Segment, Form, Header, Divider, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlacesInput";
import TextInput from "../../../app/common/form/TextInput";

const BasicPage = ({ pristine, submitting, invalid }) => {
  return (
    <Segment>
      <Header dividing size='large' content='Basics' />
      <Form>
        <Field
          label='Username'
          width={8}
          name='displayName'
          type='text'
          component={TextInput}
          placeholder='Known As'
        />
        <Field
          label='Home Town'
          name='city'
          placeholder='Home Town'
          options={{ types: ["(cities)"] }}
          component={PlaceInput}
          width={8}
        />
        <Form.Group inline>{/* todo: Gender Radio button */}</Form.Group>
        <Field
          width={8}
          name='dateOfBirth'
          component={DateInput}
          placeholder='Date of Birth'
        />
        <Divider />
        <Button
          disabled={pristine || submitting || invalid}
          size='large'
          positive
          content='Update Profile'
        />
      </Form>
    </Segment>
  );
};

export default reduxForm({ form: "userProfile", enableReinitialize: true })(
  BasicPage
);

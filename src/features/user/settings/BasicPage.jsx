import React from "react";
import { Segment, Form, Header, Divider, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlacesInput";
import TextInput from "../../../app/common/form/TextInput";
import RadioInput from "../../../app/common/form/RadioInput";
import { addYears } from "date-fns";

const BasicPage = ({ pristine, submitting }) => {
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
        <Form.Group inline>
          <label>Gender: </label>
          <Field
            name='gender'
            type='radio'
            value='male'
            label='Male'
            component={RadioInput}
          />
          <Field
            name='gender'
            type='radio'
            value='female'
            label='Female'
            component={RadioInput}
          />
        </Form.Group>
        <Field
          width={8}
          name='dateOfBirth'
          component={DateInput}
          dateFormat='dd LLL yyyy'
          showYearDropdown={true}
          showMonthDropdown={true}
          dropdownMode='select'
          maxDate={addYears(new Date(), -18)}
          placeholder='Date of Birth'
        />
        <Divider />
        <Button
          disabled={pristine || submitting}
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

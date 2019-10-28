import React from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";

const RegisterForm = () => {
  return (
    <div>
      <Form size='large'>
        <Segment>
          <Field
            label='Display Name'
            name='displayName'
            type='text'
            component={TextInput}
            placeholder='Known As'
          />
          <Field
            label='Your Email'
            name='email'
            type='text'
            component={TextInput}
            placeholder='Email'
          />
          <Field
            label='Your Password'
            name='password'
            type='password'
            component={TextInput}
            placeholder='Password'
          />
          <Button fluid size='large' color='teal'>
            Register
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

export default reduxForm({ form: "rxRegisterForm" })(RegisterForm);

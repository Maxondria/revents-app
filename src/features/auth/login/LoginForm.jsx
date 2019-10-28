import React from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";

import { connect } from "react-redux";
import { login } from "../../../app/redux/actions/authActions";

const LoginForm = ({ login, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit(login)} error size='large'>
      <Segment>
        <Field
          label='Email Address'
          name='email'
          component={TextInput}
          type='text'
          placeholder='Email Address'
        />
        <Field
          label='Your Password'
          name='password'
          component={TextInput}
          type='password'
          placeholder='Password'
        />
        <Button type='submit' fluid size='large' color='teal'>
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default connect(
  undefined,
  { login }
)(
  reduxForm({
    form: "rxLoginForm"
  })(LoginForm)
);

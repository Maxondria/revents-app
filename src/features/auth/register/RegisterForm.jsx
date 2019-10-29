import React from "react";
import { connect } from "react-redux";
import { Form, Segment, Button, Label } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { registerUser } from "../../../app/redux/actions/authActions";

const RegisterForm = ({ handleSubmit, registerUser, error }) => {
  return (
    <div>
      <Form onSubmit={handleSubmit(registerUser)} size='large'>
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
          {error && <Label basic color='red' content={error} />}
          <Button fluid size='large' color='teal'>
            Register
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  undefined,
  { registerUser }
)(reduxForm({ form: "rxRegisterForm" })(RegisterForm));

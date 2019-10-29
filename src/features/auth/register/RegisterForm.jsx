import React from "react";
import { connect } from "react-redux";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { registerUser } from "../../../app/redux/actions/authActions";

import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";

import { isValidEmail } from "../../../app/common/utils/emailValidator";
import SocialLogin from "../social-login/SocialLogin";

const RegisterForm = ({
  handleSubmit,
  registerUser,
  error,
  invalid,
  submitting,
  pristine
}) => {
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
          <Button
            type='submit'
            disabled={invalid || submitting || pristine}
            fluid
            size='large'
            color='teal'
          >
            Register
          </Button>

          <Divider horizontal content='Or' />

          <SocialLogin />
        </Segment>
      </Form>
    </div>
  );
};

const validate = combineValidators({
  email: composeValidators(isRequired("Email"), isValidEmail)(),
  displayName: isRequired("Name"),
  password: composeValidators(
    isRequired("Password"),
    hasLengthGreaterThan(5)({
      message: "Password must be at least 6 characters"
    })
  )()
});

export default connect(
  undefined,
  { registerUser }
)(reduxForm({ form: "rxRegisterForm", validate })(RegisterForm));

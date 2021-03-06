import React from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";

import TextInput from "../../../app/common/form/TextInput";

import { connect } from "react-redux";
import { login, socialLogin } from "../../../app/redux/actions/authActions";

import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";

import { isValidEmail } from "../../../app/common/utils/emailValidator";
import SocialLogin from "../social-login/SocialLogin";

const LoginForm = ({
  login,
  socialLogin,
  handleSubmit,
  error,
  invalid,
  submitting,
  pristine
}) => {
  return (
    <Form onSubmit={handleSubmit(login)} size='large'>
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
        {error && <Label basic color='red' content={error} />}
        <Button
          type='submit'
          fluid
          size='large'
          color='teal'
          disabled={invalid || submitting || pristine}
        >
          Login
        </Button>

        <Divider horizontal content='Or' />

        <SocialLogin socialLogin={socialLogin} />
      </Segment>
    </Form>
  );
};

const validate = combineValidators({
  email: composeValidators(isRequired("Email"), isValidEmail)(),
  password: composeValidators(
    isRequired("Password"),
    hasLengthGreaterThan(5)({
      message: "Password must be at least 6 characters"
    })
  )()
});

export default connect(
  undefined,
  { login, socialLogin }
)(reduxForm({ form: "rxLoginForm", validate })(LoginForm));

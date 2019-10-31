import React from "react";
import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button,
  Icon
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";

import {
  combineValidators,
  matchesField,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from "revalidate";

const AccountPage = ({
  handleSubmit,
  updatePassword,
  error,
  invalid,
  submitting,
  pristine
}) => {
  return (
    <Segment>
      <Header dividing size='large' content='Account' />
      <div>
        <Header color='teal' sub content='Change password' />
        <p>Use this form to update your account settings</p>
        <Form onSubmit={handleSubmit(updatePassword)}>
          <Field
            width={8}
            label='New Password'
            name='newPassword1'
            type='password'
            inline={true}
            component={TextInput}
            basic={true}
            placeholder='New Password'
          />
          <Field
            width={8}
            label='Confirm Password'
            name='newPassword2'
            type='password'
            inline={true}
            basic={true}
            component={TextInput}
            placeholder='Confirm Password'
          />
          {error && (
            <Label basic color='red'>
              {error}
            </Label>
          )}
          <Divider />
          <Button
            size='large'
            positive
            content='Update Password'
            disabled={invalid || submitting || pristine}
          />
        </Form>
      </div>

      <div>
        <Header color='teal' sub content='Facebook Account' />
        <p>Please visit Facebook to update your account settings</p>
        <Button type='button' color='facebook'>
          <Icon name='facebook' />
          Go to Facebook
        </Button>
      </div>

      <div>
        <Header color='teal' sub content='Google Account' />
        <p>Please visit Google to update your account settings</p>
        <Button type='button' color='google plus'>
          <Icon name='google plus' />
          Go to Google
        </Button>
      </div>
    </Segment>
  );
};

const validate = combineValidators({
  newPassword1: composeValidators(
    isRequired({ message: "Please enter your new password" }),
    hasLengthGreaterThan(5)({
      message: "Password must be at least 6 characters"
    })
  )(),
  newPassword2: composeValidators(
    isRequired({ message: "Please confirm your new password" }),
    matchesField("newPassword1")({ message: "Your passwords need to match!" })
  )()
});

export default reduxForm({ form: "rxAccountForm", validate })(AccountPage);

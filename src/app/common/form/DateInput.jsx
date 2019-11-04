import React from "react";
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({
  input: { value, onBlur, onChange },
  width,
  label,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      {/* <Label>{label}</Label> */}
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        selected={
          value
            ? Object.prototype.toString.call(value) === "[object Date]"
              ? value
              : value.toDate()//coming from firebase then
            : null
        }
        onChange={onChange}
        onBlur={(_event, value) => onBlur(value)}
        onChangeRaw={event => event.preventDefault()}
      />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;

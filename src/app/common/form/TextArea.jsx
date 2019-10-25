import React from "react";
import { Form, Label } from "semantic-ui-react";

const TextArea = ({
  input,
  type,
  placeholder,
  rows,
  label,
  meta: { touched, error }
}) => {
  return (
    <>
      <Form.Field error={touched && !!error}>
        <label>{label}</label>
        <textarea {...input} placeholder={placeholder} type={type} rows={rows}></textarea>
        {touched && error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
      </Form.Field>
    </>
  );
};

export default TextArea;

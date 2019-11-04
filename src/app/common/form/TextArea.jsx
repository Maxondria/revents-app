import React from "react";
import { Form, Label } from "semantic-ui-react";

const TextArea = ({
  input,
  width,
  type,
  placeholder,
  rows,
  label,
  meta: { touched, error }
}) => {
  return (
    <>
      <Form.Field error={touched && !!error} width={width}>
        <Label>{label}</Label>
        <textarea
          {...input}
          placeholder={placeholder}
          type={type}
          rows={rows}
        />
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

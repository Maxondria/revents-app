import React from "react";
import PlacesAutocomplete from "react-places-autocomplete"; //   getLatLng //   geocodeByAddress,
import { Form, Label, Segment, List } from "semantic-ui-react";

const PlacesInput = ({
  input: { value, onChange, onBlur },
  width,
  label,
  options,
  onSelect,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <PlacesAutocomplete
      value={value}
      onSelect={onSelect}
      onChange={onChange}
      searchOptions={options}
    >
      {/* Child Component that actually renders on the page, receives props as a child */}
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Form.Field error={touched && !!error}>
          <Label>{label}</Label>
          <input
            placeholder={placeholder}
            {...getInputProps({
              placeholder,
              onBlur
            })}
          />
          {touched && error && (
            <Label basic color='red'>
              {error}
            </Label>
          )}
          {suggestions.length > 0 && (
            <Segment
              style={{
                marginTop: 0,
                position: "absolute",
                zIndex: 1000,
                width: "100%"
              }}
            >
              {loading && <div>Loading...</div>}
              <List selection>
                {suggestions.map(suggestion => (
                  <List.Item {...getSuggestionItemProps(suggestion)}>
                    <List.Header>
                      {suggestion.formattedSuggestion.mainText}
                    </List.Header>

                    <List.Description>
                      {suggestion.formattedSuggestion.secondaryText}
                    </List.Description>
                  </List.Item>
                ))}
              </List>
            </Segment>
          )}
        </Form.Field>
      )}
    </PlacesAutocomplete>
  );
};

export default PlacesInput;
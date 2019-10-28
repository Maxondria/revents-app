import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const LoadingSpinner = ({ inverted = true }) => {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content='Loading, Please wait...' />
    </Dimmer>
  );
};

export default LoadingSpinner;

import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Icon, Button, Segment } from "semantic-ui-react";
import { connect } from "react-redux";

import { openModal } from "../app/redux/actions/modalActions";

const AnyReactComponent = () => <Icon name='marker' size='big' color='red' />;

class GoogleMapsExample extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    const { openModal } = this.props;
    return (
      <>
        {/* // Important! Always set the container height explicitly */}
        <div style={{ height: "300px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBt8PH0yZ0ws-NYw4gQMqIRR4xZ42dBN6w"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent lat={59.955413} lng={30.337844} />
          </GoogleMapReact>
        </div>
        <br />
        <Segment>
          <Button
            type='button'
            onClick={() => openModal("TestModal", { data: 42 })}
          >
            Open Modal
          </Button>
        </Segment>
      </>
    );
  }
}

export default connect(
  undefined,
  { openModal }
)(GoogleMapsExample);

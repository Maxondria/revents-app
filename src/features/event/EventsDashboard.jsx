import React, { useEffect, useCallback } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";

import { connect } from "react-redux";
import LoadingSpinner from "../../app/layouts/LoadingSpinner";
import EventActivity from "./EventActivity";

import { fetchEventsForDashboard } from "../../app/redux/actions/eventActions";

const EventsDashboard = ({ events, loading, fetchEventsForDashboard }) => {
  const fetchEventsCallback = useCallback(() => {
    fetchEventsForDashboard();
  }, [fetchEventsForDashboard]);

  useEffect(() => {
    fetchEventsCallback();
  }, [fetchEventsCallback]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventActivity />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = ({ events, async: { loading } }) => ({
  events,
  loading
});
export default connect(
  mapStateToProps,
  { fetchEventsForDashboard }
)(EventsDashboard);

import React, { useEffect, useCallback, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import EventList from "./EventList";

import { connect } from "react-redux";
import LoadingSpinner from "../../app/layouts/LoadingSpinner";
import EventActivity from "./EventActivity";

import { fetchEventsForDashboard } from "../../app/redux/actions/eventActions";

const EventsDashboard = ({ events, loading, fetchEventsForDashboard }) => {
  const [moreEvents, setMoreEvents] = useState(false);
  const [loadingInitial, setloadingInitial] = useState(true);
  const [loadedEvents, setLoadedEvents] = useState([]);

  const fetchEventsCallback = useCallback(async () => {
    const snapshot = await fetchEventsForDashboard();
    setloadingInitial(false);
    if (snapshot && snapshot.docs && snapshot.docs.length > 1) {
      setMoreEvents(true);
    }
  }, [fetchEventsForDashboard]);

  useEffect(() => {
    fetchEventsCallback();
  }, [fetchEventsCallback]);

  useEffect(() => {
    setLoadedEvents(prevEvents => [...prevEvents, ...events]);
  }, [events]);

  const fetchNextEvents = async () => {
    const lastEvent = events && events[events.length - 1];
    const snapshot = await fetchEventsForDashboard(lastEvent);

    if (snapshot && snapshot.docs && snapshot.docs.length <= 1) {
      setMoreEvents(false);
    }
  };

  return loadingInitial ? (
    <LoadingSpinner />
  ) : (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={loadedEvents}
          fetchNextEvents={fetchNextEvents}
          loading={loading}
          moreEvents={moreEvents}
        />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventActivity />
      </Grid.Column>

      <Grid.Column width={10}>
        <Loader active={loading} />
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

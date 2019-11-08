import React from "react";
import EventsListItem from "./EventsListItem";
import InfiniteScroller from "react-infinite-scroller";

const EventList = ({ events, fetchNextEvents, loading, moreEvents }) => (
  <>
    {events && events.length > 0 && (
      <InfiniteScroller
        pageStart={0}
        loadMore={fetchNextEvents}
        hasMore={!loading && moreEvents}
        initialLoad={false}
      >
        {events &&
          events.map(event => <EventsListItem key={event.id} event={event} />)}
      </InfiniteScroller>
    )}
  </>
);

export default EventList;

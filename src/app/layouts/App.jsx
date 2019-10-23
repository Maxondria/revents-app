import React from "react";
import EventsDashboard from "../../features/event/EventsDashboard";
import NavBar from "../../features/nav/NavBar";
import { Container } from "semantic-ui-react";

const App = () => {
  return (
    <>
      <NavBar />
      <Container className='main'>
        <EventsDashboard />
      </Container>
    </>
  );
};

export default App;

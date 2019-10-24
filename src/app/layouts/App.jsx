import React from "react";
import { Container } from "semantic-ui-react";
import AppRouter from "../../routing/AppRouter";

const App = () => {
  return (
    <>
      <Container className='main'>
        <AppRouter />
      </Container>
    </>
  );
};

export default App;

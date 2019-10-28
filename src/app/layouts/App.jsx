import React from "react";
import AppRouter from "../../routing/AppRouter";
import ModalManager from "../../features/modals/ModalManager";

const App = () => {
  return (
    <>
      <ModalManager />
      <AppRouter />
    </>
  );
};

export default App;

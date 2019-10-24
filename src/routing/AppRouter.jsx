import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import EventsDashboard from "../features/event/EventsDashboard";
import EventsDetailed from "../features/event/EventsDetailed";
import PeopleDashboard from "../features/user/people/PeopleDashboard";
import SettingsDashboard from "../features/user/settings/SettingsDashboard";
import UserDetailedPage from "../features/user/settings/UserDetailedPage";
import EventForm from "../features/event/EventForm";
import NotFoundPage from "../features/user/settings/NotFoundPage";
import NavBar from "../features/nav/NavBar";

const AppRouter = () => {
  return (
    <Switch>
      <Route path='/' component={HomePage} exact />
      <Route
        path='/(.+)'
        render={() => (
          <>
            <NavBar />
            <Route path='/events' component={EventsDashboard} />
            <Route path='/events/:id' component={EventsDetailed} />
            <Route path='/people' component={PeopleDashboard} />
            <Route path='/profile/:id' component={UserDetailedPage} />
            <Route path='/settings' component={SettingsDashboard} />
            <Route path='/create-event' component={EventForm} />
            <Route path='*' component={NotFoundPage} />
          </>
        )}
      />
    </Switch>
  );
};

export default AppRouter;

import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import EventsDashboard from "../features/event/EventsDashboard";
import EventsDetailed from "../features/event/details/EventsDetailed";
import PeopleDashboard from "../features/user/people/PeopleDashboard";
import SettingsDashboard from "../features/user/settings/SettingsDashboard";
import UserDetailedPage from "../features/user/details/UserDetailedPage";
import EventForm from "../features/event/EventForm";
import NotFoundPage from "../features/user/settings/NotFoundPage";
import NavBar from "../features/nav/NavBar";
import { Container } from "semantic-ui-react";
import GoogleMapsExample from "../playground/GoogleMapsExample";

const AppRouter = props => {
  return (
    <Switch>
      <Route path='/' component={HomePage} exact />
      <Route
        path='/(.+)'
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Switch key={props.location.key}>
                <Route path='/events' exact component={EventsDashboard} />
                <Route path='/events/:id' component={EventsDetailed} />
                <Route path='/people' component={PeopleDashboard} />
                <Route path='/profile/:id' component={UserDetailedPage} />
                <Route path='/settings' component={SettingsDashboard} />
                <Route path='/test-places' component={GoogleMapsExample} />
                <Route
                  path={["/create-event", "/manage-event/:id"]}
                  component={EventForm}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </Container>
          </>
        )}
      />
    </Switch>
  );
};

export default withRouter(AppRouter);

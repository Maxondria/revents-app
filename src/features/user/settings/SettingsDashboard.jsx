import React from "react";
import { Grid } from "semantic-ui-react";
import SettingsNav from "./SettingsNav";
import { Route, Switch, Redirect } from "react-router-dom";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import PhotosPage from "./PhotosPage";
import AccountPage from "./AccountPage";

import { connect } from "react-redux";
import { updatePassword } from "../../../app/redux/actions/authActions";

const SettingsDashboard = ({ updatePassword, providerId }) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          {/* Redirect immediately to show basic settings here only if we are from /settings */}
          <Redirect exact from='/settings' to='/settings/basic' />

          <Route path='/settings/basic' component={BasicPage} />
          <Route path='/settings/about' component={AboutPage} />
          <Route path='/settings/photos' component={PhotosPage} />
          <Route
            path='/settings/account'
            render={routeProps => (
              <AccountPage
                updatePassword={updatePassword}
                providerId={providerId}
                {...routeProps}
              />
            )}
          />
        </Switch>
      </Grid.Column>

      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = ({ firebase: { auth } }) => ({
  providerId: auth.providerData[0].providerId
});

export default connect(
  mapStateToProps,
  { updatePassword }
)(SettingsDashboard);

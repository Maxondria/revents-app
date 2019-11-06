import React from "react";
import { connect } from "react-redux";

import { Button, Grid, Segment } from "semantic-ui-react";
import UserDetailedPageHeader from "./UserDetailedPageHeader";
import UserDetailedPageAbout from "./UserDetailedPageAbout";
import UserDetailedPagePhotos from "./UserDetailedPagePhotos";
import UserDetailedPageEvents from "./UserDetailedPageEvents";
import { Link } from "react-router-dom";

const UserDetailedPage = ({ auth, profile }) => {
  return (
    <Grid>
      <UserDetailedPageHeader profile={profile} />

      <UserDetailedPageAbout profile={profile} />

      <Grid.Column width={4}>
        <Segment>
          <Button
            color='teal'
            as={Link}
            to='/settings/about'
            fluid
            basic
            content='Edit Profile'
          />
        </Segment>
      </Grid.Column>

      <UserDetailedPagePhotos />

      <UserDetailedPageEvents />
    </Grid>
  );
};

const mapStateToProps = ({ firebase }) => ({
  auth: firebase.auth,
  profile: firebase.profile
});

export default connect(mapStateToProps)(UserDetailedPage);

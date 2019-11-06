import React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
import UserDetailedPageHeader from "./UserDetailedPageHeader";
import UserDetailedPageAbout from "./UserDetailedPageAbout";
import UserDetailedPagePhotos from "./UserDetailedPagePhotos";
import UserDetailedPageEvents from "./UserDetailedPageEvents";

const UserDetailedPage = () => {
  return (
    <Grid>
      <UserDetailedPageHeader />

      <UserDetailedPageAbout />

      <Grid.Column width={4}>
        <Segment>
          <Button color='teal' fluid basic content='Edit Profile' />
        </Segment>
      </Grid.Column>

      <UserDetailedPagePhotos />

      <UserDetailedPageEvents />
    </Grid>
  );
};

export default UserDetailedPage;

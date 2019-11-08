import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { Button, Grid, Segment } from "semantic-ui-react";
import UserDetailedPageHeader from "./UserDetailedPageHeader";
import UserDetailedPageAbout from "./UserDetailedPageAbout";
import UserDetailedPagePhotos from "./UserDetailedPagePhotos";
import UserDetailedPageEvents from "./UserDetailedPageEvents";
import { Link } from "react-router-dom";
import { isEmpty, firestoreConnect } from "react-redux-firebase";

const UserDetailedPage = ({ profile, auth, userUid }) => {
  return (
    <Grid>
      <UserDetailedPageHeader profile={profile} />

      <UserDetailedPageAbout profile={profile} />

      <Grid.Column width={4}>
        <Segment>
          {auth.uid === userUid ? (
            <Button
              color='teal'
              as={Link}
              to='/settings/about'
              fluid
              basic
              content='Edit Profile'
            />
          ) : (
            <Button
              color='teal'
              fluid
              basic
              content={`Follow ${profile.displayName}`}
            />
          )}
        </Segment>
      </Grid.Column>

      <UserDetailedPagePhotos profile={profile} auth={auth} userUid={userUid} />

      <UserDetailedPageEvents />
    </Grid>
  );
};

const query = ({ userUid }) => {
  if (userUid !== null) {
    return [
      {
        collection: "users",
        doc: userUid,
        storeAs: "otherProfiles"
      }
    ];
  }
};

const mapStateToProps = (
  { firebase: { profile: firebaseProfile, auth }, firestore: { ordered } },
  { match }
) => {
  const userUid = match.params.id;
  const profile =
    userUid === auth.uid
      ? firebaseProfile
      : !isEmpty(ordered.otherProfiles) && ordered.otherProfiles[0];
  return {
    profile,
    userUid,
    auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(componentProps => query(componentProps))
)(UserDetailedPage);

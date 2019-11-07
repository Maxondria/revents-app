import React from "react";
import { Grid, Segment, Header, Image } from "semantic-ui-react";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";

const UserDetailedPagePhotos = ({ photos }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached>
        <Header icon='image' content='Photos' />

        <Image.Group size='small'>
          {(photos &&
            photos.map(photo => <Image key={photo.id} src={photo.url} />)) || (
            <Image src='/assets/user.png' />
          )}
        </Image.Group>
      </Segment>
    </Grid.Column>
  );
};

const query = ({ auth, userUid }) => {
  if (userUid === auth.uid) {
    return [
      {
        collection: "users",
        doc: auth.uid,
        subcollections: [{ collection: "photos" }],
        storeAs: "photos"
      }
    ];
  } else {
    return [
      {
        collection: "users",
        doc: userUid,
        storeAs: "otherProfiles"
      },
      {
        collection: "users",
        doc: userUid,
        subcollections: [{ collection: "photos" }],
        storeAs: "photos"
      }
    ];
  }
};

const mapStateToProps = (
  {
    firestore: {
      ordered: { photos: currentUserPhotos, otherProfiles }
    }
  },
  { auth, userUid }
) => {
  const photos =
    userUid === auth.uid
      ? currentUserPhotos
      : !isEmpty(otherProfiles) && otherProfiles[0].photos;
  return {
    auth,
    photos
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(componentProps => query(componentProps))
)(UserDetailedPagePhotos);

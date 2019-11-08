import React from "react";
import { Grid, Segment, Header, Image } from "semantic-ui-react";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import Lazyload from "react-lazyload";

const UserDetailedPagePhotos = ({ photos }) => {
  return photos && photos.length > 0 ? (
    <Grid.Column width={12}>
      <Segment attached>
        <Header icon='image' content='Photos' />

        <Image.Group size='small'>
          {photos.map(photo => (
            <Lazyload
              key={photo.id}
              height={150}
              placeholder={<Image src='/assets/user.png' />}
            >
              <Image src={photo.url} />
            </Lazyload>
          ))}
        </Image.Group>
      </Segment>
    </Grid.Column>
  ) : (
    ""
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

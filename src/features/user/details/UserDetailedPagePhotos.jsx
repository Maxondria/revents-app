import React from "react";
import { Grid, Segment, Header, Image } from "semantic-ui-react";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

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

const query = ({ auth }) => [
  {
    collection: "users",
    doc: auth.uid,
    subcollections: [{ collection: "photos" }],
    storeAs: "photos"
  }
];

const mapStateToProps = ({
  firebase: { auth },
  firestore: {
    ordered: { photos }
  }
}) => ({ auth, photos });

export default compose(
  connect(mapStateToProps),
  firestoreConnect(componentProps => query(componentProps))
)(UserDetailedPagePhotos);

import React, { useState, useEffect } from "react";
import { Segment, Header, Divider, Grid, Button } from "semantic-ui-react";
import DropzoneInput from "./DropzoneInput";
import CropperInput from "./CropperInput";

import { connect } from "react-redux";
import {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
} from "../../../../app/redux/actions/userActions";
import { toastr } from "react-redux-toastr";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import UserPhotos from "./UserPhotos";

const PhotosPage = ({
  uploadProfileImage,
  deletePhoto,
  setMainPhoto,
  photos,
  profile,
  loading
}) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    //clean up on ummount and before new file updates
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const clearUploadedFile = () => {
    setFiles([]);
    setImage(null);
  };

  const handleDeletePhoto = async photo => {
    try {
      await deletePhoto(photo);
      toastr.success("Success", "Image Deleted Successfully!");
    } catch (error) {
      toastr.error("Oops ", error.message);
    }
  };

  const handleSetMainPhoto = async photo => {
    try {
      await setMainPhoto(photo);
    } catch (error) {
      toastr.error("Oops ", error.message);
    }
  };

  const handleImageUpload = async () => {
    try {
      await uploadProfileImage(image, files[0].name);
      clearUploadedFile();
      toastr.success("Success", "Image Uploaded Successfully!");
    } catch (error) {
      console.log(error);
      toastr.error("Oops, Failed!", "Image Upload Failed!");
    }
  };

  return (
    <Segment>
      <Header dividing size='large' content='Your Photos' />
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header color='teal' sub content='Step 1 - Add Photo' />
          <DropzoneInput setFiles={setFiles} />
        </Grid.Column>

        <Grid.Column width={1} />

        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 2 - Resize image' />
          {files.length > 0 && (
            <CropperInput imagePreview={files[0].preview} setImage={setImage} />
          )}
        </Grid.Column>

        <Grid.Column width={1} />

        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 3 - Preview & Upload' />
          {files.length > 0 && (
            <>
              <div
                className='img-preview'
                style={{
                  minHeight: "200px",
                  minWidth: "200px",
                  overflow: "hidden"
                }}
              />

              <Button.Group>
                <Button
                  loading={loading}
                  onClick={handleImageUpload}
                  style={{ width: "100px" }}
                  positive
                  icon='check'
                />

                <Button
                  disabled={loading}
                  onClick={clearUploadedFile}
                  style={{ width: "100px" }}
                  icon='close'
                />
              </Button.Group>
            </>
          )}
        </Grid.Column>
      </Grid>

      <Divider />

      <UserPhotos
        photos={photos}
        profile={profile}
        handleDeletePhoto={handleDeletePhoto}
        handleSetMainPhoto={handleSetMainPhoto}
      />
    </Segment>
  );
};

const mapStateToProps = ({
  firebase: { auth, profile },
  firestore: {
    ordered: { photos }
  },
  async: { loading }
}) => ({
  auth,
  profile,
  photos,
  loading
});

const query = ({ auth }) => [
  {
    collection: "users",
    doc: auth.uid,
    subcollections: [{ collection: "photos" }],
    storeAs: "photos"
  }
];

export default compose(
  connect(
    mapStateToProps,
    { uploadProfileImage, deletePhoto, setMainPhoto }
  ),
  firestoreConnect(componentProps => query(componentProps))
)(PhotosPage);

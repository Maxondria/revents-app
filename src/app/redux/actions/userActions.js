import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";
import cuid from "cuid";
import {
  asynActionStart,
  asyncActionFinish,
  asyncActionError
} from "./asyncActions";

export const updateProfile = user => async (
  dispatch,
  _getState,
  { getFirebase }
) => {
  try {
    const firebase = getFirebase();
    const { isLoaded, isEmpty, ...updatedUser } = user;

    await firebase.updateProfile(updatedUser);

    await dispatch(reset("rxUpdateProfileForm"));
    await dispatch(reset("rxUserProfileForm"));
    toastr.success("Success!", "Profile Updated Successfully!");
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = (file, filename) => async (
  dispatch,
  _getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  const imagename = cuid();

  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = { name: imagename };

  try {
    dispatch(asynActionStart());

    const uploadedFile = await firebase.uploadFile(path, file, null, options);
    const downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    const userRef = await firestore.get(`users/${user.uid}`);

    if (!userRef.data().photoURL) {
      await firebase.updateProfile({ photoURL: downloadURL });
      await user.updateProfile({ photoURL: downloadURL });
    }

    await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }]
      },
      { name: imagename, url: downloadURL }
    );
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const deletePhoto = photo => async (
  _dispatch,
  _getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images/${photo.name}`;
  try {
    await firebase.deleteFile(path);
    await firestore.delete({
      collection: "users",
      doc: user.uid,
      subcollections: [{ collection: "photos", doc: photo.id }]
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const setMainPhoto = photo => async (
  _dispatch,
  _getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    await firebase.updateProfile({ photoURL: photo.url });
    await user.updateProfile({ photoURL: photo.url });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

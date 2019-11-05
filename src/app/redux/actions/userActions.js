import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";
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

  const { uid, updateProfile } = firebase.auth().currentUser;
  const path = `${uid}/user_images`;
  const options = { filename };

  try {
    dispatch(asynActionStart());

    const uploadedFile = await firebase.uploadFile(path, file, null, options);
    const downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    const userRef = await firestore.get(`users/${uid}`);

    if (!userRef.data().photoURL) {
      await firebase.updateProfile({ photoURL: downloadURL });
      await updateProfile({ photoURL: downloadURL });
    }

    await firestore.add(
      {
        collection: "users",
        doc: uid,
        subcollections: [{ collection: "photos" }]
      },
      { name: filename, url: downloadURL }
    );

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

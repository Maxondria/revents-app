import { closeModal } from "./modalActions";

import { SubmissionError, reset } from "redux-form";
import { toastr } from "react-redux-toastr";

export const login = ({ email, password }) => {
  return async (dispatch, _getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: "Oops, Login Failed, Please try again!"
      });
    }
  };
};

export const registerUser = ({ email, password, displayName }) => async (
  dispatch,
  _getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  try {
    const createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await createdUser.user.updateProfile({
      displayName
    });

    await firestore.set(`users/${createdUser.user.uid}`, {
      displayName,
      createdAt: firestore.FieldValue.serverTimestamp()
    });
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: "Oops, Registration Failed, Already Have An Account? Sign In"
    });
  }
};

export const socialLogin = provider => async (
  dispatch,
  _getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  try {
    dispatch(closeModal());
    const user = await firebase.login({
      provider,
      type: "popup"
    });

    if (user.additionalUserInfo.isNewUser) {
      await firestore.set(`users/${user.user.uid}`, {
        displayName: user.profile.displayName,
        photoURL: user.profile.avatarUrl,
        createdAt: firestore.FieldValue.serverTimestamp()
      });
    }
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message
    });
  }
};

export const updatePassword = ({ newPassword1 }) => async (
  dispatch,
  _getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  try {
    const user = firebase.auth().currentUser;

    await user.updatePassword(newPassword1);
    await dispatch(reset("rxAccountForm"));
    toastr.success("Success!", "Password Updated Successfully!");
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message
    });
  }
};

//FB john_iukwefd_lauberg@tfbnw.net, maxondria

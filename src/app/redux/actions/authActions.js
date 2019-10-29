import { closeModal } from "./modalActions";

import { SubmissionError } from "redux-form";

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

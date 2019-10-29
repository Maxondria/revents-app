import { SIGN_OUT_USER } from "../constants/actionTypes";
import { closeModal } from "./modalActions";

import { SubmissionError } from "redux-form";

export const login = ({ email, password }) => {
  return async (dispatch, getState, { getFirebase }) => {
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

export const logout = () => ({
  type: SIGN_OUT_USER
});

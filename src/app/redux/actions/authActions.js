import { LOGIN_USER, SIGN_OUT_USER } from "../constants/actionTypes";
import { closeModal } from "./modalActions";

export const login = credentials => {
  return dispatch => {
    dispatch({
      type: LOGIN_USER,
      payload: {
        credentials
      }
    });

    dispatch(closeModal());
  };
};

export const logout = () => ({
  type: SIGN_OUT_USER
});

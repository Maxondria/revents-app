import { initialState } from "../store/initialState";
import { createReducer } from "../../common/utils/reducer-utils";
import { LOGIN_USER, SIGN_OUT_USER } from "../constants/actionTypes";

export const authReducer = createReducer(initialState.auth, {
  [LOGIN_USER]: (_state, { credentials }) => ({
    authenticated: true,
    currentUser: credentials.email
  }),
  [SIGN_OUT_USER]: _state => ({
    authenticated: true,
    currentUser: null
  })
});

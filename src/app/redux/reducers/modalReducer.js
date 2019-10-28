import { initialState } from "../store/initialState";
import { createReducer } from "../../common/utils/reducer-utils";
import { MODAL_OPEN, MODAL_CLOSE } from "../constants/actionTypes";

export const modalReducer = createReducer(initialState.modal, {
  [MODAL_OPEN]: (_state, { modaltype, modalProps }) => ({
    modaltype,
    modalProps
  }),
  [MODAL_CLOSE]: (_state, _payload) => null
});

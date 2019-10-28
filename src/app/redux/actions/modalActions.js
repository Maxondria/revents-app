import { MODAL_OPEN, MODAL_CLOSE } from "../constants/actionTypes";

export const openModal = (modaltype, modalProps) => ({
  type: MODAL_OPEN,
  payload: { modaltype, modalProps }
});

export const closeModal = () => ({
  type: MODAL_CLOSE
});
import React from "react";
import { connect } from "react-redux";

import TestModal from "./TestModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const MODAL_STACK = {
  TestModal,
  LoginModal,
  RegisterModal
};

const ModalManager = ({ currentModal }) => {
  let renderedModal;

  if (currentModal) {
    const { modaltype, modalProps } = currentModal;
    const ModalComponent = MODAL_STACK[modaltype];
    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
};

const mapStateToProps = ({ modals }) => ({
  currentModal: modals
});

export default connect(mapStateToProps)(ModalManager);

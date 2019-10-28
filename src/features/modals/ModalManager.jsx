import React from "react";
import { connect } from "react-redux";
import TestModal from "./TestModal";

const MODAL_STACK = {
  TestModal
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

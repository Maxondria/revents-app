import React from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";

import LoginForm from "../auth/login/LoginForm";
import { closeModal } from "../../app/redux/actions/modalActions";

const LoginModal = ({ closeModal }) => {
  return (
    <Modal size='mini' open={true} onClose={closeModal}>
      <Modal.Header>Login to Re-vents</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <LoginForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default connect(
  null,
  { closeModal }
)(LoginModal);

import React from "react";
import { Container, Menu, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "./menus/SignedOutMenu";
import SignedInMenu from "./menus/SignedInMenu";

import { connect } from "react-redux";
import { openModal } from "../../app/redux/actions/modalActions";
import { logout } from "../../app/redux/actions/authActions";

const NavBar = ({
  history,
  openModal,
  logout,
  auth: { authenticated, currentUser }
}) => {
  const handleSignIn = () => openModal("LoginModal");

  const handleSignUp = () => openModal("RegisterModal");

  const handleSignOut = () => {
    logout();
    history.push("/");
  };

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img
            src='/assets/logo.png'
            style={{ marginRight: "1.5em" }}
            alt='logo'
          />
          Re-vents
        </Menu.Item>

        <Menu.Item as={NavLink} exact to='/events' name='Events' />

        <Menu.Item as={NavLink} to='/people' name='People' />

        <Menu.Item as={NavLink} to='/test-places' name='Test' />

        <Menu.Item>
          <Button
            as={Link}
            to='/create-event'
            floated='right'
            positive
            inverted
            content='Create Event'
          />
        </Menu.Item>

        {authenticated ? (
          <SignedInMenu signOut={handleSignOut} currentUser={currentUser} />
        ) : (
          <SignedOutMenu signIn={handleSignIn} signUp={handleSignUp} />
        )}
      </Container>
    </Menu>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { openModal, logout }
  )(NavBar)
);

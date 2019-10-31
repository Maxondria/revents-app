import React from "react";
import { Container, Menu, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "./menus/SignedOutMenu";
import SignedInMenu from "./menus/SignedInMenu";

import { connect } from "react-redux";
import { openModal } from "../../app/redux/actions/modalActions";

import { withFirebase } from "react-redux-firebase";

const NavBar = ({ history, openModal, firebase, auth, profile }) => {
  const authenticated = auth.isLoaded && !auth.isEmpty;

  const handleSignIn = () => openModal("LoginModal");

  const handleSignUp = () => openModal("RegisterModal");

  const handleSignOut = () => {
    firebase.logout();
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

        {authenticated && (
          <>
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
          </>
        )}

        {authenticated ? (
          <SignedInMenu signOut={handleSignOut} profile={profile} />
        ) : (
          <SignedOutMenu signIn={handleSignIn} signUp={handleSignUp} />
        )}
      </Container>
    </Menu>
  );
};

const mapStateToProps = ({ firebase }) => ({
  auth: firebase.auth,
  profile: firebase.profile
});

export default withRouter(
  withFirebase(
    connect(
      mapStateToProps,
      { openModal }
    )(NavBar)
  )
);

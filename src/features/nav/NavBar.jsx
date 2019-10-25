import React, { useState } from "react";
import { Container, Menu, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "./menus/SignedOutMenu";
import SignedInMenu from "./menus/SignedInMenu";

const NavBar = props => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleSignIn = () => setAuthenticated(true);
  const handleSignOut = () => {
    setAuthenticated(false);
    props.history.push("/");
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
          <SignedInMenu signOut={handleSignOut} />
        ) : (
          <SignedOutMenu signIn={handleSignIn} />
        )}
      </Container>
    </Menu>
  );
};

export default withRouter(NavBar);

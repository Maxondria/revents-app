import React from "react";
import { Container, Menu, Button } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
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

        <Menu.Item as={NavLink} to='/events' name='Events' />

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

        <Menu.Item position='right'>
          <Button basic inverted content='Login' />
          <Button
            basic
            inverted
            content='Sign Out'
            style={{ marginLeft: "0.5em" }}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;

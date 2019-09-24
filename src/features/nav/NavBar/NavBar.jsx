import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";

import { openModal } from "../../modals/modalActions";
import { logout } from "../../auth/authActions";

const actions = {
  openModal,
  logout
};

const mapState = state => ({
  auth: state.auth
});

class NavBar extends Component {
  render() {
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item floated="left" header>
            Management
          </Menu.Item>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/baseline_restaurant_white_18dp.png" alt="logo" />
            Log out
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Main" />
          <Menu.Item as={NavLink} to="/revenue" name="Revenue" />
          <Menu.Item as={NavLink} to="/edit" name="Edit" />
        </Container>
      </Menu>
    );
  }
}

export default withRouter(
  connect(
    mapState,
    actions
  )(NavBar)
);

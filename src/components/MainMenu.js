import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
 } from 'reactstrap';
 import { LOGOUT } from '../redux/ActionTypes';


class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = () => {
    this.props.logout();
    sessionStorage.removeItem('jwtToken')
  }

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to='/'>Swag-Pictures</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
              {this.props.currentUser.isAuthenticated ? (
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to='/Add_Picture'>Add Picture!</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to='/Profile'>Profile</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={this.handleLogout}>Logout!</NavLink>
                  </NavItem>
                </Nav>
              ) : (
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to='/Register'>Register</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to='/Login'>Login</NavLink>
                  </NavItem>
                </Nav>
              )}
        </Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps (state) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps (dispatch) {
  return {
    logout: () => dispatch({type: LOGOUT})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);

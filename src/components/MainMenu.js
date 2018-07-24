import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
 } from 'reactstrap';

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

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to='/'>Swag-Pictures</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to='/Register'>Register</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/Login'>Login</NavLink>
              </NavItem>
            </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default MainMenu;

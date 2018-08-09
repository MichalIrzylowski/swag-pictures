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
  NavLink,
  Form,
  InputGroup,
  InputGroupAddon,
  Input
//  Container
 } from 'reactstrap';
 import { LOGOUT, SEARCH_FOR_USER_REQUEST } from '../redux/ActionTypes';


class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      username: ''
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = () => {
    this.props.logout();
    sessionStorage.removeItem('jwtToken');
  }

  handleChange = (e) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.search(this.state.username);
    this.setState({...this.state, username: ''});
    this.props.props.history.push('/Found_Users');
  }

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to='/'>Swag-Pictures</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          {this.props.currentUser.isAuthenticated ? (
            <Nav className="ml-auto" navbar>
              <Form onSubmit={this.handleSubmit}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Username:</InputGroupAddon>
                  <Input placeholder="Author of app: Michal" type='text' name='username' value={this.state.username} onChange={this.handleChange}/>
                </InputGroup>
              </Form>
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
    logout: () => dispatch({type: LOGOUT}),
    search: (username) => dispatch({type: SEARCH_FOR_USER_REQUEST, payload: {username}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);

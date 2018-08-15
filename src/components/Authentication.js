import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { REGISTER_REQUEST, LOGIN_REQUEST } from '../redux/ActionTypes';

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

 handleChange = name => e => {
   this.setState({
     ...this.state,
     [name]: e.target.value
   })
 }

 componentDidUpdate(prevState) {
   if (this.props.user.isAuthenticated !== prevState.user.isAuthenticated) {
     this.props.history.push('/');
   }
 }

 handleRegister = e => {
   e.preventDefault();
   this.props.sendRegisterData(this.state);
   this.setState({email:'', password: ''});
 }

 handleLogin = e => {
   e.preventDefault();
   this.props.sendLoginData(this.state);
   this.setState({email:'', password: ''});
 }

  render() {
    return (
      <Form onSubmit={this.props.match.path === '/Register' ? this.handleRegister : this.handleLogin}>
        {this.props.match.path === '/Register' ? <h2>Register yourself</h2> : <h2>Login yourself!</h2> }
        {this.props.match.path === '/Register' ? <p>Remember to put fake data!</p> : <p>Put your login data below.</p>}
        <FormGroup>
          <Label htmlFor='email'>Email</Label>
          <Input name='email' id='email' type='email' placeholder='example@example.com' value={this.state.email} onChange={this.handleChange('email')} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor='password'>Password</Label>
          <Input name='password' id='password' type='password' placeholder='Make it secure!' value={this.state.password} onChange={this.handleChange('password')} />
        </FormGroup>
        <Button color='success'>{this.props.match.path === '/Register' ? 'Register!' : 'Sign up!'}</Button>
      </Form>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return  {
    sendRegisterData: (data) => dispatch({type: REGISTER_REQUEST, payload: data}),
    sendLoginData: (data) => dispatch({type: LOGIN_REQUEST, payload: data})
  }
}

function mapStateToProps (state) {
  return {
    user: state.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);

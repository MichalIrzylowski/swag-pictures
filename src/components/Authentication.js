import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export default class Authentication extends Component {
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

 handleSubmit = e => {
   e.preventDefault();
   console.log(this.state)
 }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
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

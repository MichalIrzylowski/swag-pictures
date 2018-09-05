import React, { Component } from "react";
import { connect } from "react-redux";
import validator from "validator";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { REGISTER_REQUEST, LOGIN_REQUEST } from "../redux/ActionTypes";
import ValidateFormAlert from "./ValidateFormAlert";

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: { email: "", password: "" }
    };
  }

  handleChange = name => e => {
    this.setState({
      ...this.state,
      [name]: e.target.value
    });
  };

  componentDidUpdate(prevState) {
    if (this.props.user.isAuthenticated !== prevState.user.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  validate = (email, password) => {
    let errors = {};
    if (!validator.isEmail(email)) {
      errors.email = "Please put valid email!";
    }
    if (!validator.isLength(password, { min: 8, max: undefined })) {
      errors.password = "Password has to have at least 8 characters!";
    }
    return errors;
  };

  handleRegister = e => {
    e.preventDefault();
    const formErrors = this.validate(this.state.email, this.state.password);
    this.setState({ ...this.state, errors: formErrors });
    if (Object.keys(formErrors).length === 0) {
      this.props.sendRegisterData({
        email: this.state.email,
        password: this.state.password
      });
      this.setState({ email: "", password: "", errors: {} });
    }
  };

  handleLogin = e => {
    e.preventDefault();
    const formErrors = this.validate(this.state.email, this.state.password);
    this.setState({ ...this.state, errors: formErrors });
    if (Object.keys(formErrors).length === 0) {
      this.props.sendLoginData({
        email: this.state.email,
        password: this.state.password
      });
      this.setState({ email: "", password: "", errors: {} });
    }
  };

  render() {
    const { errors, loading } = this.props;

    return (
      <Form
        onSubmit={
          this.props.match.path === "/Register"
            ? this.handleRegister
            : this.handleLogin
        }
      >
        {errors.register ||
          (errors.login && (
            <Alert color="danger">
              <h4 className="alert-heading">Validation error</h4>
              <p>{errors.register || errors.login}</p>
            </Alert>
          ))}
        {this.props.match.path === "/Register" ? (
          <h2>Register yourself</h2>
        ) : (
          <h2>Login yourself!</h2>
        )}
        {this.props.match.path === "/Register" ? (
          <p>Remember to put fake data!</p>
        ) : (
          <p>Put your login data below.</p>
        )}
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="text"
            placeholder="example@example.com"
            value={this.state.email}
            onChange={this.handleChange("email")}
          />
          {this.state.errors.email && (
            <ValidateFormAlert text={this.state.errors.email} />
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Make it secure!"
            value={this.state.password}
            onChange={this.handleChange("password")}
          />
          {this.state.errors.password && (
            <ValidateFormAlert text={this.state.errors.password} />
          )}
        </FormGroup>
        <Button
          color="success"
          disabled={loading.registration || loading.login}
        >
          {this.props.match.path === "/Register" ? "Register!" : "Sign up!"}
          {(loading.registration || loading.login) && (
            <i class="fas fa-circle-notch" />
          )}
        </Button>
      </Form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendRegisterData: data =>
      dispatch({ type: REGISTER_REQUEST, payload: data }),
    sendLoginData: data => dispatch({ type: LOGIN_REQUEST, payload: data })
  };
}

function mapStateToProps(state) {
  return {
    user: state.currentUser,
    errors: {
      register: state.registration.error.message,
      login: state.login.error.message
    },
    loading: {
      register: state.registration.loading,
      login: state.login.loading
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authentication);

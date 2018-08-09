import React, { Component } from 'react';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import { UPDATE_PROFILE_REQUEST } from '../redux/ActionTypes';

class UserEditForm extends Component {
  constructor (props) {
    super(props);

    const {username, description} = this.props;

    this.state = {
      file: '',
      username: username,
      description: description
    }
  }

  handleFilePick = (e) => {
    const file = e.target.files[0];
    this.setState({ ...this.state, file });
  }

  handleChange = (e) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (this.state.file) {
      formData.append('picture', this.state.file, this.state.file.name);
    }
    formData.append('username', this.state.username);
    formData.append('description', this.state.description);
    const id = this.props.userId;
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    this.props.updateProfile(formData, id, config);
    this.setState({ProfileImage: '', username: '', description: ''})
  }

  render() {
    return(
      <Container>
        <Row>
          <Col xs='3'>
            Menu will be here
          </Col>
          <Col xs='7' center>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor='ProfileImage'>Profile Image</Label>
                <Input type='file' id='ProfileImage' name='ProfileImage' onChange={this.handleFilePick} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor='username'>Username:</Label>
                <Input type='text' id='username' name='username' value={this.state.username} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor='description'>Description:</Label>
                <Input type='textarea' id='description' name='description' value={this.state.description} onChange={this.handleChange} />
              </FormGroup>
              <Button color='success'>Update!</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateProfile: (data, id, config) => dispatch({type: UPDATE_PROFILE_REQUEST, payload: data, id, config})
  }
}

function mapStateToProps (state) {
  return {
    userId: state.currentUser.user.id,
    username: state.currentUser.user.username,
    description: state.currentUser.user.description
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditForm);

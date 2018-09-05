import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { ADD_PICTURE_REQUEST } from "../redux/ActionTypes";

class AddPictureForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      title: "",
      description: ""
    };
  }

  handleFilePick = e => {
    const file = e.target.files[0];
    this.setState({ ...this.state, file });
  };

  handleChange = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    formData.append("picture", this.state.file, this.state.file.name);
    const id = this.props.userId;
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    this.props.sendPictureData(formData, id, config);
    this.setState({ file: "", title: "", description: "" });
  };

  render() {
    const { loading } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Add your swag picture!</h1>
        <FormGroup>
          <Label>Picture:</Label>
          <Input
            name="file"
            id="file"
            type="file"
            onChange={this.handleFilePick}
          />
        </FormGroup>
        <FormGroup>
          <Label>Title:</Label>
          <Input
            name="title"
            id="title"
            type="text"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Description:</Label>
          <Input
            name="description"
            id="description"
            type="text"
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button color="success" disabled={loading}>
          Add Swag Picture!
          {loading && <i class="fas fa-circle-notch" />}
        </Button>
      </Form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendPictureData: (data, userId, config) =>
      dispatch({ type: ADD_PICTURE_REQUEST, payload: data, userId, config })
  };
}

function mapStateToProps(state) {
  return {
    userId: state.currentUser.user.id,
    loading: state.addPicture.loading
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPictureForm);

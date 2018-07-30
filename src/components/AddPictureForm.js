import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class AddPictureForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ''
    }
  }

  handleFilePick = e => {
    const file = e.target.files[0];
    this.setState({ file });
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.file)
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <h1>Add your swag picture!</h1>
        <FormGroup>
          <Label></Label>
          <Input type='file' onChange={this.handleFilePick} />
        </FormGroup>
        <Button color='success'>Add Swag Picture!</Button>
      </Form>
    )
  }
}


export default AddPictureForm;

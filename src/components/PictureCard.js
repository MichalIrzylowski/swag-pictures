import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
  Form,
  Input,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../redux/ActionTypes";

class PictureCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }

  handleChange = e => {
    this.setState({ comment: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.comment) {
      this.props.sendComment(
        this.state.comment,
        this.props.pictureId,
        this.props.userId
      );
      this.setState({ comment: "" });
    }
  };

  render() {
    let { img, title, description, author, comments } = this.props;

    return (
      <Card style={{ marginTop: "20px" }}>
        <CardBody>
          <CardLink>
            <CardSubtitle>
              <img
                src={author.profileImgUrl}
                alt={author.username}
                className="PictureCard_username_profileImg"
              />
              {author.username}
            </CardSubtitle>
          </CardLink>
        </CardBody>
        <CardImg width="100%" src={img} alt="Card" />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>{description}</CardText>
          {comments.length > 0 && (
            <button>{`Show all coments: ${comments.length} `}</button>
          )}
        </CardBody>
        <hr />
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            value={this.state.comment}
            onChange={this.handleChange}
            placeholder="Add a comment (please be nice)"
            style={{ border: "none", marginBottom: "1em" }}
          />
        </Form>
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendComment: (comment, pictureId, userId) =>
      dispatch({
        type: ADD_COMMENT_REQUEST,
        payload: { comment, pictureId, userId }
      })
  };
}

export default connect(
  null,
  mapDispatchToProps
)(PictureCard);

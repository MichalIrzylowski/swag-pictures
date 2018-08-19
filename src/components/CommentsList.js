import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { DELETE_COMMENT_REQUEST } from "../redux/ActionTypes";

class CommentsList extends Component {
  handleDelete(commentId, pictureId) {
    this.props.handleDelete(commentId, pictureId._id);
  }

  render() {
    const { comments, user } = this.props;

    let Comments = comments.map(c => (
      <ListGroupItem key={c._id}>
        {c.author && <strong>{c.author.username}</strong>} {c.text}{" "}
        {user.id === c.author._id && (
          <Button
            color="danger"
            onClick={this.handleDelete.bind(this, c._id, c.commentTo)}
          >
            Delete a comment
          </Button>
        )}
      </ListGroupItem>
    ));

    return <ListGroup>{Comments}</ListGroup>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleDelete: (commentId, pictureId) =>
      dispatch({
        type: DELETE_COMMENT_REQUEST,
        payload: { commentId, pictureId }
      })
  };
}

function mapStateToProps(state) {
  return {
    user: state.currentUser.user
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsList);

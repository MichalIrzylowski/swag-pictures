import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const CommentsList = ({ comments }) => {
  let Comments = comments.map(c => (
    <ListGroupItem key={c._id}>
      {c.author && <strong>{c.author.username}</strong>} {c.text}
    </ListGroupItem>
  ));

  return <ListGroup>{Comments}</ListGroup>;
};

export default CommentsList;

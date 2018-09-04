import React from "react";
import { connect } from "react-redux";
import { ListGroupItem, Media, Button } from "reactstrap";

const FoundUser = ({
  id,
  image,
  username,
  description,
  handleFollow,
  following
}) => {
  const isFollowing = following.some(f => f._id === id);

  const button = isFollowing ? (
    <Button color="primary" size="sm" disabled>
      Following
    </Button>
  ) : (
    <Button color="primary" size="sm" onClick={handleFollow}>
      Follow
    </Button>
  );

  return (
    <ListGroupItem>
      <Media>
        <Media left>
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="ProfileImage"
          />
        </Media>
        <Media body>
          <Media heading>{username}</Media>
          {description}
        </Media>
        <Media right>{button}</Media>
      </Media>
    </ListGroupItem>
  );
};

function mapStateToProps(state) {
  return {
    following: state.currentUser.user.following
  };
}

export default connect(mapStateToProps)(FoundUser);

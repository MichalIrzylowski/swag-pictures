import React , {Component} from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';

import FoundUser from './FoundUser';
import { HANDLE_FOLLOW_REQUEST } from '../redux/ActionTypes';

class FoundUsers extends Component {

  render() {
    let users = this.props.foundUsers.map( u => (
      <FoundUser
        key={u._id}
        image=''
        username={u.username}
        description={u.description}
        handleFollow={this.props.handleFollow.bind(this, u._id, this.props.currentUser.id)}
      />
      )
    )

    return (
      <ListGroup>
        {users}
      </ListGroup>
    )
  }
}

function mapStateToProps(state) {
  return {
    foundUsers: state.searchUsers.foundUsers,
    currentUser: state.currentUser.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleFollow: (tryingToFollowUser_id, follower_id) => dispatch({type: HANDLE_FOLLOW_REQUEST, payload: {tryingToFollowUser_id, follower_id}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoundUsers);

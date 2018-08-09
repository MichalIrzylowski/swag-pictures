import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Media, Button } from 'reactstrap';

import PicturesList from './PicturesList';

const User = ({ user }) => (
  <Container>
    <Row>
      <Media>
        <Media left >
          <div style={{backgroundImage: `url(${user.profileImgUrl})`}} className='ProfileImage' ></div>
        </Media>
        <Media body>
          <Media heading>
            {user.username}
          </Media>
          <Button color='warning' tag={Link} to={'/Profile/Edit'}>Edit Profile</Button>
          <div>
            {user.description}
          </div>
        </Media>
      </Media>
    </Row>
    <Row>
      <PicturesList pictures={user.pictures} />
    </Row>
  </Container>
)

/*User.defaultProps = {
  user: {
    username: '',
    profileImgUrl: '',
    id: '',
    description: '',
    pictures: []
  }
}*/

function mapStateToProps(state) {
  return {
    user: state.currentUser.user
  }
}

export default connect(mapStateToProps)(User);

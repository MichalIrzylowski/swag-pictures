import React from 'react';
import { ListGroupItem, Media, Button } from 'reactstrap';

const FoundUser = ({image, username, description, handleFollow}) => {
  return (
    <ListGroupItem>
      <Media>
        <Media left>
          <img src={image} alt='Profile image will be here' />
        </Media>
        <Media body>
          <Media heading>
            {username}
          </Media>
          {description}
        </Media>
        <Media right>
          <Button color="primary" size="sm" onClick={handleFollow}>Follow</Button>
        </Media>
      </Media>
    </ListGroupItem>
)}

export default FoundUser;

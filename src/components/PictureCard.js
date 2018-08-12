import React from 'react';
import { Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap';

const PictureCard = ({img, title, description, author}) => (
  <Card style={{'marginTop': '20px'}}>
    <CardBody>
      <CardTitle>
        {title}
      </CardTitle>
      <CardLink>
        <CardSubtitle>
          {author.username}
        </CardSubtitle>
      </CardLink>
    </CardBody>
    <CardImg width="100%" src={img} alt='Card' />
    <CardBody>
      <CardText>
        {description}
      </CardText>
    </CardBody>
  </Card>
)

export default PictureCard;

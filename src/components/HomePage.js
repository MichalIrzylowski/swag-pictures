import React from 'react';
import { Jumbotron, Button, UncontrolledCarousel } from 'reactstrap';
import { Link } from 'react-router-dom';

const items = [
  {
    src: 'https://res.cloudinary.com/dlxsuuger/image/upload/v1529771735/samples/ecommerce/accessories-bag.jpg',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header'
  },
  {
    src: 'https://res.cloudinary.com/dlxsuuger/image/upload/v1529771742/samples/landscapes/nature-mountains.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header'
  },
  {
    src: 'https://res.cloudinary.com/dlxsuuger/image/upload/v1529771726/samples/landscapes/architecture-signs.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header'
  }
];

const HomePage = () => (
  <div>
    <Jumbotron>
      <h1 className="display-3">Swag-Pictures</h1>
      <p className="lead">This is <em>Instagram</em> clone built with React.js, Redux, Redux-Saga, React-router-dom and bootstrap. Feel free to register, just remember to put fake data, because no RODO is over here.</p>
      <hr className="my-2" />
      <Button color='primary' tag={Link} to='/Register'>Register</Button>
    </Jumbotron>
    <UncontrolledCarousel items={items} />
  </div>
)

export default HomePage;

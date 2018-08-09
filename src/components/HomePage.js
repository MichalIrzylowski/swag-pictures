import React, {Component} from 'react';
import { Jumbotron, Button, UncontrolledCarousel, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { LOAD_PICTURES } from '../redux/ActionTypes';

const items = [
  {
    src: 'https://res.cloudinary.com/dlxsuuger/image/upload/v1529771735/samples/ecommerce/accessories-bag.jpg',
    altText: 'Slide 1',
    caption: 'Picture of slide 1',
    header: 'You can add pictures'
  },
  {
    src: 'https://res.cloudinary.com/dlxsuuger/image/upload/v1529771742/samples/landscapes/nature-mountains.jpg',
    altText: 'Slide 2',
    caption: 'Basically it is just Instagram app',
    header: 'Like this'
  },
  {
    src: 'https://res.cloudinary.com/dlxsuuger/image/upload/v1529771726/samples/landscapes/architecture-signs.jpg',
    altText: 'Slide 3',
    caption: 'No ide waht to write here',
    header: 'Or this'
  }
];

class HomePage extends Component {

  componentDidUpdate(prevState) {
    if (this.props.user.isAuthenticated !== prevState.user.isAuthenticated) {
      this.props.loadPictures();
    }
  }

  render() {
    return (
      <Row>
        <Col xs='7'>
          <Jumbotron>
            <h1 className="display-3">Swag-Pictures</h1>
            <p className="lead">This is <em>Instagram</em> clone built with React.js, Redux, Redux-Saga, React-router-dom and bootstrap. Feel free to register, just remember to put fake data, because no RODO is over here.</p>
            <hr className="my-2" />
            <Button color='primary' tag={Link} to='/Register'>Register</Button>
          </Jumbotron>
        </Col>
        <Col xs='5'>
          <UncontrolledCarousel items={items} />
          <p>Author of the app: Michał Irzyłowski</p>
          <p>Contact: <a href='mailto:michal.irzylowski@gmail.com'>michal.irzylowski@gmail.com</a></p>
        </Col>
      </Row>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPictures: () => dispatch({type: LOAD_PICTURES})
  }
}

function mapStateToProps (state) {
  return {
    user: state.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

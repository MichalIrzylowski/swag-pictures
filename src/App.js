import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';

import MainContent from './components/MainContent';

import MainMenu from './components/MainMenu';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainMenu props={this.props} />
        <Container>
          <MainContent location={this.props.location} />
        </Container>
      </div>
    );
  }
}

export default withRouter(App);

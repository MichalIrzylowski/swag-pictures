import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";

import MainContent from "./components/MainContent";

import MainMenu from "./components/MainMenu";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainMenu props={this.props} />
        <Container>
          <MainContent location={this.props.location} />
        </Container>
        <footer>
          <div className="footer-container">
            <h2 className="footer-container_title">
              Some usefull informations:
            </h2>
            <p>Author of the app: Michał Irzyłowski</p>
            <p>
              Contact:{" "}
              <a href="mailto:michal.irzylowski@gmail.com">
                michal.irzylowski@gmail.com
              </a>
            </p>
            <p>
              Portfolio:{" "}
              <a href="https://michalirzylowski.herokuapp.com/">
                https://michalirzylowski.herokuapp.com/
              </a>
            </p>
            <p>
              Github of the app:{" "}
              <a href="https://github.com/MichalIrzylowski/swag-pictures">
                Front-end
              </a>{" "}
              &amp;{" "}
              <a href="https://github.com/MichalIrzylowski/swag-pictures-server">
                Back-end
              </a>{" "}
              (Backend is still in development.)
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default withRouter(App);

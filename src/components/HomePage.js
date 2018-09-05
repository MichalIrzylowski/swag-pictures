import React, { Component } from "react";
import { Jumbotron, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { LOAD_PICTURES } from "../redux/ActionTypes";
import PicturesCards from "./PicturesCards";
import LogoList from "./LogoList";

import AddPictureForm from "../pictures/AddPictureForm.png";
import LoginForm from "../pictures/LoginForm.png";
import PictureDashboard from "../pictures/PictureDashboard.jpg";
import ProfileView from "../pictures/ProfileView.png";

class HomePage extends Component {
  componentDidUpdate(prevState) {
    if (this.props.user.isAuthenticated !== prevState.user.isAuthenticated) {
      const userFollowing = this.props.user.user.following;
      let picturesToShow = [];
      userFollowing.forEach(
        u => (picturesToShow = [...picturesToShow, ...u.pictures])
      );
      this.props.loadPictures(picturesToShow);
    }
  }

  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      const userFollowing = this.props.user.user.following;
      let picturesToShow = [];
      userFollowing.forEach(
        u => (picturesToShow = [...picturesToShow, ...u.pictures])
      );
      this.props.loadPictures(picturesToShow);
    }
  }

  render() {
    const { isAuthenticated } = this.props.user;
    if (isAuthenticated) {
      return <PicturesCards pictures={this.props.pictures} />;
    }
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">Swag-Pictures</h1>
          <p className="lead">
            This is <em>Instagram</em> clone built with React.js, Redux,
            Redux-Saga, React-router-dom and bootstrap. Feel free to register,
            just remember to put fake data, because no RODO is over here.
          </p>
          <hr className="my-2" />
          <Button color="primary" tag={Link} to="/Register">
            Register
          </Button>
        </Jumbotron>
        <section>
          <p>
            If you just want to know something about this app without
            registering you can reed about it on this page. Just follow the
            arrow!
          </p>
          <div className="arrow">
            <i className="fas fa-arrow-down" />
          </div>
        </section>
        <section>
          <h2>Technicals</h2>
          <hr />
          <p>
            Front-end of this app is made with React (I love React!), redux and
            redux saga. I have styled everything with help of Bootstrap and own
            CSS styles. The sceletone of the front-end is obviously good old
            HTML5. Back-end is made with Node.js, express.js, and mongoDB.
          </p>
          <LogoList />
        </section>
        <section>
          <h2>Possibilities</h2>
          <hr />
          <p>
            Basically you can do almost everything that you can do with
            instagram, you can add pictures, follow people (in future there will
            be more features).
          </p>
          <p className="picture-title">
            Picture 1: Register form. It has client and back-end validation.
          </p>
          <img
            src={LoginForm}
            className="possibilities-picture"
            alt="Register form"
          />
          <p className="picture-title">
            Picture 2: Add picture form. You can add file instead of link.
          </p>
          <img
            src={AddPictureForm}
            className="possibilities-picture"
            alt="Adding picture form"
          />
          <p className="picture-title">
            Picture 3: Profile view. Here you can see something about you and
            all of yours pictures.
          </p>
          <img
            src={ProfileView}
            className="possibilities-picture"
            alt="Profile view"
          />
          <p className="picture-title">
            Picture 4: Pictures dashboard. You can see all of following people
            pictures (you will see yours as well).
          </p>
          <img
            src={PictureDashboard}
            className="possibilities-picture"
            alt="Pictures dashboard"
          />
        </section>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPictures: pictures =>
      dispatch({ type: LOAD_PICTURES, payload: pictures })
  };
}

function mapStateToProps(state) {
  return {
    user: state.currentUser,
    following: state.currentUser.user.following,
    pictures: state.loadPictures.pictures
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

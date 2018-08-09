import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function WithAuth (ComponentToBeRendered) {
  class Authenticate extends Component {

    componentDidMount() {
      if (this.props.isAuthenticated === false) {
        this.props.history.push('/Login');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated === false) {
        this.props.history.push('/Login');
      }
    }

    render() {
      return <ComponentToBeRendered />;
    }

  }

    function mapStateToProps(state) {
      return {isAuthenticated: state.currentUser.isAuthenticated};
      }

    return connect(mapStateToProps)(Authenticate);

  }

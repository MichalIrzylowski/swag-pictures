import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './HomePage';
import Authentication from './Authentication';
import AddPictureForm from './AddPictureForm';
import User from './User';
import UserEditForm from './UserEditForm';
import FoundUsers from './FoundUsers';

import WithAuth from '../hocs/WithAuth';

const MainContent = ({location}) => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/Register' component={Authentication} />
    <Route exact path='/Login' component={Authentication} />
    <Route exact path='/Add_Picture' component={WithAuth(AddPictureForm)} />
    <Route exact path='/Profile' component={WithAuth(User)} />
    <Route exact path='/Profile/Edit' component={WithAuth(UserEditForm)} />
    <Route exact path='/Found_Users' component={WithAuth(FoundUsers)} />
  </Switch>
)

export default MainContent;

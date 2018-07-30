import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './HomePage';
import Authentication from './Authentication';
import AddPictureForm from './AddPictureForm';

const MainContent = ({location}) => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/Register' component={Authentication} />
    <Route exact path='/Login' component={Authentication} />
    <Route exact path='/Add_Picture' component={AddPictureForm} />
  </Switch>
)

export default MainContent;

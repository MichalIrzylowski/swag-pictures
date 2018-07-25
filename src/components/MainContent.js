import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './HomePage';
import Authentication from './Authentication';

const MainContent = ({location}) => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/Register' component={Authentication} />
    <Route exact path='/Login' component={Authentication} />
  </Switch>
)

export default MainContent;

import React from 'react';
import { browserHistory, Redirect, Route, Router } from 'react-router';

import App from './components/app/App'
import Register from './containers/register'
import Socket from './containers/socket'

export default (
  <Router history={browserHistory}>
    <Route component={App} >
        <Route path='/register' component={Register} />
        <Route path='/messages' component={Socket} />
        <Redirect from="/" to="register" />
    </Route>
  </Router>
)

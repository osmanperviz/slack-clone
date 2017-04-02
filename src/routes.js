import React from 'react';
import {
        browserHistory,
        IndexRoute,
        Redirect,
        Route,
        Router,
        } from 'react-router';

import App from './components/app/App'
import Register from './containers/register'

export default (
  <Router history={browserHistory}>
    <Route component={App} >
        <Route path='/register' component={Register} />
        <Redirect from="/" to="register" />
    </Route>
  </Router>
)

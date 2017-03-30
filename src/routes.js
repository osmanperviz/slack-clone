import React from 'react';
import { Route } from 'react-router'

import App from './components/app/App'

export default (
  <Route path="/" component={App} >
    {/* <Route path="profile/:username" component={Profile} /> */}
    {/* <IndexRoute component={Home} /> */}
  </Route>
)

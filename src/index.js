import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'
import rootSaga from './sagas'

import createStore, { sagaMiddleware } from './store'
import routes from './routes'


const store = createStore({})
const history = createBrowserHistory()

sagaMiddleware.run(rootSaga)


ReactDOM.render(
  <Provider store={store}>
     <Router history={history}>{routes}</Router>
	</Provider>,
  document.getElementById('root')
);

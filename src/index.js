import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import rootSaga from './sagas'

import createStore, { sagaMiddleware } from './store'
import routes from './routes'


const store = createStore({})

sagaMiddleware.run(rootSaga)


ReactDOM.render(
  <Provider store={store}>
     {routes}
	</Provider>,
  document.getElementById('root')
);

import { createStore, applyMiddleware, compose } from 'redux'
import loggerMiddleware from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducer'

export const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const enhancer = compose(
    // window.devToolsExtension() : f => f,
    applyMiddleware(
      loggerMiddleware,
      sagaMiddleware
    ),
  );
  return createStore(reducer, initialState, enhancer)
}

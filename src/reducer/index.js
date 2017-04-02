import { combineReducers } from 'redux'
import messagesReducer from './messagesReducer'

const reducer = combineReducers(Object.assign({},{
  messages: messagesReducer
}));

export default reducer

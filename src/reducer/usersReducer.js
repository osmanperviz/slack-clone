import * as socketTypes from '../actions/types'


function usersReducer(state = [], action) {
  switch (action.type) {
    case socketTypes.SET_USERS:
      return [...state, ...action.users ]
    default:
      return state
  }
}
export default usersReducer

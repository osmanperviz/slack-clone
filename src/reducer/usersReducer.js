import * as socketTypes from '../actions/types'


function usersReducer(state = [], action) {
  switch (action.type) {
    case socketTypes.SET_USERS:
      return [...state, ...action.users ]

    case socketTypes.NEW_USER:
      debugger
      return [...state, action.user ]
    default:
      return state
  }
}
export default usersReducer

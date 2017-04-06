import * as socketTypes from '../actions/types'


function usersReducer(state = {}, action) {
  switch (action.type) {

    case socketTypes.SET_USER:
      return {...state, ...action.user }

    default:
      return state
  }
}
export default usersReducer

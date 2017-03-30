export default function createReducer(initialState, handlers) {
  return function reducer(state, action) {
    if(handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return initialState
    }
  }
}

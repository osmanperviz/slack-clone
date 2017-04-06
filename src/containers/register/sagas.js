import { fork, call, takeEvery } from "redux-saga/effects"
import { browserHistory } from 'react-router'
import Api from '../../lib/api'
import { USER_REGISTRATION } from './actions'


function* performUserRegistration(request) {
  try {
    const { username } = request
    const result = yield call(Api.post, 'users/register', { username: username } )
    sessionStorage.setItem('id', result.id);
    browserHistory.push('/messages')
  } catch(err) {
    console.info(err)
  }
}

function* watchUsersLogin() {
  yield takeEvery(USER_REGISTRATION, performUserRegistration);
}

export default [
  fork(watchUsersLogin),
]

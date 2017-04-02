import registerSaga from '../containers/register/sagas'

export default function* rootSaga() {
  yield [
    registerSaga
  ]
}

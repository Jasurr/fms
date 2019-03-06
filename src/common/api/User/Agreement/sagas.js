import { all, call, put, takeEvery } from 'redux-saga/effects'

import Routines from './routines'

function * trigger (api) {
  try {
    yield put(Routines.accept.request())

    const response = yield call(api.user.agreement.accept)

    // const { tokens } = response.data

    yield all([
      // call(TokenStorage.set, tokens.refresh),
      // call(api.setToken, tokens.bearer),
      put(
        Routines.accept.success({
          response: response.data.user
        })
      )
    ])
  } finally {
    yield put(Routines.accept.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.accept.TRIGGER, trigger, api)
}

import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'
import TokenStorage from 'common/TokenStorage'

function * trigger (api, action) {
  const { request } = action.payload

  const currentToken = yield call(TokenStorage.get)

  yield call(api.setToken, currentToken)

  try {
    yield put(Routines.changeUsername.request())

    const response = yield call(api.user.changeUsername, request)

    yield put(
      Routines.changeUsername.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.changeUsername.failure(e))
  } finally {
    yield put(Routines.changeUsername.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.changeUsername.TRIGGER, trigger, api)
}

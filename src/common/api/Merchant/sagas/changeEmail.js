import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.changeEmail.request())

    const response = yield call(api.merchant.changeEmail, request)

    yield put(
      Routines.changeEmail.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.changeEmail.failure(e))
  } finally {
    yield put(Routines.changeEmail.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.changeEmail.TRIGGER, trigger, api)
}

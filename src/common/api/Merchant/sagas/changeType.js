import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.changeType.request())

    const response = yield call(api.merchant.changeType, request)

    yield put(
      Routines.changeType.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.changeType.failure(e))
  } finally {
    yield put(Routines.changeType.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.changeType.TRIGGER, trigger, api)
}

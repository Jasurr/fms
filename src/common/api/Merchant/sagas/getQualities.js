import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.getQualities.request())

    console.warn(JSON.stringify(request))
    const response = yield call(api.merchant.getQualities, request)

    yield put(
      Routines.getQualities.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.getQualities.failure(e))
  } finally {
    yield put(Routines.getQualities.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.getQualities.TRIGGER, trigger, api)
}

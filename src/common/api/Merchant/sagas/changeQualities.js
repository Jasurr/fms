import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.changeQualities.request())

    const response = yield call(api.merchant.changeQualities, request)

    yield put(
      Routines.changeQualities.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.changeQualities.failure(e))
  } finally {
    yield put(Routines.changeQualities.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.changeQualities.TRIGGER, trigger, api)
}

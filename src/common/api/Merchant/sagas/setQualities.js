import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request, id } = action.payload

  try {
    yield put(Routines.setQualities.request())

    const response = yield call(api.merchant.setQualities, request, id)

    yield put(
      Routines.setQualities.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.setQualities.failure(e))
  } finally {
    yield put(Routines.setQualities.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.setQualities.TRIGGER, trigger, api)
}

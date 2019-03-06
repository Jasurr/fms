import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.getFacilities.request())

    console.warn(JSON.stringify(request))
    const response = yield call(api.merchant.getFacilities, request)

    yield put(
      Routines.getFacilities.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.getFacilities.failure(e))
  } finally {
    yield put(Routines.getFacilities.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.getFacilities.TRIGGER, trigger, api)
}

import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.changeFacilities.request())

    const response = yield call(api.merchant.changeFacilities, request)

    yield put(
      Routines.changeFacilities.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.changeFacilities.failure(e))
  } finally {
    yield put(Routines.changeFacilities.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.changeFacilities.TRIGGER, trigger, api)
}

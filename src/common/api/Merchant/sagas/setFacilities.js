import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request, id } = action.payload

  try {
    yield put(Routines.setFacilities.request())

    const response = yield call(api.merchant.setFacilities, request, id)

    yield put(
      Routines.setFacilities.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.setFacilities.failure(e))
  } finally {
    yield put(Routines.setFacilities.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.setFacilities.TRIGGER, trigger, api)
}

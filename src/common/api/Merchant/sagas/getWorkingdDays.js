import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.getWorkingDays.request())

    const response = yield call(api.merchant.getWorkingDays, request)

    yield put(
      Routines.getWorkingDays.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.getWorkingDays.failure(e))
  } finally {
    yield put(Routines.getWorkingDays.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.getWorkingDays.TRIGGER, trigger, api)
}

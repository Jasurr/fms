import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request, id } = action.payload

  try {
    yield put(Routines.setWorkingDays.request())

    const response = yield call(api.merchant.setWorkingDays, request, id)

    yield put(
      Routines.setWorkingDays.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.setWorkingDays.failure(e))
  } finally {
    yield put(Routines.setWorkingDays.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.setWorkingDays.TRIGGER, trigger, api)
}

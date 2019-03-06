import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.changeSchedule.request())

    const response = yield call(api.merchant.changeSchedule, request)

    yield put(
      Routines.changeSchedule.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.changeSchedule.failure(e))
  } finally {
    yield put(Routines.changeSchedule.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.changeSchedule.TRIGGER, trigger, api)
}

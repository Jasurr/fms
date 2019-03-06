import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.changeSite.request())

    const response = yield call(api.merchant.changeSite, request)

    yield put(
      Routines.changeSite.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.changeSite.failure(e))
  } finally {
    yield put(Routines.changeSite.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.changeSite.TRIGGER, trigger, api)
}

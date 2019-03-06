import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.get.request())

    const response = yield call(api.merchant.get, request)

    yield put(
      Routines.get.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.get.failure(e))
  } finally {
    yield put(Routines.get.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.get.TRIGGER, trigger, api)
}

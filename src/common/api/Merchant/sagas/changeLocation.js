import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.changeLocation.request())

    const response = yield call(api.merchant.changeLocation, request)

    yield put(
      Routines.changeLocation.success({
        request,
        response: response
      })
    )
  } catch (e) {
    yield put(Routines.changeLocation.failure(e))
  } finally {
    yield put(Routines.changeLocation.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.changeLocation.TRIGGER, trigger, api)
}

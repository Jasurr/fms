import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.changeDelivery.request())

    const response = yield call(api.merchant.changeDelivery, request)

    yield put(
      Routines.changeDelivery.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.changeDelivery.failure(e))
  } finally {
    yield put(Routines.changeDelivery.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.changeDelivery.TRIGGER, trigger, api)
}

import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.getAcceptedPayments.request())

    console.warn(JSON.stringify(request))
    const response = yield call(api.merchant.getAcceptedPayments, request)

    yield put(
      Routines.getAcceptedPayments.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.getAcceptedPayments.failure(e))
  } finally {
    yield put(Routines.getAcceptedPayments.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.getAcceptedPayments.TRIGGER, trigger, api)
}

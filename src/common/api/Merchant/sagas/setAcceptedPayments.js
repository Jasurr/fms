import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request, id } = action.payload

  try {
    yield put(Routines.setAcceptedPayments.request())

    const response = yield call(api.merchant.setAcceptedPayments, request, id)

    yield put(
      Routines.setAcceptedPayments.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.setAcceptedPayments.failure(e))
  } finally {
    yield put(Routines.setAcceptedPayments.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.setAcceptedPayments.TRIGGER, trigger, api)
}

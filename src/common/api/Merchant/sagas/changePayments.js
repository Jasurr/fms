import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.changePayments.request())

    const response = yield call(api.merchant.changePayments, request)

    yield put(
      Routines.changePayments.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.changePayments.failure(e))
  } finally {
    yield put(Routines.changePayments.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.changePayments.TRIGGER, trigger, api)
}

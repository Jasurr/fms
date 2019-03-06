import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request, offerId } = action.payload

  try {
    yield put(Routines.close.request())

    const response = yield call(api.merchant.deal.close, request, offerId)

    yield put(
      Routines.close.success({
        request,
        response: response.data,
        offerId
      })
    )
  } finally {
    yield put(Routines.close.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.close.TRIGGER, trigger, api)
}

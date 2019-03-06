import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.delete.request())

    const response = yield call(api.merchant.deal.code.scan.delete, request)

    yield put(
      Routines.delete.success({
        request,
        response: response.data
      })
    )
  } finally {
    yield put(Routines.delete.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.delete.TRIGGER, trigger, api)
}

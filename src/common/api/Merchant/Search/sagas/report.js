import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.report.request())

    const response = yield call(api.merchant.search.report, request)

    yield put(
      Routines.report.success({
        request,
        response: response.data
      })
    )
  } finally {
    yield put(Routines.report.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.report.TRIGGER, trigger, api)
}

import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.select.request())

    const response = yield call(api.merchant.search.select, request)

    yield put(
      Routines.select.success({
        request,
        response: response.data.results
      })
    )
  } finally {
    yield put(Routines.select.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.select.TRIGGER, trigger, api)
}

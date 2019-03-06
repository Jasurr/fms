import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.top.request())

    const response = yield call(api.merchant.search.select, request)

    yield put(
      Routines.top.success({
        request,
        response: response.data
      })
    )
  } finally {
    yield put(Routines.top.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.top.TRIGGER, trigger, api)
}

import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.close.request())

    const response = yield call(api.merchant.survey.close, request)

    yield put(
      Routines.close.success({
        request,
        response: response.data
      })
    )
  } finally {
    yield put(Routines.close.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.close.TRIGGER, trigger, api)
}

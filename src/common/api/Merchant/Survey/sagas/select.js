import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api) {
  try {
    yield put(Routines.select.request())

    const response = yield call(api.merchant.survey.select)

    yield put(
      Routines.select.success({
        response: response.data
      })
    )
  } finally {
    yield put(Routines.select.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.select.TRIGGER, trigger, api)
}

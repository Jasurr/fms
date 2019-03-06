import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api) {
  try {
    yield put(Routines.view.request())

    const response = yield call(api.merchant.tag.view)

    yield put(
      Routines.view.success({
        response: response.data
      })
    )
  } finally {
    yield put(Routines.view.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.view.TRIGGER, trigger, api)
}

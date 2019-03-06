import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.notifyChange.request())

    const response = yield call(api.user.pal.notifyChange, request)

    yield put(
      Routines.notifyChange.success({
        request,
        response: response.data
      })
    )
  } finally {
    yield put(Routines.notifyChange.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.notifyChange.TRIGGER, trigger, api)
}

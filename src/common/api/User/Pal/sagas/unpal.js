import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.unpal.request())

    const response = yield call(api.user.pal.unpal, request)

    yield put(
      Routines.unpal.success({
        request,
        response: response.data
      })
    )
  } finally {
    yield put(Routines.unpal.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.unpal.TRIGGER, trigger, api)
}

import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.change.request())

    const response = yield call(api.user.avatar.change, request)

    yield put(
      Routines.change.success({
        request,
        response: response.data
      })
    )
  } finally {
    yield put(Routines.change.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.change.TRIGGER, trigger, api)
}

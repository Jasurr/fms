import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.changeStatus.request())

    const response = yield call(api.user.changeStatus, request)

    yield put(
      Routines.changeStatus.success({
        request,
        response: response.data
      })
    )
  } finally {
    yield put(Routines.changeStatus.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.changeStatus.TRIGGER, trigger, api)
}

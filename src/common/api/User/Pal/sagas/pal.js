import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.pal.request())

    const response = yield call(api.user.pal.pal, request)

    yield put(
      Routines.pal.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.pal.failure(e))
  } finally {
    yield put(Routines.pal.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.pal.TRIGGER, trigger, api)
}

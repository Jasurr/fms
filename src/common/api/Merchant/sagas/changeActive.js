import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.changeActive.request())

    const response = yield call(api.merchant.changeActive, request)

    yield put(
      Routines.changeActive.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.changeActive.failure(e))
  } finally {
    yield put(Routines.changeActive.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.changeActive.TRIGGER, trigger, api)
}

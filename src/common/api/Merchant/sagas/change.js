import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request, id } = action.payload

  try {
    yield put(Routines.change.request())

    const response = yield call(api.merchant.change, request, id)

    yield put(
      Routines.change.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.change.failure(e))
  } finally {
    yield put(Routines.change.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.change.TRIGGER, trigger, api)
}

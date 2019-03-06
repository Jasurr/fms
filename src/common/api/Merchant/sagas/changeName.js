import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.changeName.request())

    const response = yield call(api.merchant.changeName, request)

    yield put(
      Routines.changeName.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.changeName.failure(e))
  } finally {
    yield put(Routines.changeName.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.changeName.TRIGGER, trigger, api)
}

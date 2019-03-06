import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.changePhones.request())

    const response = yield call(api.merchant.changePhones, request)

    yield put(
      Routines.changePhones.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.changePhones.failure(e))
  } finally {
    yield put(Routines.changePhones.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.changePhones.TRIGGER, trigger, api)
}

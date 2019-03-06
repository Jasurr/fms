import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.update.request())

    const response = yield call(api.merchant.announcement.update, request)

    yield put(
      Routines.update.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.create.failure(e))
  } finally {
    yield put(Routines.update.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.update.TRIGGER, trigger, api)
}

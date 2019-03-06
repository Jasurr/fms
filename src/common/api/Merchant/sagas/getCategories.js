import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  try {
    yield put(Routines.getCategories.request())

    const response = yield call(api.merchant.getCategories)

    yield put(
      Routines.getCategories.success({
        response
      })
    )
  } catch (e) {
    yield put(Routines.getCategories.failure(e))
  } finally {
    yield put(Routines.getCategories.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.getCategories.TRIGGER, trigger, api)
}

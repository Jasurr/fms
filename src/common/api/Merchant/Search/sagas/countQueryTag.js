import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.countQueryTag.request())

    const response = yield call(api.merchant.search.countQueryTag, request)

    yield put(
      Routines.countQueryTag.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.countQueryTag.failure(e))
  } finally {
    yield put(Routines.countQueryTag.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.countQueryTag.TRIGGER, trigger, api)
}

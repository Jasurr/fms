import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.add.request())

    const response = yield call(api.merchant.tag.add, request)

    yield put(
      Routines.add.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.add.failure(e))
  } finally {
    yield put(Routines.add.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.add.TRIGGER, trigger, api)
}

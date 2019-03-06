import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.view.request())

    const response = yield call(api.merchant.deal.view, request)

    yield put(
      Routines.view.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.view.failure(e))
  } finally {
    yield put(Routines.view.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.view.TRIGGER, trigger, api)
}

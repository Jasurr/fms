import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload
  // console.log('create request', request);

  try {
    yield put(Routines.create.request())

    const response = yield call(api.merchant.create, request)
    // console.log('create response', response);

    yield put(
      Routines.create.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.create.failure(e))
  } finally {
    yield put(Routines.create.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.create.TRIGGER, trigger, api)
}

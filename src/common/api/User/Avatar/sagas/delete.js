import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.delete.request())

    const response = yield call(api.user.avatar.delete)

    yield put(
      Routines.delete.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.delete.failure(e))
  } finally {
    yield put(Routines.delete.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.delete.TRIGGER, trigger, api)
}

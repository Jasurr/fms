import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.getParcelUpdate.request())

    const response = yield call(api.admin.getParcelUpdate, request)

    yield put(
      Routines.getParcelUpdate.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.getParcelUpdate.failure(e))
  } finally {
    yield put(Routines.getParcelUpdate.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.getParcelUpdate.TRIGGER, trigger, api)
}

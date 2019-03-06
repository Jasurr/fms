import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.patchParcelUpdate.request())

    const response = yield call(api.admin.patchParcelUpdate, request)

    yield put(
      Routines.patchParcelUpdate.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.patchParcelUpdate.failure(e))
  } finally {
    yield put(Routines.patchParcelUpdate.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.patchParcelUpdate.TRIGGER, trigger, api)
}

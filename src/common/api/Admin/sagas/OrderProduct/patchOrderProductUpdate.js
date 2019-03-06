import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.patchOrderProductUpdate.request())

    const response = yield call(api.admin.patchOrderProductUpdate, request)

    yield put(
      Routines.patchOrderProductUpdate.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.patchOrderProductUpdate.failure(e))
  } finally {
    yield put(Routines.patchOrderProductUpdate.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.patchOrderProductUpdate.TRIGGER, trigger, api)
}

import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.putParcelUpdate.request())

    const response = yield call(api.admin.putParcelUpdate, request)

    yield put(
      Routines.putParcelUpdate.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.putParcelUpdate.failure(e))
  } finally {
    yield put(Routines.putParcelUpdate.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.putParcelUpdate.TRIGGER, trigger, api)
}

import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.putOrderProductUpdate.request())

    const response = yield call(api.admin.putOrderProductUpdate, request)

    yield put(
      Routines.putOrderProductUpdate.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.putOrderProductUpdate.failure(e))
  } finally {
    yield put(Routines.putOrderProductUpdate.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.putOrderProductUpdate.TRIGGER, trigger, api)
}

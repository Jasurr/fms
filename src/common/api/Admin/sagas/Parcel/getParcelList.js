import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.getParcelList.request())

    const response = yield call(api.admin.getParcelList, request)

    yield put(
      Routines.getParcelList.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.getParcelList.failure(e))
  } finally {
    yield put(Routines.getParcelList.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.getParcelList.TRIGGER, trigger, api)
}

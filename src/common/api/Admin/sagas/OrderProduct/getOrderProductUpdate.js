import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.getOrderProductUpdate.request())

    const response = yield call(api.admin.getOrderProductUpdate, request)

    yield put(
      Routines.getOrderProductList.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.getOrderProductUpdate.failure(e))
  } finally {
    yield put(Routines.getOrderProductUpdate.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.getOrderProductUpdate.TRIGGER, trigger, api)
}

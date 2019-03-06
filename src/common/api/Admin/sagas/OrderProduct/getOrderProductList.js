import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.getOrderProductList.request())

    const response = yield call(api.admin.getOrderProductList, request)

    yield put(
      Routines.getOrderProductList.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.getOrderProductList.failure(e))
  } finally {
    yield put(Routines.getOrderProductList.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.getOrderProductList.TRIGGER, trigger, api)
}

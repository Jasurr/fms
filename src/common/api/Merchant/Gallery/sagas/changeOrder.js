import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request, merchantId, imageId } = action.payload

  try {
    yield put(Routines.changeOrder.request())

    const response = yield call(api.merchant.gallery.changeOrder, request, merchantId, imageId)
    yield put(
      Routines.changeOrder.success({
        request,
        response: response.data,
        merchantId
      })
    )
  } catch (e) {
    yield put(Routines.changeOrder.failure(e))
  } finally {
    yield put(Routines.changeOrder.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.changeOrder.TRIGGER, trigger, api)
}

import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request, merchantId } = action.payload
  try {
    yield put(Routines.upload.request())

    const response = yield call(api.merchant.gallery.upload, request, merchantId)
    if (response.status < 400) {
      yield put(
        Routines.upload.success({
          request,
          response: response.data,
          merchantId
        })
      )
    } else {
      // yield put(Routines.upload.failure())
    }
  } finally {
    yield put(Routines.upload.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.upload.TRIGGER, trigger, api)
}

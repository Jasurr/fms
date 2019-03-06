import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload
  console.warn("Photos", request);
  try {
    yield put(Routines.photos.request())

    const response = yield call(api.merchant.getPhotos, request)

    yield put(
      Routines.photos.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.photos.failure(e))
  } finally {
    yield put(Routines.photos.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.photos.TRIGGER, trigger, api)
}

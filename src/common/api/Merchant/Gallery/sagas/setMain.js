import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload
  try {
    yield put(Routines.setMain.request())

    const response = yield call(api.merchant.gallery.setMain, request)
    if(response.status <400) {

      yield put(
        Routines.setMain.success({
          request,
          response: response.data
        })
      )
    } else {
      console.log(Routines.setMain.failure());
      // yield put(Routines.setMain.failure())
    }
  } finally {
    yield put(Routines.setMain.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.setMain.TRIGGER, trigger, api)
}
